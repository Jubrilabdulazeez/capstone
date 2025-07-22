"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface PaymentData {
  amount: number;
  currency: string;
  counselorId: string;
  counselorName: string;
  sessionType: string;
  sessionDate: string;
  sessionTime: string;
  studentEmail: string;
  metadata?: Record<string, string>;
}

interface StripeCheckoutProps {
  paymentData: PaymentData;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

function CheckoutForm({ paymentData, onSuccess, onError, onCancel }: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Create payment intent on component mount
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: paymentData.amount,
            currency: paymentData.currency,
            counselorId: paymentData.counselorId,
            sessionType: paymentData.sessionType,
            studentEmail: paymentData.studentEmail,
            metadata: {
              counselorName: paymentData.counselorName,
              sessionDate: paymentData.sessionDate,
              sessionTime: paymentData.sessionTime,
              ...paymentData.metadata,
            },
          }),
        });

        const data = await response.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to initialize payment");
        }
      } catch (err) {
        setError("Failed to initialize payment");
        console.error("Payment intent creation error:", err);
      }
    };

    createPaymentIntent();
  }, [paymentData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);
    setError("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card information is required");
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: paymentData.studentEmail,
          },
        },
      });

      if (error) {
        setError(error.message || "Payment failed");
        onError(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentComplete(true);
        toast({
          title: "Payment Successful!",
          description: "Your consultation has been booked successfully.",
        });
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      onError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (paymentComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-4">
            Your consultation with {paymentData.counselorName} has been booked and paid for.
          </p>
          <div className="text-sm bg-muted p-3 rounded-lg">
            <p><strong>Session:</strong> {paymentData.sessionType}</p>
            <p><strong>Date:</strong> {paymentData.sessionDate}</p>
            <p><strong>Time:</strong> {paymentData.sessionTime}</p>
            <p><strong>Amount:</strong> {formatPrice(paymentData.amount, paymentData.currency)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Summary */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Counselor:</span>
              <span className="font-medium">{paymentData.counselorName}</span>
            </div>
            <div className="flex justify-between">
              <span>Session Type:</span>
              <Badge variant="outline">{paymentData.sessionType}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span>{paymentData.sessionDate} at {paymentData.sessionTime}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(paymentData.amount, paymentData.currency)}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Information</label>
            <div className="border rounded-md p-3 bg-background">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#374151',
                      '::placeholder': {
                        color: '#9CA3AF',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            Your payment information is encrypted and secure
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isLoading || !clientSecret}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ${formatPrice(paymentData.amount, paymentData.currency)}`
              )}
            </Button>
          </div>
        </form>

        <div className="text-xs text-center text-muted-foreground">
          By proceeding, you agree to our terms of service and privacy policy.
          You can cancel or reschedule up to 24 hours before your session.
        </div>
      </CardContent>
    </Card>
  );
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

import { type NextRequest, NextResponse } from 'next/server';

// Temporarily disabled Stripe integration for demo purposes
export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      counselorId,
      sessionType,
      studentEmail,
      metadata
    } = await request.json();

    // For demo purposes, return a mock success response
    return NextResponse.json({
      clientSecret: "demo_payment_intent_secret",
      paymentIntentId: "demo_payment_intent_id",
      message: "Demo mode - payment processing disabled"
    });

  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Payment service unavailable in demo mode' },
      { status: 500 }
    );
  }
}

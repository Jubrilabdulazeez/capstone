"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  UserPlus, 
  AlertCircle, 
  CheckCircle,
  GraduationCap,
  Building2,
  Shield,
  Users,
  ArrowRight,
  Globe,
  Star,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// African countries list
const AFRICAN_COUNTRIES = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros",
  "Democratic Republic of the Congo", "Republic of the Congo", "Côte d'Ivoire",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
  "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho",
  "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
  "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
  "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
  "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia",
  "Uganda", "Zambia", "Zimbabwe"
];

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    role: "student",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === "password") {
      calculatePasswordStrength(value as string);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordRequirements = (password: string) => {
    return [
      { met: password.length >= 8, text: "At least 8 characters" },
      { met: /[a-z]/.test(password), text: "At least one lowercase letter" },
      { met: /[A-Z]/.test(password), text: "At least one uppercase letter" },
      { met: /[0-9]/.test(password), text: "At least one number" },
      { met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password), text: "At least one special character" }
    ];
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return "Very weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      case 5: return "Very strong";
      default: return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-red-500";
      case 1: return "bg-red-400";
      case 2: return "bg-yellow-500";
      case 3: return "bg-yellow-400";
      case 4: return "bg-green-400";
      case 5: return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.nationality) {
      setError("Please fill in all required fields");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Enhanced password validation to match backend
    const passwordRequirements = getPasswordRequirements(formData.password);
    const unmetRequirements = passwordRequirements.filter(req => !req.met);
    
    if (unmetRequirements.length > 0) {
      setError(`Password must meet all requirements: ${unmetRequirements.map(req => req.text).join(", ")}`);
      return false;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        nationality: formData.nationality,
        role: 'STUDENT',
        acceptTerms: true
      };
      
      console.log('Sending registration request:', requestBody);
      
      // Register user with backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Registration response:', { status: response.status, data });

      if (response.ok) {
        toast({
          title: "Welcome to EduConnect Africa!",
          description: "Your account has been created successfully. Please sign in to continue.",
        });
        
        // Redirect to sign-in page after successful registration
        router.push("/auth/signin");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/questionnaire" });
    } catch (error) {
      setError("Google sign-up failed. Please try again.");
      console.error("Google sign up error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">EduConnect Africa</h2>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Start Your Academic Journey
            </h1>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join thousands of students who have discovered their perfect university match across Africa.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Star className="h-4 w-4 text-yellow-300" />
                </div>
                <span className="text-blue-100">Personalized university recommendations</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Zap className="h-4 w-4 text-yellow-300" />
                </div>
                <span className="text-blue-100">Instant application processing</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Shield className="h-4 w-4 text-green-300" />
                </div>
                <span className="text-blue-100">Secure and trusted platform</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Globe className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Connect with African excellence</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-blue-100 italic mb-3">
                "EduConnect Africa helped me find my dream university. The platform is intuitive and the support is excellent!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full mr-3" />
                <div>
                  <div className="text-white font-medium text-sm">Sarah K.</div>
                  <div className="text-blue-200 text-xs">University of Cape Town Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-20 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 right-5 w-2 h-2 bg-white/40 rounded-full" />
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6 lg:hidden">
              <div className="bg-blue-600 text-white rounded-2xl p-3 mr-3">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">EduConnect Africa</h2>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Join Our Community</h1>
            <p className="text-gray-600 mb-6">
              Create your account and start your educational journey
            </p>

            {/* Student Account Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                <Users className="h-3 w-3 mr-1 text-blue-600" />
                Student Registration
              </Badge>
            </div>
          </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-up method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Google Sign Up */}
            <Button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or create account with</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="nationality">Country</Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(value) => handleInputChange("nationality", value)}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select your country" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {AFRICAN_COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Role Information */}
              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Student Account</div>
                      <div className="text-xs text-blue-700">For students looking for universities</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Counselor accounts are created by administrators only
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= passwordStrength ? getPasswordStrengthColor() : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: {getPasswordStrengthLabel()}
                    </p>
                    
                    {/* Password Requirements */}
                    <div className="space-y-1">
                      {getPasswordRequirements(formData.password).map((requirement, index) => (
                        <div key={index} className="flex items-center text-xs">
                          {requirement.met ? (
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={requirement.met ? "text-green-600" : "text-red-600"}>
                            {requirement.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Create Account
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-blue-600"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

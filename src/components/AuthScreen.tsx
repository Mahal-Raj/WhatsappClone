import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Shield, Users, Zap } from "lucide-react";

interface AuthScreenProps {
  onAuthComplete: () => void;
}

export const AuthScreen = ({ onAuthComplete }: AuthScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"phone" | "verify">("phone");

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setStep("verify");
    }
  };

  const handleVerifySubmit = () => {
    if (verificationCode.length === 6) {
      onAuthComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-whatsapp-green/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-whatsapp-green to-whatsapp-green-dark rounded-3xl mb-6 shadow-lg">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">WhatsApp</h1>
          <p className="text-muted-foreground">Simple. Secure. Reliable messaging.</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-whatsapp-green" />
            </div>
            <p className="text-xs text-muted-foreground">Secure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-whatsapp-green" />
            </div>
            <p className="text-xs text-muted-foreground">Fast</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-whatsapp-green" />
            </div>
            <p className="text-xs text-muted-foreground">Social</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-xl">
          {step === "phone" ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Enter your phone number</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We'll send you a verification code via SMS
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 rounded-2xl"
                  />
                </div>
                
                <Button 
                  variant="whatsapp" 
                  onClick={handlePhoneSubmit}
                  disabled={phoneNumber.length < 10}
                  className="w-full h-12 rounded-2xl"
                >
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2">Enter verification code</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We sent a 6-digit code to {phoneNumber}
              </p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl font-mono h-12 rounded-2xl tracking-widest"
                  maxLength={6}
                />
                
                <Button 
                  variant="whatsapp" 
                  onClick={handleVerifySubmit}
                  disabled={verificationCode.length !== 6}
                  className="w-full h-12 rounded-2xl"
                >
                  Verify & Continue
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={() => setStep("phone")}
                  className="w-full"
                >
                  Change phone number
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
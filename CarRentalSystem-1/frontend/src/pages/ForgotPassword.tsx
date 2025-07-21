import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import axios from "axios";
import { Eye, EyeOff, RotateCcw } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const sendOtp = async () => {
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/request-otp", { email });
      toast({ title: "OTP sent to your email" });
      setOtpSent(true);
      setResendTimer(60); // 60s
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Error sending OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!otp || !newPassword) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password-otp", {
        email,
        otp,
        newPassword,
      });
      toast({ title: "Password reset successfully!" });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-rental-blue mb-6">Forgot Password</h2>

        {!otpSent ? (
          <>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="mt-1"
            />
            <Button
              className="mt-4 bg-yellow-600 text-white w-full"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-600">OTP</label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="mt-1"
            />

            {/* OTP resend UI */}
            <div className="text-sm flex justify-between items-center text-blue-600 font-medium mt-2">
              <span>Didn’t receive the OTP?</span>
              {resendTimer > 0 ? (
                <span className="opacity-70">Resend in {resendTimer}s</span>
              ) : (
                <button
                  onClick={sendOtp}
                  className="flex items-center gap-1 underline hover:text-blue-800"
                >
                  <RotateCcw className="w-4 h-4" />
                  Resend OTP
                </button>
              )}
            </div>

            <label className="block text-sm font-medium text-gray-600 mt-4">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-1 pr-10"
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>

            <Button
              className="mt-5 bg-green-600 text-white w-full"
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;

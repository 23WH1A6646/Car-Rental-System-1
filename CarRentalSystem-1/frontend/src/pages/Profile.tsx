import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, UserCircle, Save, Edit3, Mail, BadgeCheck } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authState, setAuthState } = useAuth();
  const user = authState.user;
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleProfileUpdate = async () => {
    if (!user?.email) return;
    setIsSaving(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/update-profile", {
        currentEmail: user.email,
        newName: name,
        newEmail: email,
      });

      setAuthState({
        ...authState,
        user: {
          ...user,
          name: response.data.name,
          email: response.data.email,
        },
      });

      toast({ title: "Profile updated successfully!" });
      setEditMode(false);
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast({ title: "Email is missing", variant: "destructive" });
      return;
    }

    setOtpLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/request-otp", { email });
      toast({ title: "OTP sent to your email" });
      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-3xl animate-fade-in relative">
        {/* Avatar at top center */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg border-4 border-white flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </div>

        <div className="mt-20 space-y-6 text-gray-700">
          <h1 className="text-3xl font-bold text-center text-rental-blue flex items-center justify-center gap-2">
            <UserCircle className="text-rental-blue h-8 w-8" /> My Profile
          </h1>

          {/* Full Name */}
          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center gap-2">
              <UserCircle className="text-blue-500 w-5 h-5" />
              {editMode ? (
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{user?.name || "N/A"}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="text-green-500 w-5 h-5" />
              {editMode ? (
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{user?.email || "N/A"}</p>
              )}
            </div>
          </div>

          {/* Role */}
          <div className="bg-gray-50 p-5 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-purple-500 w-5 h-5" />
              <p className="text-lg font-semibold">
                {user?.email === "admin@gmail.com" ? "Admin" : "Customer"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            {editMode ? (
              <Button
                onClick={handleProfileUpdate}
                disabled={isSaving}
                className="bg-green-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-rental-blue text-white"
              >
                <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}

            <Button
              onClick={handleSendOtp}
              disabled={otpLoading}
              className="bg-yellow-600 text-white flex items-center justify-center"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              {otpLoading ? "Sending OTP..." : "Reset Password via OTP"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

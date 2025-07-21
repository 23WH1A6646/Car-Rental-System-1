import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LockKeyhole, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(to bottom right, #e6ecff, #4169E1)',
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center text-[#4169E1] mb-2">
            <LockKeyhole className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-extrabold">Welcome Back!</h1>
          </div>
          <p className="text-sm text-gray-500">Login to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 pr-10"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4169E1] hover:bg-blue-800 text-white text-md font-semibold py-2"
          >
            Login
          </Button>
        </form>

        {/* Forgot Password */}
        <p
          className="text-sm text-center text-[#4169E1] mt-4 cursor-pointer hover:underline"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </p>

        {/* Register redirect */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <span
            className="text-[#4169E1] hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

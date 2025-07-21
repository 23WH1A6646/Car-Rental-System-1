import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Smartphone, ScanLine, IndianRupee } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const PaymentPage = () => {
  const { bookingId, amount } = useParams();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'PHONEPE' | 'RAZORPAY' | 'GPAY'>('PHONEPE');
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!bookingId || !amount) {
      toast({
        title: 'Missing Booking Info',
        description: 'Redirecting to home page...',
        variant: 'destructive',
      });
      setTimeout(() => navigate('/'), 2000);
    }
  }, [bookingId, amount, navigate]);

  const validateInputs = () => {
    if (paymentMethod === 'PHONEPE') {
      if (!/^\d{10}$/.test(phoneNumber)) {
        toast({ title: 'Invalid Phone Number', description: 'Enter a valid 10-digit number.', variant: 'destructive' });
        return false;
      }
    }
    if (paymentMethod === 'GPAY') {
      if (!upiId.includes('@')) {
        toast({ title: 'Invalid UPI ID', description: 'Enter a valid UPI ID.', variant: 'destructive' });
        return false;
      }
    }
    if (paymentMethod === 'RAZORPAY') {
      if (!email.includes('@')) {
        toast({ title: 'Invalid Email', description: 'Enter a valid email address.', variant: 'destructive' });
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!bookingId || !amount || !validateInputs()) return;

    try {
      setLoading(true);

      await axios.post('http://localhost:8080/api/payments/create', {
        bookingId: Number(bookingId),
        amount: Number(amount),
        method: paymentMethod,
      });

      await axios.put(`http://localhost:8080/api/bookings/${bookingId}/status`, {
        status: 'PAID',
      });

      toast({
        title: 'Payment Successful',
        description: 'Your booking is now confirmed!',
      });

      navigate('/bookings');
    } catch (error) {
      console.error('Payment Error:', error);
      toast({
        title: 'Payment Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Payment Summary */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Confirm Your Payment</h2>
            <p className="text-lg">Booking ID:</p>
            <p className="font-semibold text-xl mb-4">#{bookingId}</p>

            <div className="mt-6 space-y-2">
              <p className="text-lg">Total Amount</p>
              <div className="flex items-center text-3xl font-bold">
                <IndianRupee className="w-6 h-6 mr-1" />
                {amount}
              </div>
            </div>
          </div>

          <p className="text-sm opacity-80 mt-8">Secured & Encrypted by CarRental System</p>
        </div>

        {/* Right: Payment Form */}
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-semibold">Select a Payment Method</h3>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(val) => setPaymentMethod(val as 'PHONEPE' | 'RAZORPAY' | 'GPAY')}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="PHONEPE" id="phonepe" />
              <label htmlFor="phonepe" className="flex items-center space-x-2 text-sm cursor-pointer">
                <Smartphone className="w-4 h-4 text-blue-500" />
                <span>PhonePe (via mobile number)</span>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="RAZORPAY" id="razorpay" />
              <label htmlFor="razorpay" className="flex items-center space-x-2 text-sm cursor-pointer">
                <ScanLine className="w-4 h-4 text-green-600" />
                <span>Razorpay (UPI / Card / Netbanking)</span>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="GPAY" id="gpay" />
              <label htmlFor="gpay" className="flex items-center space-x-2 text-sm cursor-pointer">
                <Smartphone className="w-4 h-4 text-black" />
                <span>Google Pay (scan & pay)</span>
              </label>
            </div>
          </RadioGroup>

          {/* Conditional Inputs */}
          {paymentMethod === 'PHONEPE' && (
            <div>
              <label className="text-sm font-medium mb-1">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'GPAY' && (
            <div>
              <label className="text-sm font-medium mb-1">GPay UPI ID</label>
              <Input
                type="text"
                placeholder="e.g. yourname@okaxis"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}
          {paymentMethod === 'RAZORPAY' && (
            <div>
              <label className="text-sm font-medium mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="e.g. example@razorpay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Processing Payment...
              </div>
            ) : (
              'Confirm & Pay'
            )}
          </Button>
        </div>
      </div>

      {/* Full screen spinner if loading */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-600" />
            <p className="text-xl font-medium">Redirecting after payment...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

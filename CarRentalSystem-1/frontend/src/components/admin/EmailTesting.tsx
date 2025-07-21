
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { MailCheck, Loader2 } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: 'booking-confirmation',
    name: 'Booking Confirmation',
    subject: 'Your booking has been confirmed',
    content: `Dear {{name}},

Thank you for booking with our car rental service. Your booking has been confirmed.

Booking Details:
- Car: {{car}}
- Pickup Date: {{pickupDate}}
- Return Date: {{returnDate}}
- Total Amount: {{amount}}

We look forward to serving you!

Best regards,
Car Rental Team`
  },
  {
    id: 'booking-canceled',
    name: 'Booking Canceled',
    subject: 'Your booking has been canceled',
    content: `Dear {{name}},

Your booking with our car rental service has been canceled as requested.

Booking Details:
- Booking ID: {{bookingId}}
- Car: {{car}}
- Pickup Date: {{pickupDate}}
- Return Date: {{returnDate}}

If you didn't request this cancellation, please contact our customer support immediately.

Best regards,
Car Rental Team`
  },
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to Our Car Rental Service',
    content: `Dear {{name}},

Welcome to our car rental service! We're thrilled to have you onboard.

Your account has been successfully created and you can now start booking cars through our platform.

If you have any questions or need assistance, please don't hesitate to contact our customer support team.

Best regards,
Car Rental Team`
  }
];

const EmailTesting = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentEmails, setSentEmails] = useState<{to: string, subject: string, date: string}[]>([]);
  
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = mockTemplates.find(t => t.id === templateId);
    
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
    }
  };
  
  const handleSendEmail = () => {
    if (!recipient || !subject || !content) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!recipient.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSending(true);
    
    
    setTimeout(() => {
      setIsSending(false);
      setSentEmails([
        {
          to: recipient,
          subject: subject,
          date: new Date().toLocaleString()
        },
        ...sentEmails
      ]);
      toast.success(`Email sent to ${recipient}`);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Email Testing</h2>
        <p className="text-gray-500">Test email templates and send test emails</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Custom Email</SelectItem>
                  {mockTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Email</Label>
              <Input
                id="recipient"
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Email content"
                rows={10}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSendEmail}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MailCheck className="mr-2 h-4 w-4" />
                  Send Test Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sent Test Emails</CardTitle>
          </CardHeader>
          <CardContent>
            {sentEmails.length > 0 ? (
              <div className="space-y-4">
                {sentEmails.map((email, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-md bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{email.subject}</p>
                        <p className="text-sm text-gray-500">To: {email.to}</p>
                      </div>
                      <p className="text-xs text-gray-500">{email.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">No test emails sent yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailTesting;

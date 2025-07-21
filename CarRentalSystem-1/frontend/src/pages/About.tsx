
import MainLayout from '@/components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="bg-rental-background min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-rental-blue mb-6">About Our Car Rental Service</h1>
            
            <p className="mb-6 text-gray-600">
              Welcome to our premier car rental platform. We provide a seamless experience for renting 
              high-quality vehicles for your business trips, vacations, or everyday needs.
            </p>
            
            <h2 className="text-xl font-semibold text-rental-blue mb-4">Our Mission</h2>
            <p className="mb-6 text-gray-600">
              To provide convenient, affordable, and reliable transportation solutions for our 
              customers with exceptional service and well-maintained vehicles.
            </p>
            
            <h2 className="text-xl font-semibold text-rental-blue mb-4">Why Choose Us</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Wide selection of vehicles to suit every need and budget</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Convenient booking and pickup process</li>
              <li>24/7 customer support</li>
              <li>Clean, well-maintained and regularly serviced vehicles</li>
              <li>Flexible rental terms to accommodate your schedule</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-rental-blue mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions or need assistance, please don't hesitate to contact our 
              customer support team at <span className="text-rental-teal">support@carrentalservice.com</span> or 
              call us at <span className="text-rental-teal">1-800-RENT-CAR</span>.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;

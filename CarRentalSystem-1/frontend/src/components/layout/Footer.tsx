
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rental-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold">CarCompass</span>
            </div>
            <p className="text-gray-300 mb-4">
              Making car rentals seamless and enjoyable with our premium fleet and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/cars" className="text-gray-300 hover:text-white">Browse Cars</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/cars?type=SUV" className="text-gray-300 hover:text-white">SUV</Link></li>
              <li><Link to="/cars?type=Sedan" className="text-gray-300 hover:text-white">Sedan</Link></li>
              <li><Link to="/cars?type=Sports" className="text-gray-300 hover:text-white">Sports</Link></li>
              <li><Link to="/cars?type=Luxury" className="text-gray-300 hover:text-white">Luxury</Link></li>
              <li><Link to="/cars?type=Electric" className="text-gray-300 hover:text-white">Electric</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-rental-teal" />
                <span className="text-gray-300">
                  123 Ram Nagar, Bachupally, Hyderabad, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-rental-teal" />
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-rental-teal" />
                <span className="text-gray-300">info@carcompass.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} CarCompass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

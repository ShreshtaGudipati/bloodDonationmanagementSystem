
import { Link } from "react-router-dom";
import { Heart, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/about" className="text-gray-500 hover:text-gray-700">
            About
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-700">
            Contact
          </Link>
          <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
            Privacy
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-700">
            Terms
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <div className="flex items-center justify-center text-blood-red">
            <Heart className="h-5 w-5 mr-1" />
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Lifeline Blood Donation System
            </p>
          </div>
          <div className="mt-2 flex justify-center space-x-6">
            <a
              href="tel:+1800LIFELINE"
              className="text-gray-500 hover:text-blood-red flex items-center"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-xs">+1 800 LIFELINE</span>
            </a>
            <a
              href="mailto:help@lifeline.org"
              className="text-gray-500 hover:text-blood-red flex items-center"
            >
              <Mail className="h-4 w-4 mr-1" />
              <span className="text-xs">help@lifeline.org</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

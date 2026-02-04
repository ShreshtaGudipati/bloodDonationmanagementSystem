
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-blood-red" />
        </div>
        
        <h1 className="text-6xl font-bold text-blood-red mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! We couldn't find the page you're looking for.</p>
        
        <div className="text-gray-500 mb-8 max-w-md mx-auto">
          <p>
            The page might have been moved, deleted, or perhaps never existed.
            Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/search">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search for Donors
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <a 
              href="mailto:help@lifeline.org" 
              className="text-blood-red hover:underline"
            >
              help@lifeline.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

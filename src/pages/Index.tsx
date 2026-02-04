
import { Link } from "react-router-dom";
import { Droplet, Search, Heart, Award, Map, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BloodUrgencySection from "@/components/home/BloodUrgencySection";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/navigation/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <BloodUrgencySection />
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Lifeline Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform connects blood donors with those in need, making the donation process simple and efficient.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blood-red rounded-md shadow-lg">
                        <Search className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Find Donors</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Search for blood donors based on blood group, location, and availability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blood-red rounded-md shadow-lg">
                        <Droplet className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Request Blood</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Create blood requests that notify nearby compatible donors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blood-red rounded-md shadow-lg">
                        <Award className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Earn Rewards</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get certificates, badges, and discounts for your donations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Upcoming Blood Donation Camps
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Join us at these upcoming events and help save lives.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((camp) => (
              <Card key={camp} className="overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">Community Blood Drive</h3>
                  <p className="text-sm text-gray-500 mt-2">April {camp + 9}, 2023 • 9:00 AM - 5:00 PM</p>
                  <p className="mt-3">Central Hospital, 123 Main St.</p>
                  <Button variant="outline" className="w-full mt-4">
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/blood-banks">
              <Button>View All Events</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <TestimonialSection />

      <section className="bg-blood-red py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to become a donor?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-red-100">
                Join our community of donors and help save lives. Your donation can make a significant difference.
              </p>
              <div className="mt-8 flex space-x-4">
                <Button variant="secondary">Register Now</Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blood-red">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-blood-red" />
                    <h3 className="ml-3 text-xl font-medium text-gray-900">Did you know?</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blood-red">•</span>
                      <p className="ml-3 text-base text-gray-700">One donation can save up to three lives</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blood-red">•</span>
                      <p className="ml-3 text-base text-gray-700">Someone needs blood every two seconds</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blood-red">•</span>
                      <p className="ml-3 text-base text-gray-700">Only 37% of the population is eligible to donate blood</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blood-red">•</span>
                      <p className="ml-3 text-base text-gray-700">Blood cannot be manufactured; it only comes from donors</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

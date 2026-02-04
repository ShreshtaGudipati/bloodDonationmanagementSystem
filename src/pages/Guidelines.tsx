
import { useState } from "react";
import {
  Heart,
  Check,
  Clock,
  Coffee,
  Droplet,
  AlertCircle,
  Calendar,
  Apple,
  Pizza,
  X,
  Clipboard,
  Salad,
  Utensils,
  Bed,
  Activity,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Guidelines = () => {
  const [activeTab, setActiveTab] = useState("before");

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Blood Donation Guidelines</h1>
        <p className="text-gray-600">
          Follow these guidelines to ensure a safe and successful blood donation experience.
        </p>
      </div>

      <Tabs defaultValue="before" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-xl grid-cols-3">
            <TabsTrigger value="before">Before Donation</TabsTrigger>
            <TabsTrigger value="during">During Donation</TabsTrigger>
            <TabsTrigger value="after">After Donation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="before">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-blood-red mr-2" />
                    <h2 className="text-xl font-semibold">Preparation Tips</h2>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Get a good night's sleep before donation day</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Eat a healthy meal 2-3 hours before donating</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Drink plenty of water (at least 16 oz) before donating</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Wear comfortable clothing with sleeves that can be rolled up</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Bring ID and list of medications you take</span>
                    </li>
                  </ul>

                  <div className="flex items-center mb-4">
                    <Droplet className="w-6 h-6 text-blood-red mr-2" />
                    <h2 className="text-xl font-semibold">Foods to Eat</h2>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex">
                      <Apple className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Iron-rich foods like spinach, red meat, beans</span>
                    </li>
                    <li className="flex">
                      <Salad className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Vitamin C foods (helps iron absorption)</span>
                    </li>
                    <li className="flex">
                      <Utensils className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Well-balanced meals with protein</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-6 h-6 text-blood-red mr-2" />
                    <h2 className="text-xl font-semibold">Avoid Before Donating</h2>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex">
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span>Alcoholic beverages 24 hours before donation</span>
                    </li>
                    <li className="flex">
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span>Fatty foods like pizza, french fries, etc.</span>
                    </li>
                    <li className="flex">
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span>Strenuous exercise on donation day</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-red-50 rounded-md">
                    <div className="flex">
                      <Calendar className="w-5 h-5 text-blood-red mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Donation Frequency</h3>
                        <p className="text-sm mt-1 text-gray-600">
                          Whole blood donation: Every 56 days (8 weeks)<br />
                          Platelet donation: Every 7 days (up to 24 times per year)<br />
                          Plasma donation: Every 28 days (up to 13 times per year)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button>
                      <Clipboard className="mr-2 h-4 w-4" />
                      Take Eligibility Quiz
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Common Eligibility Questions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Age Requirements</h4>
                          <p className="text-sm text-gray-600">
                            Most donors must be at least 17 years old (16 with parental consent in some states).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Weight Requirements</h4>
                          <p className="text-sm text-gray-600">
                            Donors typically need to weigh at least 110 pounds (50 kg).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Health Conditions</h4>
                          <p className="text-sm text-gray-600">
                            You must be in good general health and feeling well on donation day.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Travel Restrictions</h4>
                          <p className="text-sm text-gray-600">
                            Recent travel to certain countries may temporarily defer eligibility.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="during">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blood-red mr-2" />
                  <h2 className="text-xl font-semibold">What to Expect</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blood-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <h3 className="font-medium">Registration</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 pl-11">
                        You'll sign in, show ID, and read information about donating blood.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blood-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <h3 className="font-medium">Health History</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 pl-11">
                        You'll answer questions about your health history and places you've traveled.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blood-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <h3 className="font-medium">Mini-Physical</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 pl-11">
                        Staff will check your temperature, pulse, blood pressure, and hemoglobin levels.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blood-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                          4
                        </div>
                        <h3 className="font-medium">Donation</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 pl-11">
                        The actual donation takes about 8-10 minutes. You'll be seated comfortably while a pint of blood is drawn.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-blood-red rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                          5
                        </div>
                        <h3 className="font-medium">Refreshments</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 pl-11">
                        After donating, you'll rest and enjoy snacks and drinks for 15 minutes before leaving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-6">
                <h3 className="font-medium flex items-center text-blue-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  During the Donation
                </h3>
                <ul className="ml-7 mt-2 text-sm text-gray-700 space-y-1 list-disc">
                  <li>Try to relax and remain calm</li>
                  <li>Inform the staff if you feel dizzy or uncomfortable</li>
                  <li>Practice opening and closing your fist to help blood flow</li>
                  <li>The entire process from registration to refreshments takes about an hour</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="after">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Check className="w-6 h-6 text-green-500 mr-2" />
                    <h2 className="text-xl font-semibold">Immediately After Donating</h2>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex">
                      <Coffee className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>Stay in the refreshment area for at least 15 minutes</span>
                    </li>
                    <li className="flex">
                      <Droplet className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>Drink extra fluids for the next 48 hours</span>
                    </li>
                    <li className="flex">
                      <Bed className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>If you feel dizzy, lie down with your feet elevated</span>
                    </li>
                    <li className="flex">
                      <Activity className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>Avoid strenuous activities for the rest of the day</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                    <h3 className="font-medium flex items-center text-yellow-800">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      When to Seek Help
                    </h3>
                    <p className="mt-2 text-sm">
                      Contact your donation center or healthcare provider if you:
                    </p>
                    <ul className="ml-7 mt-1 text-sm text-gray-700 space-y-1 list-disc">
                      <li>Feel faint or dizzy for more than 24 hours</li>
                      <li>Notice excessive redness, pain, or swelling at donation site</li>
                      <li>Develop a fever within 24 hours of donation</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-blood-red mr-2" />
                    <h2 className="text-xl font-semibold">The Following Days</h2>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Keep your bandage on for 4-5 hours</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Continue drinking extra fluids for 48 hours</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Eat iron-rich foods to replenish red blood cells</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Wait at least 24 hours before heavy exercise</span>
                    </li>
                    <li className="flex">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Avoid alcohol for 24 hours after donating</span>
                    </li>
                  </ul>

                  <div className="p-4 bg-green-50 rounded-md border border-green-200">
                    <h3 className="font-medium flex items-center text-green-800">
                      <Heart className="w-5 h-5 mr-2" />
                      Recovery Facts
                    </h3>
                    <ul className="ml-7 mt-2 text-sm text-gray-700 space-y-1 list-disc">
                      <li>Your body replaces plasma within 24 hours</li>
                      <li>Red blood cells are replaced within 4-6 weeks</li>
                      <li>The small needle mark should heal within a few days</li>
                      <li>You can donate whole blood again after 56 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-10">
        <Button variant="outline" disabled={activeTab === "before"} onClick={() => setActiveTab(activeTab === "during" ? "before" : activeTab === "after" ? "during" : "before")}>
          Previous
        </Button>
        <Button className="ml-4" disabled={activeTab === "after"} onClick={() => setActiveTab(activeTab === "before" ? "during" : activeTab === "during" ? "after" : "after")}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Guidelines;

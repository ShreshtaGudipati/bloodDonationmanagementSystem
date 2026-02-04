
import { useState } from "react";
import { MapPin, Calendar, Clock, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

// Mock blood requests
const mockRequests = [
  {
    id: "1001",
    patientName: "Michael Brown",
    bloodGroup: "A+",
    units: "2",
    hospital: "City Hospital",
    requiredBy: "2023-04-05",
    reason: "Surgery preparation for accident victim.",
    contact: "+1 (555) 789-0123",
    urgency: "urgent",
    status: "in-progress",
    createdAt: "2023-04-03",
    donorsResponded: 3
  },
  {
    id: "1002",
    patientName: "Sarah Wilson",
    bloodGroup: "O-",
    units: "3",
    hospital: "Memorial Medical Center",
    requiredBy: "2023-03-26",
    reason: "Chemotherapy support for cancer patient.",
    contact: "+1 (555) 456-7890",
    urgency: "normal",
    status: "fulfilled",
    createdAt: "2023-03-25",
    donorsResponded: 5
  }
];

const RequestBlood = () => {
  const { toast } = useToast();
  const [urgencyLevel, setUrgencyLevel] = useState("normal");
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [requiredBy, setRequiredBy] = useState("");
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myRequests, setMyRequests] = useState(mockRequests);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission with progress
    setProgress(15);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 500);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Create a new request
      const newRequest = {
        id: `${1000 + myRequests.length + 1}`,
        patientName,
        bloodGroup,
        units,
        hospital,
        requiredBy,
        reason,
        contact,
        urgency: urgencyLevel,
        status: "in-progress",
        createdAt: new Date().toISOString().split('T')[0],
        donorsResponded: 0
      };
      
      setMyRequests([newRequest, ...myRequests]);
      
      toast({
        title: "Blood request submitted",
        description: urgencyLevel === "critical" 
          ? "Emergency notifications sent to all compatible donors in your area."
          : "Your request has been posted. We'll notify you when donors respond.",
      });
      
      // Reset form
      setPatientName("");
      setBloodGroup("");
      setUnits("");
      setRequiredBy("");
      setHospital("");
      setReason("");
      setContact("");
      setUrgencyLevel("normal");
      setSubmitting(false);
    }, 3000);
  };
  
  const handleDeleteRequest = (id: string) => {
    setMyRequests(myRequests.filter(request => request.id !== id));
    toast({
      title: "Request deleted",
      description: "Your blood request has been removed successfully.",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Request Blood</h1>
      
      <Tabs defaultValue="new-request" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new-request">
          <Card className="border border-gray-200 shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Create Blood Request</CardTitle>
              <CardDescription>
                Fill out the form below to request blood. We'll notify matched donors in your area.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Patient Name</Label>
                    <Input
                      id="patient-name"
                      placeholder="Enter patient name"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blood-group">Blood Group Needed</Label>
                    <Select required value={bloodGroup} onValueChange={setBloodGroup}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Blood Groups</SelectLabel>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="units">Units Required</Label>
                    <Select required value={units} onValueChange={setUnits}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Unit</SelectItem>
                        <SelectItem value="2">2 Units</SelectItem>
                        <SelectItem value="3">3 Units</SelectItem>
                        <SelectItem value="4">4 Units</SelectItem>
                        <SelectItem value="5">5 Units</SelectItem>
                        <SelectItem value="6+">6+ Units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="required-by">Required By</Label>
                    <Input
                      id="required-by"
                      type="date"
                      required
                      value={requiredBy}
                      onChange={(e) => setRequiredBy(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital/Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hospital"
                      placeholder="Enter hospital or location"
                      className="pl-10"
                      required
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Urgency Level</Label>
                  <RadioGroup 
                    defaultValue="normal" 
                    className="flex space-x-4"
                    onValueChange={setUrgencyLevel}
                    value={urgencyLevel}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal" className="text-gray-700">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="text-yellow-600">Urgent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="critical" />
                      <Label htmlFor="critical" className="text-red-600">Critical</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {urgencyLevel === "critical" && (
                  <div className="p-4 bg-red-50 rounded-md border border-red-200 flex">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    <p className="text-sm text-red-600">
                      Critical requests will be sent as emergency notifications to all compatible donors in your area. Please only use this for life-threatening situations.
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Request</Label>
                  <Textarea
                    id="reason"
                    placeholder="Briefly describe the medical condition requiring blood..."
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="Phone number for donors to contact"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                
                {submitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing request...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
                
                <Button
                  type="submit"
                  className={`w-full ${
                    urgencyLevel === "critical" ? "bg-red-600 hover:bg-red-700" :
                    urgencyLevel === "urgent" ? "bg-yellow-600 hover:bg-yellow-700" :
                    ""
                  }`}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Submit Blood Request"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center text-sm text-gray-500">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>Need assistance? Contact our 24/7 helpline at <a href="tel:+1800LIFELINE" className="text-blood-red">1-800-LIFELINE</a></span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-requests">
          <div className="mt-6 space-y-6">
            {myRequests.map((request) => (
              <Card key={request.id} className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Blood Request #{request.id}
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                          request.status === "in-progress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                        }`}>
                          {request.status === "in-progress" ? "In Progress" : "Fulfilled"}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Requested on {request.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blood-red mr-1">
                        {request.bloodGroup}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({request.units} units)
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{request.hospital}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>Required by {request.requiredBy}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      {request.reason}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-gray-200 bg-gray-50">
                  <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">
                        {request.status === "in-progress" 
                          ? `${request.donorsResponded} donors have responded` 
                          : `Completed on ${request.requiredBy}`}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === "in-progress" ? (
                        <>
                          <Button variant="outline" size="sm">
                            View Responses
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            Delete Request
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Create Similar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {myRequests.length === 0 && (
              <div className="bg-white rounded-lg border p-8 text-center">
                <p className="text-gray-500 mb-2">You haven't created any blood requests yet.</p>
                <Button 
                  variant="default" 
                  onClick={() => document.querySelector('[value="new-request"]')?.dispatchEvent(new Event('click'))}
                >
                  Create Your First Request
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestBlood;

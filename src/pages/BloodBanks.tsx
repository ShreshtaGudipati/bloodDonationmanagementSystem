
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Phone, Clock, Calendar, ExternalLink, Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock blood bank data
const mockBloodBanks = [
  {
    id: '1',
    name: 'City Blood Center',
    address: '123 Main St, New York, NY 10001',
    phone: '(212) 555-1234',
    hours: 'Mon-Fri: 8am-8pm, Sat-Sun: 10am-6pm',
    website: 'https://citybloodcenter.org',
    coordinates: { lat: 40.7128, lng: -74.006 },
    bloodAvailability: {
      'A+': 'High',
      'A-': 'Medium',
      'B+': 'Low',
      'B-': 'Medium',
      'AB+': 'High',
      'AB-': 'Very Low',
      'O+': 'Medium',
      'O-': 'Very Low'
    },
    upcomingDrives: [
      { date: '2024-04-15', name: 'Community Blood Drive', location: 'Central Park' },
      { date: '2024-04-28', name: 'Corporate Donation Day', location: 'Tech Hub Building' }
    ]
  },
  {
    id: '2',
    name: 'Memorial Hospital Blood Bank',
    address: '456 Park Ave, New York, NY 10022',
    phone: '(212) 555-6789',
    hours: '24/7',
    website: 'https://memorialhospital.org/bloodbank',
    coordinates: { lat: 40.7581, lng: -73.9855 },
    bloodAvailability: {
      'A+': 'High',
      'A-': 'Low',
      'B+': 'Medium',
      'B-': 'Low',
      'AB+': 'Medium',
      'AB-': 'Very Low',
      'O+': 'Low',
      'O-': 'Critical'
    },
    upcomingDrives: [
      { date: '2024-04-10', name: 'Hospital Staff Drive', location: 'Memorial Hospital' }
    ]
  },
  {
    id: '3',
    name: 'Red Cross Donation Center',
    address: '789 Broadway, New York, NY 10003',
    phone: '(212) 555-4321',
    hours: 'Mon-Sat: 9am-7pm, Sun: Closed',
    website: 'https://redcross.org/donate/blood',
    coordinates: { lat: 40.7352, lng: -73.9911 },
    bloodAvailability: {
      'A+': 'Medium',
      'A-': 'Medium',
      'B+': 'High',
      'B-': 'Medium',
      'AB+': 'High',
      'AB-': 'Medium',
      'O+': 'Low',
      'O-': 'Low'
    },
    upcomingDrives: [
      { date: '2024-04-20', name: 'University Blood Drive', location: 'NYU Campus' },
      { date: '2024-05-05', name: 'Spring Community Drive', location: 'Washington Square Park' },
      { date: '2024-05-15', name: 'Emergency Services Drive', location: 'Fire Department HQ' }
    ]
  }
];

// Mock community drive data
const mockCommunityDrives = [
  {
    id: '101',
    name: 'Central Park Blood Drive',
    date: '2024-04-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Central Park, East Meadow',
    organizer: 'City Blood Center',
    bloodTypesNeeded: ['O-', 'B-', 'AB-'],
    registration: 'https://citybloodcenter.org/central-park-drive'
  },
  {
    id: '102',
    name: 'Corporate Wellness Day',
    date: '2024-04-28',
    time: '9:00 AM - 5:00 PM',
    location: 'Tech Hub Building, 101 Hudson St',
    organizer: 'City Blood Center & Tech Companies Coalition',
    bloodTypesNeeded: ['All Types'],
    registration: 'https://techhub.org/wellness-day'
  },
  {
    id: '103',
    name: 'University Blood Drive',
    date: '2024-04-20',
    time: '11:00 AM - 7:00 PM',
    location: 'NYU Campus, Student Center',
    organizer: 'Red Cross & NYU Health',
    bloodTypesNeeded: ['O+', 'O-', 'A+', 'B+'],
    registration: 'https://nyu.edu/blood-drive'
  }
];

const getAvailabilityColor = (level: string) => {
  switch (level) {
    case 'High':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Very Low':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Critical':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const BloodBanksPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(mockBloodBanks);
  const [filteredDrives, setFilteredDrives] = useState(mockCommunityDrives);
  const [selectedBank, setSelectedBank] = useState<typeof mockBloodBanks[0] | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    // Filter blood banks
    const banks = mockBloodBanks.filter(bank => 
      bank.name.toLowerCase().includes(query) || 
      bank.address.toLowerCase().includes(query)
    );
    
    // Filter community drives
    const drives = mockCommunityDrives.filter(drive => 
      drive.name.toLowerCase().includes(query) || 
      drive.location.toLowerCase().includes(query) ||
      drive.organizer.toLowerCase().includes(query)
    );
    
    setFilteredBanks(banks);
    setFilteredDrives(drives);
    
    toast({
      title: `Search results`,
      description: `Found ${banks.length} blood banks and ${drives.length} community drives.`
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleViewDetails = (bank: typeof mockBloodBanks[0]) => {
    setSelectedBank(bank);
  };
  
  const handleScheduleAppointment = (bankId: string) => {
    toast({
      title: "Appointment scheduling",
      description: "You'll be redirected to the blood bank's appointment system."
    });
  };
  
  const handleRegisterForDrive = (driveUrl: string) => {
    toast({
      title: "Registration",
      description: "Opening registration page in a new tab."
    });
    // In a real app, this would open a new tab or redirect to the registration URL
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blood Banks & Donation Centers</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, location, or zip code..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${selectedBank ? "col-span-1" : "lg:col-span-3"}`}>
          <Tabs defaultValue="banks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="banks">Blood Banks</TabsTrigger>
              <TabsTrigger value="drives">Community Drives</TabsTrigger>
            </TabsList>
            
            <TabsContent value="banks">
              <Card>
                <CardHeader>
                  <CardTitle>Available Blood Banks</CardTitle>
                  <CardDescription>
                    Find blood banks and donation centers in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredBanks.length > 0 ? (
                    <div className="space-y-4">
                      {filteredBanks.map(bank => (
                        <Card key={bank.id} className="overflow-hidden">
                          <div className="border-b p-4">
                            <h3 className="text-lg font-bold">{bank.name}</h3>
                            <div className="mt-2 text-sm text-gray-500 flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                              <span>{bank.address}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500 flex items-start">
                              <Phone className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                              <span>{bank.phone}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500 flex items-start">
                              <Clock className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                              <span>{bank.hours}</span>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50">
                            <div className="grid grid-cols-4 gap-2">
                              {Object.entries(bank.bloodAvailability).map(([type, level]) => (
                                <Badge 
                                  key={type} 
                                  variant="outline" 
                                  className={`${getAvailabilityColor(level)}`}
                                >
                                  {type}: {level}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-4 flex justify-between items-center">
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(bank)}>
                              View Details
                            </Button>
                            <Button size="sm" onClick={() => handleScheduleAppointment(bank.id)}>
                              Schedule Appointment
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No blood banks found matching your search.</p>
                      <p className="text-sm text-gray-400 mt-2">Try a different location or keyword.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drives">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Blood Drives</CardTitle>
                  <CardDescription>
                    Community blood drives and donation events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredDrives.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Blood Types</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDrives.map(drive => (
                          <TableRow key={drive.id}>
                            <TableCell className="font-medium">{drive.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(drive.date)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <Clock className="h-3 w-3 inline-block mr-1" />
                                {drive.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{drive.location}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Organized by: {drive.organizer}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {drive.bloodTypesNeeded.map(type => (
                                  <Badge 
                                    key={type} 
                                    variant="outline" 
                                    className="bg-red-100 text-red-800 border-red-200"
                                  >
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                onClick={() => handleRegisterForDrive(drive.registration)}
                                className="whitespace-nowrap"
                              >
                                Register
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming blood drives found.</p>
                      <p className="text-sm text-gray-400 mt-2">Check back later or try a different search.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {selectedBank && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>{selectedBank.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{selectedBank.address}</span>
                    </div>
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedBank(null)}
                >
                  Close
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Blood availability */}
                <div>
                  <h3 className="font-semibold mb-2">Current Blood Availability</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(selectedBank.bloodAvailability).map(([type, level]) => (
                      <div key={type} className="text-center">
                        <div className="text-lg font-bold text-blood-red">{type}</div>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${getAvailabilityColor(level)}`}
                        >
                          {level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Upcoming drives */}
                <div>
                  <h3 className="font-semibold mb-2">Upcoming Drives at This Center</h3>
                  {selectedBank.upcomingDrives.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>Location</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedBank.upcomingDrives.map((drive, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(drive.date)}</TableCell>
                            <TableCell className="font-medium">{drive.name}</TableCell>
                            <TableCell>{drive.location}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-gray-500">No upcoming drives at this center.</p>
                  )}
                </div>
                
                {/* Map placeholder */}
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map view coming soon</p>
                  </div>
                </div>
                
                {/* Contact & Appointment */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedBank.phone}</p>
                    <a 
                      href={selectedBank.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <Button onClick={() => handleScheduleAppointment(selectedBank.id)}>
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBanksPage;

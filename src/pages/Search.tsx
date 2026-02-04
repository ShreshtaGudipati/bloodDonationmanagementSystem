
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Phone, Mail, Filter, Target, AlertCircle, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for donors
const mockDonors = [
  {
    id: '1',
    name: 'John Doe',
    bloodGroup: 'A+',
    location: 'New York City, NY',
    distance: '2.3',
    lastDonation: '3 months ago',
    contact: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    available: true,
    donationCount: 8
  },
  {
    id: '2',
    name: 'Jane Smith',
    bloodGroup: 'O-',
    location: 'Brooklyn, NY',
    distance: '4.1',
    lastDonation: '1 month ago',
    contact: '+1 (555) 987-6543',
    email: 'jane.smith@example.com',
    available: true,
    donationCount: 12
  },
  {
    id: '3',
    name: 'Michael Johnson',
    bloodGroup: 'B+',
    location: 'Queens, NY',
    distance: '3.7',
    lastDonation: '6 months ago',
    contact: '+1 (555) 456-7890',
    email: 'michael.j@example.com',
    available: false,
    donationCount: 5
  },
  {
    id: '4',
    name: 'Emily Wilson',
    bloodGroup: 'AB+',
    location: 'Manhattan, NY',
    distance: '1.5',
    lastDonation: '2 months ago',
    contact: '+1 (555) 789-0123',
    email: 'emily.w@example.com',
    available: true,
    donationCount: 3
  },
  {
    id: '5',
    name: 'Robert Brown',
    bloodGroup: 'A-',
    location: 'Staten Island, NY',
    distance: '7.2',
    lastDonation: '4 months ago',
    contact: '+1 (555) 234-5678',
    email: 'robert.b@example.com',
    available: true,
    donationCount: 10
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [maxDistance, setMaxDistance] = useState<number[]>([10]);
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [searchResults, setSearchResults] = useState(mockDonors);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('distance'); // distance, donationCount, lastDonation

  useEffect(() => {
    // Sort results when sorting option or results change
    sortResults(sortBy);
  }, [sortBy, searchResults.length]);

  const sortResults = (sortField: string) => {
    const sortedResults = [...searchResults];
    
    switch (sortField) {
      case 'distance':
        sortedResults.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'donationCount':
        sortedResults.sort((a, b) => b.donationCount - a.donationCount);
        break;
      case 'lastDonation':
        // Simple sort by text - in real app would parse dates
        sortedResults.sort((a, b) => {
          if (a.lastDonation < b.lastDonation) return -1;
          if (a.lastDonation > b.lastDonation) return 1;
          return 0;
        });
        break;
    }
    
    setSearchResults(sortedResults);
  };

  const getUserLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          toast({
            title: "Location detected",
            description: "We'll search for donors near your current location."
          });
          
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Could not get your location. Please enter a location manually."
          });
          
          setIsGettingLocation(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter a location manually."
      });
      
      setIsGettingLocation(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate API call
    setTimeout(() => {
      let results = [...mockDonors];
      
      if (searchTerm) {
        results = results.filter(donor => 
          donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          donor.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedBloodGroup) {
        results = results.filter(donor => donor.bloodGroup === selectedBloodGroup);
      }
      
      if (maxDistance[0] < 10) {
        results = results.filter(donor => 
          parseFloat(donor.distance) <= maxDistance[0]
        );
      }
      
      if (onlyAvailable) {
        results = results.filter(donor => donor.available);
      }
      
      sortResults(sortBy);
      setSearchResults(results);
      setIsLoading(false);
      clearInterval(interval);
      setSearchProgress(100);
      
      toast({
        title: `${results.length} donors found`,
        description: results.length > 0 
          ? "Contact donors matching your criteria below." 
          : "Try adjusting your search filters for more results."
      });
    }, 2000);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const handleContactDonor = (donor: typeof mockDonors[0]) => {
    toast({
      title: `Contact request sent to ${donor.name}`,
      description: "The donor will be notified of your blood request."
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Search Blood Donors</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: Search filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center mb-4"
                    onClick={getUserLocation}
                    disabled={isGettingLocation}
                  >
                    <Target className="mr-2 h-4 w-4" />
                    {isGettingLocation ? 'Getting Location...' : 'Use My Location'}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="blood-group">Blood Group</Label>
                  <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="distance">Maximum Distance</Label>
                    <span className="text-sm text-gray-500">{maxDistance[0]} miles</span>
                  </div>
                  <Slider 
                    defaultValue={[10]} 
                    max={20} 
                    step={0.5}
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                  />
                </div>
                
                <div className="flex items-center space-x-4 pt-2">
                  <Switch 
                    id="available" 
                    checked={onlyAvailable} 
                    onCheckedChange={setOnlyAvailable}
                  />
                  <Label htmlFor="available">Only available donors</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort-by">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort results by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance (Closest)</SelectItem>
                      <SelectItem value="donationCount">Most Donations</SelectItem>
                      <SelectItem value="lastDonation">Recent Donations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Searching...' : 'Search Donors'}
                </Button>
                
                {isLoading && (
                  <div className="pt-2">
                    <Progress value={searchProgress} />
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Search results */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="list">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="pt-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map(donor => (
                        <div key={donor.id} className="flex flex-col md:flex-row border rounded-lg p-4 gap-4">
                          <div className="flex-shrink-0 flex flex-col items-center">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={`/placeholder.svg`} alt={donor.name} />
                              <AvatarFallback>{getInitials(donor.name)}</AvatarFallback>
                            </Avatar>
                            <div className="mt-2 text-center">
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                {donor.bloodGroup}
                              </Badge>
                            </div>
                            <div className="mt-1">
                              <Badge variant={donor.available ? "default" : "secondary"} className={donor.available ? "bg-green-100 text-green-800 border-green-200" : ""}>
                                {donor.available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{donor.name}</h3>
                            <div className="text-sm text-gray-600 space-y-1 mt-1">
                              <p className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {donor.location} ({donor.distance} miles)
                              </p>
                              <p className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                Last donation: {donor.lastDonation}
                              </p>
                              <p className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Total donations: {donor.donationCount}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:items-end justify-between gap-2">
                            <div>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {donor.contact}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {donor.email}
                              </p>
                            </div>
                            <Button 
                              onClick={() => handleContactDonor(donor)}
                              disabled={!donor.available}
                            >
                              Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No donors found matching your criteria.</p>
                      <p className="mt-2 text-sm text-gray-400">Try adjusting your search filters.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="map" className="pt-4">
                  <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500">Map view coming soon</p>
                      <p className="mt-2 text-sm text-gray-400">We're working on integrating map functionality</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

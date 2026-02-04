
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Heart, Award, AlertCircle, Users, Activity, Calendar as CalendarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for donation history
const donationHistory = [
  { id: 1, date: '2023-01-15', location: 'City Blood Bank', type: 'Whole Blood', recipient: 'Anonymous', completed: true },
  { id: 2, date: '2023-03-22', location: 'Memorial Hospital', type: 'Platelets', recipient: 'Jane Smith', completed: true },
  { id: 3, date: '2023-06-10', location: 'Red Cross Center', type: 'Whole Blood', recipient: 'Anonymous', completed: true },
  { id: 4, date: '2023-09-05', location: 'Community Drive', type: 'Plasma', recipient: 'COVID Treatment', completed: true },
  { id: 5, date: '2023-12-18', location: 'Regional Hospital', type: 'Whole Blood', recipient: 'Emergency', completed: true },
];

// Mock data for blood requests
const bloodRequests = [
  { id: 101, date: '2023-11-05', status: 'Fulfilled', bloodType: 'A+', hospital: 'City Hospital', patient: 'Anonymous' },
  { id: 102, date: '2024-02-10', status: 'Pending', bloodType: 'O-', hospital: 'St. Mary Medical Center', patient: 'Anonymous' },
];

// Mock stats
const userStats = {
  donationCount: 5,
  livesImpacted: 15,
  nextEligibleDate: '2024-05-15',
  bloodType: 'A+',
  rewards: 350,
  streak: 3,
  badges: ['First Donation', 'Regular Donor', 'Life Saver'],
  level: 'Silver',
  levelProgress: 65
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 mr-2">
                    {user?.bloodGroup}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {userStats.level} Donor
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Donation Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blood-red">{userStats.donationCount}</p>
                <p className="text-sm text-gray-500">Donations</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blood-red">{userStats.livesImpacted}</p>
                <p className="text-sm text-gray-500">Lives Impacted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Eligible Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarIcon className="h-10 w-10 text-blood-red mr-4" />
              <div>
                <p className="font-medium">{userStats.nextEligibleDate}</p>
                <p className="text-sm text-gray-500">56 days from last donation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Donor Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Level Progress</span>
                      <span className="text-sm text-gray-500">{userStats.levelProgress}%</span>
                    </div>
                    <Progress value={userStats.levelProgress} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Current Level: {userStats.level}</span>
                      <span className="text-sm text-gray-500">Next: Gold</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Donate 2 more times to reach Gold level</p>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Badges Earned</h4>
                    <div className="flex flex-wrap gap-2">
                      {userStats.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-blood-red mr-2" />
                    <span>Blood Pressure</span>
                  </div>
                  <span className="text-gray-600">120/80 mmHg</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blood-red mr-2" />
                    <span>Pulse Rate</span>
                  </div>
                  <span className="text-gray-600">72 bpm</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-blood-red mr-2" />
                    <span>Hemoglobin</span>
                  </div>
                  <span className="text-gray-600">14.2 g/dL</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-gray-500">Last check-up: March 15, 2024</p>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Complete Health Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>April 2, 2024</TableCell>
                      <TableCell>Eligibility Check</TableCell>
                      <TableCell>Eligible to donate</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 28, 2024</TableCell>
                      <TableCell>Donation</TableCell>
                      <TableCell>Whole Blood at City Blood Bank</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>March 15, 2024</TableCell>
                      <TableCell>Health Check</TableCell>
                      <TableCell>All parameters normal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>February 10, 2024</TableCell>
                      <TableCell>Blood Request</TableCell>
                      <TableCell>Created request for O- blood</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Your Donation History</CardTitle>
              <CardDescription>
                You've donated {userStats.donationCount} times and helped impact {userStats.livesImpacted} lives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Donation Type</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donationHistory.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.location}</TableCell>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.recipient}</TableCell>
                      <TableCell>
                        <Badge variant={donation.completed ? 'default' : 'secondary'}>
                          {donation.completed ? 'Completed' : 'Processing'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 text-center">
                <Button>
                  Schedule New Donation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Your Blood Requests</CardTitle>
              <CardDescription>
                Requests you've made for blood donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bloodRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bloodRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>#{request.id}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {request.bloodType}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.hospital}</TableCell>
                        <TableCell>
                          <Badge variant={request.status === 'Fulfilled' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">You haven't made any blood requests yet.</p>
                  <Button>Request Blood</Button>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  Create New Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;

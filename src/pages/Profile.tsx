
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Save, Upload, User } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isDonor, setIsDonor] = useState(user?.isDonor || false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: User info card and other actions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user ? getInitials(user.name) : <User />}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user?.name}</CardTitle>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {user?.bloodGroup || 'Unknown'} Blood Group
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mt-2">
                <Button className="w-full" variant="outline" onClick={() => console.log('Photo upload')}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Donor Status</span>
                  <span className={`py-1 px-2 rounded-full text-xs font-medium ${isDonor ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {isDonor ? 'Donor' : 'Not a donor'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Availability</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      checked={isAvailable}
                      onChange={() => setIsAvailable(!isAvailable)}
                      className="sr-only peer" 
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blood-red"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Blood Donation Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Donations</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Donation</span>
                  <span className="font-medium">2 months ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Lives Saved</span>
                  <span className="font-medium">9</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Tabs with forms */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="medical">Medical Info</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Your full name" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Your email address" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Your phone number" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)} 
                          placeholder="Your address" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)} 
                          placeholder="Your city" 
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="medical" className="pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="blood-group">Blood Group</Label>
                        <Select value={bloodGroup} onValueChange={setBloodGroup}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
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
                        <Label htmlFor="last-donation">Last Donation Date</Label>
                        <Input 
                          id="last-donation" 
                          type="date" 
                        />
                      </div>
                      
                      <div className="col-span-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="is-donor" 
                            checked={isDonor}
                            onCheckedChange={(checked) => setIsDonor(checked === true)}
                          />
                          <label
                            htmlFor="is-donor"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I want to be registered as a blood donor
                          </label>
                        </div>
                      </div>
                      
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="medical-conditions">Any Medical Conditions</Label>
                        <Input 
                          id="medical-conditions" 
                          placeholder="List any medical conditions" 
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="preferences" className="pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Notification Preferences</Label>
                        <div className="grid gap-2 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notify-email" defaultChecked />
                            <label
                              htmlFor="notify-email"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Email notifications
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notify-sms" defaultChecked />
                            <label
                              htmlFor="notify-sms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              SMS notifications
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notify-blood-requests" defaultChecked />
                            <label
                              htmlFor="notify-blood-requests"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Urgent blood requests in my area
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox id="notify-events" defaultChecked />
                            <label
                              htmlFor="notify-events"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Blood donation events and camps
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

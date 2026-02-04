
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, Gift, Download, Shield, Medal, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for rewards
const certificates = [
  {
    id: '1',
    title: 'First Time Donor',
    date: '2023-02-15',
    description: 'Awarded for your first successful blood donation.',
    image: 'certificate-1.png'
  },
  {
    id: '2',
    title: '5-Time Donor',
    date: '2023-10-22',
    description: 'Awarded for completing 5 successful blood donations.',
    image: 'certificate-2.png'
  }
];

const badges = [
  {
    id: '1',
    name: 'Rookie Donor',
    description: 'Complete your first donation',
    icon: <Award />,
    earned: true,
    progress: 100
  },
  {
    id: '2',
    name: 'Regular Donor',
    description: 'Donate 3 times in a year',
    icon: <Star />,
    earned: true,
    progress: 100
  },
  {
    id: '3',
    name: 'Silver Lifesaver',
    description: 'Complete 5 donations',
    icon: <Medal />,
    earned: false,
    progress: 40
  },
  {
    id: '4',
    name: 'Gold Lifesaver',
    description: 'Complete 10 donations',
    icon: <Shield />,
    earned: false,
    progress: 20
  }
];

const coupons = [
  {
    id: '1',
    name: '15% Off Health Checkup',
    provider: 'City Hospital',
    validUntil: '2023-12-31',
    code: 'DONOR15',
    redeemed: false
  },
  {
    id: '2',
    name: '20% Off Pharmacy Products',
    provider: 'MedLife Pharmacy',
    validUntil: '2023-11-30',
    code: 'BLOODDONOR20',
    redeemed: true
  },
  {
    id: '3',
    name: 'Free Coffee',
    provider: 'StarBeans Cafe',
    validUntil: '2023-10-15',
    code: 'DONATECOFFEE',
    redeemed: false
  }
];

const RewardsPage = () => {
  const [activeTab, setActiveTab] = useState('certificates');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Donor Rewards</h1>
      
      {/* Rewards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">{certificates.length}</h2>
            <p className="text-gray-600">Certificates Earned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold">{badges.filter(b => b.earned).length}/{badges.length}</h2>
            <p className="text-gray-600">Badges Unlocked</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">{coupons.filter(c => !c.redeemed).length}</h2>
            <p className="text-gray-600">Available Coupons</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different reward types */}
      <Card>
        <CardHeader>
          <CardTitle>Your Rewards</CardTitle>
          <CardDescription>
            View all certificates, badges, and coupons you've earned for donating blood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="certificates" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="coupons">Coupons</TabsTrigger>
            </TabsList>
            
            <TabsContent value="certificates">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map(cert => (
                  <Card key={cert.id}>
                    <CardContent className="pt-6">
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 mb-4 flex items-center justify-center h-40">
                        <div className="text-center">
                          <Award className="mx-auto h-12 w-12 text-blood-red mb-2" />
                          <h3 className="text-lg font-semibold">{cert.title}</h3>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Issued: {new Date(cert.date).toLocaleDateString()}</p>
                        <p className="text-sm mb-4">{cert.description}</p>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" /> Download Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {certificates.length === 0 && (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">You haven't earned any certificates yet.</p>
                    <p className="mt-2 text-sm text-gray-400">Start donating blood to earn certificates!</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map(badge => (
                  <Card key={badge.id} className={badge.earned ? 'border-green-200' : ''}>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${badge.earned ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {React.cloneElement(badge.icon, { className: `h-8 w-8 ${badge.earned ? 'text-green-600' : 'text-gray-400'}` })}
                      </div>
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                      
                      {badge.earned ? (
                        <span className="mt-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Unlocked
                        </span>
                      ) : (
                        <div className="w-full mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="coupons">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coupons.map(coupon => (
                  <Card key={coupon.id} className={coupon.redeemed ? 'bg-gray-50' : ''}>
                    <CardContent className={`pt-6 ${coupon.redeemed ? 'opacity-60' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{coupon.name}</h3>
                          <p className="text-sm text-gray-600">{coupon.provider}</p>
                        </div>
                        <Gift className="h-6 w-6 text-blood-red" />
                      </div>
                      
                      <div className="mt-4 p-2 bg-gray-100 rounded text-center">
                        <span className="font-mono font-bold">{coupon.code}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-xs text-gray-600">
                          Valid until: {new Date(coupon.validUntil).toLocaleDateString()}
                        </p>
                        {coupon.redeemed ? (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Used
                          </span>
                        ) : (
                          <Button variant="outline" size="sm">Redeem</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {coupons.length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">You haven't earned any coupons yet.</p>
                    <p className="mt-2 text-sm text-gray-400">Donate blood to receive exclusive offers!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Upcoming rewards section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Upcoming Rewards</h2>
        <div className="bg-gradient-to-r from-blood-red to-red-700 rounded-lg p-6 text-white">
          <div className="md:flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Gold Donor Badge</h3>
              <p className="mt-1">Complete 10 donations to earn the prestigious Gold Donor badge along with exclusive benefits:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Priority blood requests fulfillment</li>
                <li>50% discount on select hospital services</li>
                <li>Recognition in our annual donor ceremony</li>
              </ul>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 flex items-center">
                <Shield className="h-10 w-10 mr-4" />
                <div>
                  <p className="font-semibold">Your progress</p>
                  <p className="text-sm">2 of 10 donations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;

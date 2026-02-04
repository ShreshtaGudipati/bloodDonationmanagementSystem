
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Phone, User, Bot, HelpCircle, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock chat data
const initialMessages = [
  {
    id: '1',
    sender: 'bot',
    message: 'Hello! Welcome to Lifeline Blood Donation Support. How can I help you today?',
    timestamp: new Date(Date.now() - 120000),
  },
];

const supportAgents = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Medical Support',
    avatar: '/placeholder.svg',
    status: 'online'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Medical Advisor',
    avatar: '/placeholder.svg',
    status: 'offline'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    role: 'Donor Support',
    avatar: '/placeholder.svg',
    status: 'online'
  }
];

const faqs = [
  {
    question: 'How often can I donate blood?',
    answer: 'Most people can donate whole blood every 56 days (8 weeks). If you donate double red cells, you can donate every 112 days (16 weeks).'
  },
  {
    question: 'What are the eligibility requirements for donating blood?',
    answer: 'Generally, you must be at least 17 years old, weigh at least 110 pounds, and be in good health. There are specific eligibility criteria based on medical conditions, medications, travel history, and other factors.'
  },
  {
    question: 'How long does a blood donation take?',
    answer: 'The entire process takes about one hour, which includes registration, medical history review, mini-physical, the actual donation (which takes about 8-10 minutes), and refreshments afterward.'
  },
  {
    question: 'What should I do before donating blood?',
    answer: 'Eat a healthy meal, drink plenty of fluids, get a good night\'s sleep, and bring a photo ID. Avoid fatty foods before donating.'
  }
];

const ChatSupportPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      let botReply = 'I understand you need help with that. Let me connect you to one of our support agents who can assist you better.';
      
      // Simple keyword matching for automated responses
      if (newMessage.toLowerCase().includes('donate') || newMessage.toLowerCase().includes('donation')) {
        botReply = 'Great question about donation! For most people, blood donation is safe and takes about 10-15 minutes. Would you like more specific information about the donation process?';
      } else if (newMessage.toLowerCase().includes('eligibility')) {
        botReply = 'To donate blood, you generally need to be at least 17 years old, weigh at least 110 pounds, and be in good health. Specific medical conditions may affect eligibility. Would you like to check your eligibility with our questionnaire?';
      } else if (newMessage.toLowerCase().includes('blood type') || newMessage.toLowerCase().includes('blood group')) {
        botReply = 'All blood types are needed! The most requested blood type is Type O, which can be given to patients of all blood types. Would you like to know more about compatible blood types?';
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: botReply,
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Chat Support</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1">
          {/* Help Options */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Help Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Helpline
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Operating Hours
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Support Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportAgents.map(agent => (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-xs text-gray-600">{agent.role}</p>
                      </div>
                    </div>
                    <span className={`inline-block h-2 w-2 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Chat interface */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Live Chat</TabsTrigger>
                  <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-grow flex flex-col p-0">
              <Tabs defaultValue="chat" className="flex-grow flex flex-col">
                <TabsContent value="chat" className="flex-grow flex flex-col p-0 m-0 data-[state=active]:flex-grow">
                  <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
                    {messages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'bot' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                            msg.sender === 'user' 
                              ? 'bg-blood-red text-white rounded-br-none' 
                              : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-gray-200' : 'text-gray-500'}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-8 w-8 ml-2 mt-1">
                            <AvatarImage src="/placeholder.svg" alt={user?.name} />
                            <AvatarFallback>{user?.name?.charAt(0) || <User className="h-4 w-4" />}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex mb-4 justify-start">
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none inline-flex items-center">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <form 
                    onSubmit={handleSendMessage} 
                    className="border-t p-4 flex items-center"
                  >
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit" size="icon" className="ml-2">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="faq" className="p-6 m-0 overflow-y-auto" style={{ maxHeight: '500px' }}>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Emergency contact */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-yellow-800">Emergency Blood Request?</h2>
          <p className="text-yellow-700">Call our 24/7 emergency helpline for immediate assistance.</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          <Phone className="mr-2 h-4 w-4" /> 1-800-BLOOD-HELP
        </Button>
      </div>
    </div>
  );
};

export default ChatSupportPage;

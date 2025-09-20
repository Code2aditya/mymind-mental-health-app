"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Phone, Video, MoreHorizontal, Search, Star, Clock, Check, CheckCheck } from "lucide-react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "file";
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "student" | "doctor";
  online: boolean;
  lastSeen?: Date;
  unreadCount: number;
  isFavorite: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: string;
}

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock users data
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        role: "doctor",
        online: true,
        unreadCount: 2,
        isFavorite: true,
        avatar: "/avatars/doctor1.jpg"
      },
      {
        id: "2",
        name: "Dr. Michael Chen",
        role: "doctor",
        online: false,
        lastSeen: new Date(Date.now() - 3600000),
        unreadCount: 0,
        isFavorite: false,
        avatar: "/avatars/doctor2.jpg"
      },
      {
        id: "3",
        name: "Emma Wilson",
        role: "student",
        online: true,
        unreadCount: 1,
        isFavorite: true,
        avatar: "/avatars/student1.jpg"
      },
      {
        id: "4",
        name: "James Brown",
        role: "student",
        online: false,
        lastSeen: new Date(Date.now() - 7200000),
        unreadCount: 0,
        isFavorite: false,
        avatar: "/avatars/student2.jpg"
      },
      {
        id: "5",
        name: "Dr. Lisa Wang",
        role: "doctor",
        online: true,
        unreadCount: 0,
        isFavorite: true,
        avatar: "/avatars/doctor3.jpg"
      }
    ];
    setUsers(mockUsers);

    // Mock achievements data
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "First Steps",
        description: "Complete your first mood entry",
        icon: "🎯",
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        category: "Getting Started"
      },
      {
        id: "2",
        title: "Week Warrior",
        description: "Track your mood for 7 consecutive days",
        icon: "🔥",
        unlocked: true,
        progress: 7,
        maxProgress: 7,
        category: "Consistency"
      },
      {
        id: "3",
        title: "Meditation Master",
        description: "Complete 10 meditation sessions",
        icon: "🧘‍♀️",
        unlocked: false,
        progress: 6,
        maxProgress: 10,
        category: "Mindfulness"
      },
      {
        id: "4",
        title: "Knowledge Seeker",
        description: "Read 5 mental health articles",
        icon: "📚",
        unlocked: false,
        progress: 3,
        maxProgress: 5,
        category: "Learning"
      },
      {
        id: "5",
        title: "Social Butterfly",
        description: "Connect with 3 mental health professionals",
        icon: "🦋",
        unlocked: true,
        progress: 3,
        maxProgress: 3,
        category: "Social"
      },
      {
        id: "6",
        title: "Stress Buster",
        description: "Complete 15 stress management exercises",
        icon: "💪",
        unlocked: false,
        progress: 8,
        maxProgress: 15,
        category: "Stress Management"
      }
    ];
    setAchievements(mockAchievements);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Mock messages for selected user
      const mockMessages: Message[] = [
        {
          id: "1",
          content: "Hello! How are you feeling today?",
          senderId: selectedUser.id,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 3600000),
          read: true,
          type: "text"
        },
        {
          id: "2",
          content: "I'm feeling a bit anxious about my upcoming exams.",
          senderId: "current-user",
          receiverId: selectedUser.id,
          timestamp: new Date(Date.now() - 3000000),
          read: true,
          type: "text"
        },
        {
          id: "3",
          content: "That's completely normal. Let's talk about some strategies that might help. Have you tried the breathing exercises we discussed?",
          senderId: selectedUser.id,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 2400000),
          read: true,
          type: "text"
        },
        {
          id: "4",
          content: "Yes, I've been doing them daily. They really help!",
          senderId: "current-user",
          receiverId: selectedUser.id,
          timestamp: new Date(Date.now() - 1800000),
          read: true,
          type: "text"
        },
        {
          id: "5",
          content: "That's wonderful to hear! Keep up the great work. Remember, I'm here if you need to talk more about it.",
          senderId: selectedUser.id,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 600000),
          read: false,
          type: "text"
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        senderId: "current-user",
        receiverId: selectedUser.id,
        timestamp: new Date(),
        read: false,
        type: "text"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "favorites" && user.isFavorite) ||
                      (activeTab === "doctors" && user.role === "doctor") ||
                      (activeTab === "students" && user.role === "student");
    return matchesSearch && matchesTab;
  });

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const achievementProgress = (unlockedAchievements / totalAchievements) * 100;

  const getRoleColor = (role: string) => {
    return role === "doctor" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-7xl h-[calc(100vh-2rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-6">
          {/* Left Sidebar - Users List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 rounded-none">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="favorites" className="text-xs">Favorites</TabsTrigger>
                    <TabsTrigger value="doctors" className="text-xs">Doctors</TabsTrigger>
                    <TabsTrigger value="students" className="text-xs">Students</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card className="flex-1">
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-1 p-2">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          selectedUser?.id === user.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                        }`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {user.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{user.name}</h3>
                            {user.isFavorite && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                              {user.role}
                            </Badge>
                            {user.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">
                                {user.unreadCount}
                              </Badge>
                            )}
                          </div>
                          {!user.online && user.lastSeen && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last seen {formatDate(user.lastSeen)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-4">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                            <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {selectedUser.online && (
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedUser.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedUser.online ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Messages Area */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <ScrollArea className="h-[calc(100vh-20rem)]">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.senderId === "current-user"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs opacity-70">
                                  {formatTime(message.timestamp)}
                                </span>
                                {message.senderId === "current-user" && (
                                  <span className="text-xs opacity-70 ml-2">
                                    {message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Message Input */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent>
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a contact from the list to start chatting
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Achievements */}
          <div className="lg:col-span-1 space-y-4">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Progress & Achievements
                </CardTitle>
                <CardDescription>
                  Your mental health journey progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {unlockedAchievements}/{totalAchievements}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Achievements Unlocked</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${achievementProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1,250</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border ${
                          achievement.unlocked
                            ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                            : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {achievement.category}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full ${
                                      achievement.unlocked ? "bg-green-500" : "bg-blue-500"
                                    }`}
                                    style={{
                                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
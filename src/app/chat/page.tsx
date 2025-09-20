"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Search, 
  Star, 
  Clock, 
  Check, 
  CheckCheck,
  Paperclip,
  Smile,
  Image,
  FileText,
  Users,
  UserPlus,
  Settings,
  Lock,
  Pin,
  Trash2,
  Reply,
  ThumbsUp,
  Heart,
  Laugh,
  Frown,
  AlertCircle,
  Typing,
  Volume2,
  VolumeX
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName?: string;
  receiverId: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "file" | "voice";
  reactions?: Reaction[];
  isPinned?: boolean;
  isEdited?: boolean;
  replyTo?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  voiceDuration?: number;
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "student" | "doctor" | "group";
  online: boolean;
  lastSeen?: Date;
  unreadCount: number;
  isFavorite: boolean;
  isMuted?: boolean;
  memberCount?: number;
  description?: string;
  isAdmin?: boolean;
  typing?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  memberCount: number;
  members: User[];
  admins: string[];
  isPrivate: boolean;
  created: Date;
  unreadCount: number;
  isFavorite: boolean;
  lastMessage?: Message;
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

interface TypingIndicator {
  userId: string;
  userName: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
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
        avatar: "/avatars/doctor1.jpg",
        isAdmin: false
      },
      {
        id: "2",
        name: "Dr. Michael Chen",
        role: "doctor",
        online: false,
        lastSeen: new Date(Date.now() - 3600000),
        unreadCount: 0,
        isFavorite: false,
        avatar: "/avatars/doctor2.jpg",
        isAdmin: false
      },
      {
        id: "3",
        name: "Emma Wilson",
        role: "student",
        online: true,
        unreadCount: 1,
        isFavorite: true,
        avatar: "/avatars/student1.jpg",
        isAdmin: false
      },
      {
        id: "4",
        name: "James Brown",
        role: "student",
        online: false,
        lastSeen: new Date(Date.now() - 7200000),
        unreadCount: 0,
        isFavorite: false,
        avatar: "/avatars/student2.jpg",
        isAdmin: false
      },
      {
        id: "5",
        name: "Dr. Lisa Wang",
        role: "doctor",
        online: true,
        unreadCount: 0,
        isFavorite: true,
        avatar: "/avatars/doctor3.jpg",
        isAdmin: false
      }
    ];
    setUsers(mockUsers);

    // Mock groups data
    const mockGroups: Group[] = [
      {
        id: "6",
        name: "Anxiety Support Group",
        description: "Safe space for sharing anxiety experiences",
        memberCount: 24,
        members: mockUsers.slice(0, 4),
        admins: ["1", "5"],
        isPrivate: false,
        created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        unreadCount: 5,
        isFavorite: true,
        lastMessage: {
          id: "msg1",
          content: "Remember to practice your breathing exercises today!",
          senderId: "1",
          senderName: "Dr. Sarah Johnson",
          receiverId: "6",
          timestamp: new Date(Date.now() - 300000),
          read: false,
          type: "text"
        }
      },
      {
        id: "7",
        name: "Mindfulness Community",
        description: "Daily mindfulness and meditation practices",
        memberCount: 156,
        members: mockUsers,
        admins: ["5"],
        isPrivate: false,
        created: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        unreadCount: 0,
        isFavorite: false
      },
      {
        id: "8",
        name: "Student Wellness Network",
        description: "Support network for student mental health",
        memberCount: 89,
        members: mockUsers.slice(2, 5),
        admins: ["3"],
        isPrivate: true,
        created: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        unreadCount: 12,
        isFavorite: true
      }
    ];
    setGroups(mockGroups);

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

    // Simulate typing indicators
    const typingInterval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      if (Math.random() > 0.7) {
        setTypingIndicators([
          {
            userId: randomUser.id,
            userName: randomUser.name,
            timestamp: new Date()
          }
        ]);
        
        setTimeout(() => {
          setTypingIndicators([]);
        }, 3000);
      }
    }, 10000);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Mock messages for selected user
      const mockMessages: Message[] = [
        {
          id: "1",
          content: "Hello! How are you feeling today?",
          senderId: selectedUser.id,
          senderName: selectedUser.name,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 3600000),
          read: true,
          type: "text",
          reactions: [
            { emoji: "👍", count: 1, users: ["current-user"] }
          ]
        },
        {
          id: "2",
          content: "I'm feeling a bit anxious about my upcoming exams.",
          senderId: "current-user",
          receiverId: selectedUser.id,
          timestamp: new Date(Date.now() - 3000000),
          read: true,
          type: "text",
          reactions: [
            { emoji: "❤️", count: 1, users: [selectedUser.id] }
          ]
        },
        {
          id: "3",
          content: "That's completely normal. Let's talk about some strategies that might help. Have you tried the breathing exercises we discussed?",
          senderId: selectedUser.id,
          senderName: selectedUser.name,
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
          senderName: selectedUser.name,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 600000),
          read: false,
          type: "text",
          isPinned: true
        },
        {
          id: "6",
          content: "Here's a helpful article about managing exam anxiety",
          senderId: selectedUser.id,
          senderName: selectedUser.name,
          receiverId: "current-user",
          timestamp: new Date(Date.now() - 300000),
          read: false,
          type: "file",
          fileName: "exam_anxiety_guide.pdf",
          fileSize: 2048000
        }
      ];
      setMessages(mockMessages);
      
      // Set pinned messages
      setPinnedMessages(mockMessages.filter(msg => msg.isPinned));
    } else if (selectedGroup) {
      // Mock messages for selected group
      const mockMessages: Message[] = [
        {
          id: "1",
          content: "Welcome everyone to our support group! 🌟",
          senderId: selectedGroup.admins[0],
          senderName: "Dr. Sarah Johnson",
          receiverId: selectedGroup.id,
          timestamp: new Date(Date.now() - 7200000),
          read: true,
          type: "text",
          isPinned: true,
          reactions: [
            { emoji: "👍", count: 5, users: ["1", "2", "3", "4", "5"] },
            { emoji: "❤️", count: 3, users: ["1", "3", "5"] }
          ]
        },
        {
          id: "2",
          content: "Thank you for creating this space! I've been looking for a supportive community.",
          senderId: "3",
          senderName: "Emma Wilson",
          receiverId: selectedGroup.id,
          timestamp: new Date(Date.now() - 5400000),
          read: true,
          type: "text",
          reactions: [
            { emoji: "👍", count: 2, users: ["1", "5"] }
          ]
        },
        {
          id: "3",
          content: "Does anyone have tips for managing panic attacks during exams?",
          senderId: "4",
          senderName: "James Brown",
          receiverId: selectedGroup.id,
          timestamp: new Date(Date.now() - 3600000),
          read: true,
          type: "text",
          replyTo: "1"
        },
        {
          id: "4",
          content: "I find the 4-7-8 breathing technique really helpful. Inhale for 4, hold for 7, exhale for 8.",
          senderId: "5",
          senderName: "Dr. Lisa Wang",
          receiverId: selectedGroup.id,
          timestamp: new Date(Date.now() - 2400000),
          read: true,
          type: "text",
          replyTo: "3",
          reactions: [
            { emoji: "👍", count: 4, users: ["1", "2", "3", "4"] },
            { emoji: "💡", count: 2, users: ["1", "3"] }
          ]
        },
        {
          id: "5",
          content: "Remember to practice your breathing exercises today!",
          senderId: "1",
          senderName: "Dr. Sarah Johnson",
          receiverId: selectedGroup.id,
          timestamp: new Date(Date.now() - 300000),
          read: false,
          type: "text"
        }
      ];
      setMessages(mockMessages);
      
      // Set pinned messages
      setPinnedMessages(mockMessages.filter(msg => msg.isPinned));
    }
  }, [selectedUser, selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && (selectedUser || selectedGroup)) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        senderId: "current-user",
        senderName: "You",
        receiverId: selectedUser?.id || selectedGroup?.id || "",
        timestamp: new Date(),
        read: false,
        type: "text",
        replyTo: replyToMessage?.id
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setReplyToMessage(null);
      
      // Clear typing indicators
      setTypingIndicators([]);
    }
  };

  const handleSendFile = (fileType: 'image' | 'file') => {
    // Mock file sending
    const message: Message = {
      id: Date.now().toString(),
      content: fileType === 'image' ? '📷 Image' : '📎 File',
      senderId: "current-user",
      senderName: "You",
      receiverId: selectedUser?.id || selectedGroup?.id || "",
      timestamp: new Date(),
      read: false,
      type: fileType,
      fileName: fileType === 'image' ? 'photo.jpg' : 'document.pdf',
      fileSize: Math.floor(Math.random() * 5000000) + 100000
    };
    setMessages([...messages, message]);
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic would go here
    } else {
      // Stop recording and send voice message
      const message: Message = {
        id: Date.now().toString(),
        content: '🎤 Voice message',
        senderId: "current-user",
        senderName: "You",
        receiverId: selectedUser?.id || selectedGroup?.id || "",
        timestamp: new Date(),
        read: false,
        type: "voice",
        voiceDuration: 15 // Mock duration
      };
      setMessages([...messages, message]);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(message => {
      if (message.id === messageId) {
        const existingReaction = message.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...message,
            reactions: message.reactions?.map(r => 
              r.emoji === emoji 
                ? { ...r, count: r.count + 1, users: [...r.users, "current-user"] }
                : r
            )
          };
        } else {
          return {
            ...message,
            reactions: [
              ...(message.reactions || []),
              { emoji, count: 1, users: ["current-user"] }
            ]
          };
        }
      }
      return message;
    }));
  };

  const handlePinMessage = (messageId: string) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, isPinned: !message.isPinned }
        : message
    ));
    
    // Update pinned messages list
    const message = messages.find(m => m.id === messageId);
    if (message) {
      if (message.isPinned) {
        setPinnedMessages(pinnedMessages.filter(m => m.id !== messageId));
      } else {
        setPinnedMessages([...pinnedMessages, { ...message, isPinned: true }]);
      }
    }
  };

  const handleReply = (message: Message) => {
    setReplyToMessage(message);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedUsersForGroup.length > 0) {
      const newGroup: Group = {
        id: Date.now().toString(),
        name: newGroupName,
        description: newGroupDescription,
        memberCount: selectedUsersForGroup.length + 1,
        members: users.filter(u => selectedUsersForGroup.includes(u.id)),
        admins: ["current-user"],
        isPrivate: false,
        created: new Date(),
        unreadCount: 0,
        isFavorite: false
      };
      setGroups([...groups, newGroup]);
      setIsCreatingGroup(false);
      setNewGroupName("");
      setNewGroupDescription("");
      setSelectedUsersForGroup([]);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  const toggleNotification = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAllConversations = () => {
    const userConversations = users.map(user => ({
      ...user,
      type: 'user' as const
    }));
    
    const groupConversations = groups.map(group => ({
      ...group,
      type: 'group' as const
    }));
    
    return [...userConversations, ...groupConversations];
  };

  const filteredConversations = getAllConversations().filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "favorites" && conv.isFavorite) ||
                      (activeTab === "doctors" && conv.role === "doctor") ||
                      (activeTab === "students" && conv.role === "student") ||
                      (activeTab === "groups" && conv.type === "group");
    return matchesSearch && matchesTab;
  });

  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const achievementProgress = (unlockedAchievements / totalAchievements) * 100;

  const getRoleColor = (role: string, type?: string) => {
  if (type === 'group') return "bg-purple-100 text-purple-800";
  return role === "doctor" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
};

const getMessageTypeIcon = (type: string) => {
  switch (type) {
    case "image": return <Image className="h-4 w-4" />;
    case "file": return <FileText className="h-4 w-4" />;
    case "voice": return <Volume2 className="h-4 w-4" />;
    default: return null;
  }
};

const getReplyToMessage = (replyToId: string) => {
  return messages.find(msg => msg.id === replyToId);
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
                  <TabsList className="grid w-full grid-cols-5 rounded-none">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="favorites" className="text-xs">Favorites</TabsTrigger>
                    <TabsTrigger value="doctors" className="text-xs">Doctors</TabsTrigger>
                    <TabsTrigger value="students" className="text-xs">Students</TabsTrigger>
                    <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card className="flex-1">
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-1 p-2">
                    {filteredConversations.map((conv) => {
                      const isUser = 'type' in conv && conv.type === 'user';
                      const isGroup = 'type' in conv && conv.type === 'group';
                      
                      return (
                        <div
                          key={conv.id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                            (isUser && selectedUser?.id === conv.id) || (isGroup && selectedGroup?.id === conv.id) 
                              ? "bg-blue-50 dark:bg-blue-900/20" : ""
                          }`}
                          onClick={() => isUser ? handleUserSelect(conv as User) : handleGroupSelect(conv as Group)}
                        >
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={conv.avatar} alt={conv.name} />
                              <AvatarFallback>
                                {isGroup ? <Users className="h-6 w-6" /> : conv.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {conv.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">{conv.name}</h3>
                              {conv.isFavorite && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getRoleColor(conv.role, isGroup ? 'group' : undefined)}`}>
                                {isGroup ? 'Group' : conv.role}
                              </Badge>
                              {conv.unreadCount > 0 && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                            {isGroup && 'memberCount' in conv && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {conv.memberCount} members
                              </p>
                            )}
                            {!conv.online && 'lastSeen' in conv && conv.lastSeen && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Last seen {formatDate(conv.lastSeen)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-4">
            {(selectedUser || selectedGroup) ? (
              <>
                {/* Chat Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedUser?.avatar || selectedGroup?.avatar} alt={selectedUser?.name || selectedGroup?.name} />
                            <AvatarFallback>
                              {selectedGroup ? <Users className="h-5 w-5" /> : selectedUser?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {selectedUser?.online && (
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedUser?.name || selectedGroup?.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedUser ? (selectedUser.online ? "Online" : "Offline") : `${selectedGroup?.memberCount} members`}
                          </p>
                          {selectedGroup && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {selectedGroup.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={toggleNotification}>
                              {notificationsEnabled ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                              {notificationsEnabled ? "Mute notifications" : "Unmute notifications"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={toggleSound}>
                              {soundEnabled ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                              {soundEnabled ? "Disable sound" : "Enable sound"}
                            </DropdownMenuItem>
                            {selectedGroup && (
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                Manage members
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Pinned Messages */}
                {pinnedMessages.length > 0 && (
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Pin className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pinned Messages</span>
                      </div>
                      <div className="space-y-2">
                        {pinnedMessages.map((pinned) => (
                          <div key={pinned.id} className="p-2 bg-white dark:bg-gray-800 rounded text-sm">
                            <p className="text-gray-600 dark:text-gray-400">{pinned.content}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Messages Area */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <ScrollArea className="h-[calc(100vh-20rem)]">
                      <div className="space-y-4">
                        {/* Typing Indicators */}
                        {typingIndicators.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Typing className="h-4 w-4 animate-pulse" />
                            <span>{typingIndicators[0].userName} is typing...</span>
                          </div>
                        )}
                        
                        {messages.map((message) => {
                          const isCurrentUser = message.senderId === "current-user";
                          const replyToMsg = message.replyTo ? getReplyToMessage(message.replyTo) : null;
                          
                          return (
                            <div
                              key={message.id}
                              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                  isCurrentUser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                                } ${message.isPinned ? "ring-2 ring-yellow-400" : ""}`}
                              >
                                {/* Reply Preview */}
                                {replyToMsg && (
                                  <div className={`mb-2 p-2 rounded text-xs ${
                                    isCurrentUser 
                                      ? "bg-blue-600 text-blue-100" 
                                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                  }`}>
                                    <div className="flex items-center gap-1">
                                      <Reply className="h-3 w-3" />
                                      <span className="font-medium">{replyToMsg.senderName}</span>
                                    </div>
                                    <p className="truncate">{replyToMsg.content}</p>
                                  </div>
                                )}
                                
                                {/* Message Content */}
                                <div className="flex items-start gap-2">
                                  {selectedGroup && !isCurrentUser && (
                                    <span className="text-xs font-medium opacity-75">
                                      {message.senderName}
                                    </span>
                                  )}
                                  <div className="flex-1">
                                    {message.type === "text" && (
                                      <p className="text-sm">{message.content}</p>
                                    )}
                                    {message.type === "file" && (
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <div>
                                          <p className="text-sm font-medium">{message.fileName}</p>
                                          <p className="text-xs opacity-75">{formatFileSize(message.fileSize || 0)}</p>
                                        </div>
                                      </div>
                                    )}
                                    {message.type === "image" && (
                                      <div className="flex items-center gap-2">
                                        <Image className="h-4 w-4" />
                                        <span className="text-sm">Image</span>
                                      </div>
                                    )}
                                    {message.type === "voice" && (
                                      <div className="flex items-center gap-2">
                                        <Volume2 className="h-4 w-4" />
                                        <span className="text-sm">Voice message ({message.voiceDuration}s)</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Message Footer */}
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs opacity-70">
                                    {formatTime(message.timestamp)}
                                    {message.isEdited && " (edited)"}
                                  </span>
                                  {isCurrentUser && (
                                    <span className="text-xs opacity-70 ml-2">
                                      {message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                    </span>
                                  )}
                                </div>
                                
                                {/* Reactions */}
                                {message.reactions && message.reactions.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {message.reactions.map((reaction, index) => (
                                      <button
                                        key={index}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                          isCurrentUser 
                                            ? "bg-blue-600 text-white" 
                                            : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                        onClick={() => handleReaction(message.id, reaction.emoji)}
                                      >
                                        <span>{reaction.emoji}</span>
                                        <span>{reaction.count}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Message Actions */}
                                <div className="flex items-center gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => handleReply(message)}
                                  >
                                    <Reply className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => handlePinMessage(message.id)}
                                  >
                                    <Pin className="h-3 w-3" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <Smile className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem onClick={() => handleReaction(message.id, "👍")}>
                                        👍 Thumbs up
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleReaction(message.id, "❤️")}>
                                        ❤️ Heart
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleReaction(message.id, "😊")}>
                                        😊 Smile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleReaction(message.id, "😢")}>
                                        😢 Sad
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Message Input */}
                <Card>
                  <CardContent className="p-4">
                    {/* Reply Preview */}
                    {replyToMessage && (
                      <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Reply className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                              Replying to {replyToMessage.senderName}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setReplyToMessage(null)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {replyToMessage.content}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {/* Attachment Buttons */}
                      <div className="flex gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleSendFile('image')}>
                              <Image className="h-4 w-4 mr-2" />
                              Send Image
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendFile('file')}>
                              <FileText className="h-4 w-4 mr-2" />
                              Send File
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleVoiceMessage}
                          className={isRecording ? "bg-red-100 text-red-600" : ""}
                        >
                          {isRecording ? <AlertCircle className="h-4 w-4 animate-pulse" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Create New Group</DialogTitle>
                              <DialogDescription>
                                Create a group chat with multiple users for better support and collaboration.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Group Name</label>
                                <Input
                                  value={newGroupName}
                                  onChange={(e) => setNewGroupName(e.target.value)}
                                  placeholder="Enter group name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                  value={newGroupDescription}
                                  onChange={(e) => setNewGroupDescription(e.target.value)}
                                  placeholder="Enter group description"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Select Members</label>
                                <div className="space-y-2 mt-2">
                                  {users.map((user) => (
                                    <div key={user.id} className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={selectedUsersForGroup.includes(user.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedUsersForGroup([...selectedUsersForGroup, user.id]);
                                          } else {
                                            setSelectedUsersForGroup(selectedUsersForGroup.filter(id => id !== user.id));
                                          }
                                        }}
                                      />
                                      <span className="text-sm">{user.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Button onClick={handleCreateGroup} className="w-full">
                                Create Group
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {/* Message Input */}
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      
                      {/* Send Button */}
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 animate-pulse" />
                        <span>Recording voice message... Click again to stop</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent>
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Welcome to Secure Messaging</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Choose a conversation to start chatting or create a new group
                    </p>
                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Create New Group
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Group</DialogTitle>
                            <DialogDescription>
                              Create a group chat with multiple users for better support and collaboration.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Group Name</label>
                              <Input
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Enter group name"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <Input
                                value={newGroupDescription}
                                onChange={(e) => setNewGroupDescription(e.target.value)}
                                placeholder="Enter group description"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Select Members</label>
                              <div className="space-y-2 mt-2">
                                {users.map((user) => (
                                  <div key={user.id} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={selectedUsersForGroup.includes(user.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedUsersForGroup([...selectedUsersForGroup, user.id]);
                                        } else {
                                          setSelectedUsersForGroup(selectedUsersForGroup.filter(id => id !== user.id));
                                        }
                                      }}
                                    />
                                    <span className="text-sm">{user.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Button onClick={handleCreateGroup} className="w-full">
                              Create Group
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
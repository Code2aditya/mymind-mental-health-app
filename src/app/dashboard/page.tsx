"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatsCardSkeleton, CardSkeleton, LoadingState, InlineLoader } from "@/components/ui/loading-state";
import { Heart, Brain, Calendar, BookOpen, MessageCircle, TrendingUp, Users, Clock, Activity, Target, Award, Star, Zap, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [userType] = useState("student"); // This would come from authentication context
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDashboardData({
        mood: "Good",
        moodEmoji: "😊",
        upcomingSessions: 2,
        resourcesRead: 12,
        achievements: { earned: 8, total: 15 },
        streak: 7,
        weeklyGoal: 85,
        wellnessPoints: 1200,
        recentActivity: [
          { type: "mood", title: "Completed mood tracking", time: "2 hours ago", icon: CheckCircle },
          { type: "achievement", title: "Earned 'Week Warrior' badge", time: "Yesterday", icon: Award },
          { type: "resource", title: "Read 'Understanding Anxiety' article", time: "2 days ago", icon: BookOpen }
        ]
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="h-8 w-64 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse mb-2" />
            <div className="h-4 w-96 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </div>

          {/* Progress Overview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="h-6 w-48 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-64 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto mb-3" />
                    <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto mb-1" />
                    <div className="h-3 w-20 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-4">
            <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userType === "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back, Student! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Here's your mental health overview for today
                </p>
              </div>
              <Badge variant="outline" className="px-4 py-2">
                <Activity className="mr-2 h-4 w-4" />
                Day {dashboardData.streak} Streak 🔥
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.mood}</div>
                  <div className="text-3xl">{dashboardData.moodEmoji}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Last tracked 2 hours ago
                </p>
                <div className="mt-2">
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.upcomingSessions}</div>
                  <div className="text-2xl">📅</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Next session tomorrow
                </p>
                <div className="mt-2">
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources Read</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.resourcesRead}</div>
                  <div className="text-2xl">📚</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +2 from last week
                </p>
                <div className="mt-2">
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-yellow-600">{dashboardData.achievements.earned}/{dashboardData.achievements.total}</div>
                  <div className="text-2xl">🏆</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Badges earned
                </p>
                <div className="mt-2">
                  <Progress value={(dashboardData.achievements.earned / dashboardData.achievements.total) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Your Progress Overview
              </CardTitle>
              <CardDescription>
                Track your mental health journey and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-blue-600">{dashboardData.streak}</span>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      🔥
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Day Streak</h3>
                  <p className="text-sm text-muted-foreground">Keep tracking daily!</p>
                  <div className="mt-2">
                    <Progress value={70} className="h-1 w-16 mx-auto" />
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-green-600">{dashboardData.weeklyGoal}%</span>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      ✓
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Goal</h3>
                  <p className="text-sm text-muted-foreground">Almost there!</p>
                  <div className="mt-2">
                    <Progress value={dashboardData.weeklyGoal} className="h-1 w-16 mx-auto" />
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-purple-600">{dashboardData.wellnessPoints > 1000 ? `${(dashboardData.wellnessPoints / 1000).toFixed(1)}k` : dashboardData.wellnessPoints}</span>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                      ⭐
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Wellness Points</h3>
                  <p className="text-sm text-muted-foreground">Keep earning!</p>
                  <div className="mt-2">
                    <Progress value={60} className="h-1 w-16 mx-auto" />
                  </div>
                </div>
              </div>
              
              {/* Activity Timeline */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {dashboardData.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <activity.icon className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Mood
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Recent Mood Entries
                    </CardTitle>
                    <CardDescription>
                      Your mood tracking history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                          <div>
                            <span className="text-sm font-medium">Today - Good</span>
                            <p className="text-xs text-muted-foreground">Feeling productive and positive</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg group-hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <div>
                            <span className="text-sm font-medium">Yesterday - Neutral</span>
                            <p className="text-xs text-muted-foreground">Regular day, nothing special</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">1d ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <div>
                            <span className="text-sm font-medium">2 days ago - Good</span>
                            <p className="text-xs text-muted-foreground">Great session with friends</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">2d ago</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = "/mood"}>
                      View All Mood History
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      Upcoming Appointments
                    </CardTitle>
                    <CardDescription>
                      Your scheduled sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">Dr. Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Anxiety Management</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Tomorrow
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">2:00 PM - 3:00 PM</span>
                          <Button size="sm" variant="ghost">Join</Button>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">Dr. Michael Chen</p>
                            <p className="text-sm text-muted-foreground">General Counseling</p>
                          </div>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                            Friday
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">4:00 PM - 5:00 PM</span>
                          <Button size="sm" variant="ghost">Join</Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Schedule New Appointment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mood">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Mood Tracking
                  </CardTitle>
                  <CardDescription>
                    Track your daily mood and emotional well-being
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="text-6xl mb-4 animate-bounce">😊</div>
                      <h3 className="text-lg font-semibold mb-2">How are you feeling today?</h3>
                      <p className="text-muted-foreground">
                        Take a moment to reflect on your current emotional state
                      </p>
                    </div>
                    <div className="flex justify-center gap-3 mb-6 flex-wrap">
                      {["Very Low", "Low", "Neutral", "Good", "Very Good"].map((mood, index) => (
                        <Button 
                          key={mood} 
                          variant="outline" 
                          size="sm"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          {["😢", "😔", "😐", "😊", "😄"][index]} {mood}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <Button onClick={() => window.location.href = "/mood"} className="w-full">
                        View Detailed Mood Tracking
                      </Button>
                      <Button variant="outline" className="w-full">
                        Quick Mood Check-in
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Appointments
                  </CardTitle>
                  <CardDescription>
                    Schedule and manage your therapy sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-10 w-10 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Book a Session</h3>
                      <p className="text-muted-foreground">
                        Connect with mental health professionals
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl mb-2">👥</div>
                        <p className="text-sm font-medium">500+ Doctors</p>
                        <p className="text-xs text-muted-foreground">Available now</p>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl mb-2">⏰</div>
                        <p className="text-sm font-medium">24/7</p>
                        <p className="text-xs text-muted-foreground">Availability</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl mb-2">💬</div>
                        <p className="text-sm font-medium">Secure</p>
                        <p className="text-xs text-muted-foreground">Private sessions</p>
                      </div>
                    </div>
                    <Button className="w-full">Find Available Doctors</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-500" />
                    Learning Resources
                  </CardTitle>
                  <CardDescription>
                    Educational content to support your mental health journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-2">
                          <Brain className="h-6 w-6 text-blue-500" />
                        </div>
                        <CardTitle className="text-sm">Understanding Anxiety</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Learn about anxiety disorders and coping strategies
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">Article</Badge>
                          <span className="text-xs text-muted-foreground">5 min read</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-2">
                          <Heart className="h-6 w-6 text-green-500" />
                        </div>
                        <CardTitle className="text-sm">Mindfulness Basics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Introduction to mindfulness meditation
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">Video</Badge>
                          <span className="text-xs text-muted-foreground">15 min</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-2">
                          <Zap className="h-6 w-6 text-purple-500" />
                        </div>
                        <CardTitle className="text-sm">Stress Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">
                          Practical techniques for managing stress
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">Exercise</Badge>
                          <span className="text-xs text-muted-foreground">10 min</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={() => window.location.href = "/meditation"} className="w-full">
                      Try Meditation Exercises
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = "/resources"}
                    >
                      Browse All Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-500" />
                    Messages
                  </CardTitle>
                  <CardDescription>
                    Communicate with your healthcare providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-10 w-10 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Connect with Professionals</h3>
                      <p className="text-muted-foreground">
                        Your conversations with doctors and counselors will appear here
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl mb-2">🔒</div>
                        <p className="text-sm font-medium">Encrypted</p>
                        <p className="text-xs text-muted-foreground">Private chats</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-sm font-medium">Real-time</p>
                        <p className="text-xs text-muted-foreground">Instant messaging</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl mb-2">📱</div>
                        <p className="text-sm font-medium">Mobile</p>
                        <p className="text-xs text-muted-foreground">Access anywhere</p>
                      </div>
                    </div>
                    <Button onClick={() => window.location.href = "/chat"} className="w-full">
                      Open Chat Center
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Doctor Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Dr. Smith! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your practice overview for today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 more than yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Need confirmation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,500</div>
              <p className="text-xs text-muted-foreground">
                +20% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Availability</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Available</div>
              <p className="text-xs text-muted-foreground">
                Status updated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>
                    Your appointments for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Emma Wilson</p>
                        <p className="text-sm text-muted-foreground">Anxiety Management</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">9:00 AM</p>
                        <p className="text-xs text-muted-foreground">45 min</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">James Brown</p>
                        <p className="text-sm text-muted-foreground">Depression Therapy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">10:00 AM</p>
                        <p className="text-xs text-muted-foreground">45 min</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sophia Garcia</p>
                        <p className="text-sm text-muted-foreground">General Counseling</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">11:00 AM</p>
                        <p className="text-xs text-muted-foreground">45 min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Patient Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Emma Wilson</p>
                        <p className="text-sm text-muted-foreground">Mood: Good</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">James Brown</p>
                        <p className="text-sm text-muted-foreground">Completed mindfulness exercise</p>
                      </div>
                      <span className="text-xs text-muted-foreground">5h ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sophia Garcia</p>
                        <p className="text-sm text-muted-foreground">Mood: Very Good</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  View and manage your patient list
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2">Patient Directory</h3>
                  <p className="text-muted-foreground mb-4">
                    Access your patient records and treatment history
                  </p>
                  <Button>View All Patients</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  Manage your consultation schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">Schedule Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    View, confirm, and manage upcoming appointments
                  </p>
                  <Button>Manage Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Set your availability and working hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-2">Availability Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Configure your weekly availability and consultation slots
                  </p>
                  <Button>Update Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Patient Messages</CardTitle>
                <CardDescription>
                  Communicate securely with your patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-indigo-500" />
                  <h3 className="text-lg font-semibold mb-2">Message Center</h3>
                  <p className="text-muted-foreground mb-4">
                    Read and respond to patient messages
                  </p>
                  <Button>View Messages</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
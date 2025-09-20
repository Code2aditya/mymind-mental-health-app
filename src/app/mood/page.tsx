"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Area, AreaChart } from "recharts";
import { Heart, Brain, TrendingUp, Calendar, Plus, Frown, Meh, Smile, Laugh, Star, Sparkles, Target, Clock, Award, Zap } from "lucide-react";

const moodEmojis = {
  VERY_LOW: "😢",
  LOW: "😔",
  NEUTRAL: "😐",
  GOOD: "😊",
  VERY_GOOD: "😄"
};

const moodColors = {
  VERY_LOW: "text-red-500",
  LOW: "text-orange-500",
  NEUTRAL: "text-yellow-500",
  GOOD: "text-green-500",
  VERY_GOOD: "text-blue-500"
};

const moodLabels = {
  VERY_LOW: "Very Low",
  LOW: "Low",
  NEUTRAL: "Neutral",
  GOOD: "Good",
  VERY_GOOD: "Very Good"
};

const moodValues = {
  VERY_LOW: 1,
  LOW: 2,
  NEUTRAL: 3,
  GOOD: 4,
  VERY_GOOD: 5
};

const chartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "Average Mood",
    color: "hsl(var(--chart-2))",
  },
} as const;

interface MoodEntry {
  id: string;
  mood: keyof typeof moodEmojis;
  note: string;
  tags: string[];
  date: string;
}

interface ChartData {
  date: string;
  mood: number;
  label: string;
}

interface InsightData {
  type: string;
  title: string;
  description: string;
  action: string;
  icon: any;
  color: string;
}

export default function MoodTracking() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodEmojis | "">("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
  const [isAnimating, setIsAnimating] = useState(false);

  // Enhanced mock data for demonstration
  useEffect(() => {
    const generateMockData = (): MoodEntry[] => {
      const data: MoodEntry[] = [];
      const moods: (keyof typeof moodEmojis)[] = ["VERY_LOW", "LOW", "NEUTRAL", "GOOD", "VERY_GOOD"];
      
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Add some variation to make it more realistic
        const moodIndex = Math.floor(Math.random() * moods.length);
        const mood = moods[moodIndex];
        
        data.push({
          id: `entry-${i}`,
          mood,
          note: `Day ${i + 1} mood entry - ${moodLabels[mood].toLowerCase()}`,
          tags: ["daily", "tracking", mood.toLowerCase()],
          date: date.toISOString()
        });
      }
      
      return data.reverse();
    };

    const mockData = generateMockData();
    setMoodEntries(mockData);
  }, []);

  const handleAddMoodEntry = () => {
    if (!selectedMood) return;

    setIsAnimating(true);
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString()
    };

    setMoodEntries([newEntry, ...moodEntries]);
    setSelectedMood("");
    setNote("");
    setTags("");
    setShowAddForm(false);

    setTimeout(() => setIsAnimating(false), 1000);
  };

  const getMoodStats = () => {
    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalEntries = moodEntries.length;
    const averageMood = Object.entries(moodCounts).reduce((acc, [mood, count]) => {
      const moodValue = moodValues[mood as keyof typeof moodValues];
      return acc + (moodValue * count);
    }, 0) / totalEntries;

    return { moodCounts, totalEntries, averageMood };
  };

  const { moodCounts, totalEntries, averageMood } = getMoodStats();

  const getStreak = () => {
    if (moodEntries.length === 0) return 0;
    
    const sortedEntries = [...moodEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff === streak + 1) {
        if (streak === 0) streak = 1;
        else break;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = getStreak();

  // Generate chart data
  const getChartData = (): ChartData[] => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filteredEntries = moodEntries.filter(entry => 
      new Date(entry.date) >= cutoffDate
    );

    return filteredEntries.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodValues[entry.mood],
      label: moodEmojis[entry.mood]
    })).reverse();
  };

  // Generate mood distribution data for pie chart
  const getMoodDistributionData = () => {
    return Object.entries(moodCounts).map(([mood, count]) => ({
      name: moodLabels[mood as keyof typeof moodLabels],
      value: count,
      emoji: moodEmojis[mood as keyof typeof moodEmojis],
      color: moodColors[mood as keyof typeof moodColors].replace('text', 'bg')
    }));
  };

  // Generate weekly trends data
  const getWeeklyTrendsData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDay = today.getDay();
    
    return days.map((day, index) => {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - (currentDay - index + 7) % 7);
      
      const dayEntries = moodEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getDay() === index && 
               entryDate.toDateString() === targetDate.toDateString();
      });

      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / dayEntries.length
        : 0;

      return {
        day,
        mood: avgMood,
        entries: dayEntries.length
      };
    });
  };

  // Generate insights
  const getInsights = (): InsightData[] => {
    const insights: InsightData[] = [];
    
    // Streak insight
    if (streak >= 7) {
      insights.push({
        type: "achievement",
        title: "Amazing Streak!",
        description: `You've tracked your mood for ${streak} consecutive days. Consistency is key to mental wellness!`,
        action: "Keep it up!",
        icon: Award,
        color: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
      });
    }

    // Average mood insight
    if (averageMood >= 4) {
      insights.push({
        type: "positive",
        title: "Great Wellbeing",
        description: "Your average mood is excellent. You're maintaining a positive outlook!",
        action: "Share your positivity",
        icon: Sparkles,
        color: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
      });
    } else if (averageMood <= 2) {
      insights.push({
        type: "concern",
        title: "Need Support",
        description: "Your mood has been lower lately. Consider reaching out for support.",
        action: "Get help",
        icon: Heart,
        color: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
      });
    }

    // Pattern insight
    const recentEntries = moodEntries.slice(0, 7);
    const hasImprovement = recentEntries.length >= 2 && 
      moodValues[recentEntries[0].mood] > moodValues[recentEntries[recentEntries.length - 1].mood];
    
    if (hasImprovement) {
      insights.push({
        type: "trend",
        title: "Positive Trend",
        description: "Your mood has been improving over the past week. Great progress!",
        action: "View trends",
        icon: TrendingUp,
        color: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
      });
    }

    // Default insight
    if (insights.length === 0) {
      insights.push({
        type: "general",
        title: "Keep Tracking",
        description: "Regular mood tracking helps you understand your patterns better.",
        action: "Learn more",
        icon: Brain,
        color: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
      });
    }

    return insights;
  };

  const chartData = getChartData();
  const moodDistributionData = getMoodDistributionData();
  const weeklyTrendsData = getWeeklyTrendsData();
  const insights = getInsights();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mood Tracking 📊
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your emotional well-being and gain insights into your mental health patterns
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`transition-all duration-300 hover:shadow-lg ${isAnimating ? 'animate-pulse' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                {streak} days
                {streak >= 7 && <Zap className="h-5 w-5 text-yellow-500" />}
              </div>
              <Progress value={Math.min(streak * 10, 100)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {streak === 0 ? "Start your streak today!" : streak >= 7 ? "Amazing consistency! 🔥" : "Keep tracking daily! 🔥"}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalEntries}</div>
              <Progress value={Math.min(totalEntries * 2, 100)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {totalEntries === 0 ? "No entries yet" : totalEntries < 10 ? "Getting started!" : totalEntries < 30 ? "Building momentum!" : "Great tracking habit!"}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                {averageMood ? averageMood.toFixed(1) : "0"}/5
                {averageMood >= 4 && <Sparkles className="h-5 w-5 text-green-500" />}
              </div>
              <Progress value={(averageMood / 5) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {averageMood >= 4 ? "Excellent wellbeing!" : averageMood >= 3 ? "Good balance!" : averageMood >= 2 ? "Room for improvement" : "Consider support"}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {moodEntries.length > 0 && new Date(moodEntries[0].date).toDateString() === new Date().toDateString() 
                  ? <span className="flex items-center gap-2">
                      {moodEmojis[moodEntries[0].mood]}
                      <span className="text-sm">{moodLabels[moodEntries[0].mood]}</span>
                    </span>
                  : "Not logged"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                How are you feeling today?
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="entries">Recent Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Mood Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Quick Mood Entry
                  </CardTitle>
                  <CardDescription>
                    How are you feeling right now?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(moodEmojis).map(([key, emoji]) => (
                        <Button
                          key={key}
                          variant={selectedMood === key ? "default" : "outline"}
                          className="flex flex-col items-center gap-1 h-16"
                          onClick={() => setSelectedMood(key as keyof typeof moodEmojis)}
                        >
                          <span className="text-lg">{emoji}</span>
                          <span className="text-xs">{moodLabels[key as keyof typeof moodEmojis]}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {selectedMood && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="note">Note (optional)</Label>
                          <Textarea
                            id="note"
                            placeholder="What's on your mind?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags (comma-separated)</Label>
                          <Input
                            id="tags"
                            placeholder="e.g., stressed, work, tired"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                          />
                        </div>
                        
                        <Button onClick={handleAddMoodEntry} className="w-full">
                          Save Mood Entry
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Mood Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Mood Distribution</CardTitle>
                  <CardDescription>
                    Your mood patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(moodCounts).map(([mood, count]) => (
                      <div key={mood} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                          <span className="text-sm font-medium">{moodLabels[mood as keyof typeof moodEmojis]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${moodColors[mood as keyof typeof moodEmojis].replace('text', 'bg')}`}
                              style={{ width: `${(count / totalEntries) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="entries">
            <Card>
              <CardHeader>
                <CardTitle>Recent Mood Entries</CardTitle>
                <CardDescription>
                  Your mood tracking history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <span className={`text-2xl ${moodColors[entry.mood]}`}>
                          {moodEmojis[entry.mood]}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{moodLabels[entry.mood]}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {entry.note}
                            </p>
                          )}
                          {entry.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {entry.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Time Range Selector */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Mood Analytics</h3>
              <Select value={timeRange} onValueChange={(value: "7d" | "30d" | "90d") => setTimeRange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trend Line Chart */}
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Mood Trend
                  </CardTitle>
                  <CardDescription>
                    Your mood patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 5]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 1 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Mood Distribution Pie Chart */}
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Mood Distribution
                  </CardTitle>
                  <CardDescription>
                    How your moods are distributed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <PieChart>
                      <Pie
                        data={moodDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {moodDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <ChartLegend 
                        content={<ChartLegendContent />}
                        verticalAlign="bottom"
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Weekly Trends Bar Chart */}
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Weekly Patterns
                  </CardTitle>
                  <CardDescription>
                    Your average mood by day of the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <BarChart data={weeklyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 5]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <Bar 
                        dataKey="mood" 
                        fill="hsl(var(--chart-2))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Mood Area Chart */}
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Mood Intensity
                  </CardTitle>
                  <CardDescription>
                    Visual representation of mood intensity over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 5]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your mood patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {insights.map((insight, index) => (
                    <div 
                      key={index}
                      className={`p-6 bg-gradient-to-br ${insight.color} rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    >
                      <insight.icon className="h-8 w-8 mb-4 text-current" />
                      <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {insight.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Mood Goals & Targets
              </CardTitle>
              <CardDescription>
                Set and track your mental health goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Goals</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Daily Mood Tracking</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Track your mood every day for 30 days
                      </p>
                      <Progress value={73} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">22/30 days completed</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Improve Average Mood</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Reach an average mood score of 4.0
                      </p>
                      <Progress value={80} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Current: 3.2/5.0</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Stress Reduction</span>
                        <Badge variant="secondary">Paused</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Reduce stress-related mood entries by 50%
                      </p>
                      <Progress value={30} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">30% reduction achieved</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Create New Goal</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-type">Goal Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select goal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consistency">Daily Tracking</SelectItem>
                          <SelectItem value="improvement">Mood Improvement</SelectItem>
                          <SelectItem value="reduction">Stress Reduction</SelectItem>
                          <SelectItem value="streak">Maintain Streak</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="goal-target">Target</Label>
                      <Input id="goal-target" placeholder="e.g., 30 days, 4.0 average" />
                    </div>
                    
                    <div>
                      <Label htmlFor="goal-deadline">Deadline</Label>
                      <Input id="goal-deadline" type="date" />
                    </div>
                    
                    <Button className="w-full">Create Goal</Button>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Achievements</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-2xl">🏆</div>
                        <div className="text-xs">First Week</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl">🌟</div>
                        <div className="text-xs">Mood Master</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl">💪</div>
                        <div className="text-xs">Consistency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Mood Journal
              </CardTitle>
              <CardDescription>
                Reflect on your thoughts and feelings with guided journaling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Today's Reflection</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="journal-prompt">Daily Prompt</Label>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-2">
                        <p className="text-sm">What are three things you're grateful for today?</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="journal-entry">Your Thoughts</Label>
                      <Textarea 
                        id="journal-entry"
                        placeholder="Write your reflections here..."
                        className="min-h-32"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">Save Entry</Button>
                      <Button variant="outline">Get AI Insights</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Entries</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Today</span>
                        <Badge variant="outline">Gratitude</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        I'm grateful for my supportive friends, the beautiful weather today, and having a safe place to live...
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Yesterday</span>
                        <Badge variant="outline">Challenge</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        Today was challenging with work stress, but I managed to use my breathing exercises and felt better...
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">2 days ago</span>
                        <Badge variant="outline">Achievement</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        Completed my presentation successfully! Felt nervous but proud of myself afterward...
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Journal Prompts</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        What made you smile today?
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        Describe a challenge you overcame
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        What are you looking forward to?
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
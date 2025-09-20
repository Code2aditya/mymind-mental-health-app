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
import { Heart, Brain, TrendingUp, Calendar, Plus, Frown, Meh, Smile, Laugh, Star } from "lucide-react";

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

interface MoodEntry {
  id: string;
  mood: keyof typeof moodEmojis;
  note: string;
  tags: string[];
  date: string;
}

export default function MoodTracking() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodEmojis | "">("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockData: MoodEntry[] = [
      {
        id: "1",
        mood: "GOOD",
        note: "Had a productive day at college. Feeling positive about upcoming exams.",
        tags: ["productive", "college", "positive"],
        date: new Date().toISOString()
      },
      {
        id: "2",
        mood: "NEUTRAL",
        note: "Regular day, nothing special happened.",
        tags: ["regular"],
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "3",
        mood: "VERY_GOOD",
        note: "Great session with friends! Feeling energized and happy.",
        tags: ["friends", "social", "happy"],
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    setMoodEntries(mockData);
  }, []);

  const handleAddMoodEntry = () => {
    if (!selectedMood) return;

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
  };

  const getMoodStats = () => {
    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalEntries = moodEntries.length;
    const averageMood = Object.entries(moodCounts).reduce((acc, [mood, count]) => {
      const moodValue = Object.keys(moodEmojis).indexOf(mood) + 1;
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
        // Allow for one day gap if it's the first entry
        if (streak === 0) streak = 1;
        else break;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = getStreak();

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{streak} days</div>
              <p className="text-xs text-muted-foreground">
                Keep tracking daily! 🔥
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalEntries}</div>
              <p className="text-xs text-muted-foreground">
                Mood entries logged
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {averageMood ? averageMood.toFixed(1) : "0"}/5
              </div>
              <p className="text-xs text-muted-foreground">
                Overall wellbeing score
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {moodEntries.length > 0 && new Date(moodEntries[0].date).toDateString() === new Date().toDateString() 
                  ? moodEmojis[moodEntries[0].mood] 
                  : "Not logged"}
              </div>
              <p className="text-xs text-muted-foreground">
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

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Trends</CardTitle>
                  <CardDescription>
                    Your mood patterns over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">Mood Trends</h3>
                    <p className="text-muted-foreground mb-4">
                      Visual analytics coming soon
                    </p>
                    <div className="space-y-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm">{day}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-8 rounded ${
                                  i < 3 ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mood Insights</CardTitle>
                  <CardDescription>
                    AI-powered analysis of your mood patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Positive Trend Detected
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Your mood has been improving over the past week. Keep up the great work!
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Best Day: Friday
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        You tend to feel best on Fridays. Consider scheduling important activities on this day.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        Common Triggers
                      </h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-300">
                        Based on your entries, "work" and "stress" appear frequently. Consider stress management techniques.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Insights</CardTitle>
                <CardDescription>
                  AI-powered recommendations based on your mood patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <Brain className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Mindfulness Recommendation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Based on your recent mood patterns, we recommend trying a 10-minute breathing exercise.
                    </p>
                    <Button variant="outline" size="sm">
                      Try Exercise
                    </Button>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                    <Heart className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Social Connection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Your mood improves on social days. Consider reaching out to a friend today.
                    </p>
                    <Button variant="outline" size="sm">
                      Find Activities
                    </Button>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      You're doing great! Your consistency has improved by 40% this month.
                    </p>
                    <Button variant="outline" size="sm">
                      View Progress
                    </Button>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                    <Calendar className="h-8 w-8 text-orange-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Schedule Optimization</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Your energy peaks in the morning. Schedule important tasks before noon.
                    </p>
                    <Button variant="outline" size="sm">
                      Optimize Schedule
                    </Button>
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
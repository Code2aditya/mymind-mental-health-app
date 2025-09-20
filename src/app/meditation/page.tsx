"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock, Brain, Heart, Leaf, Sun, Moon, Waves, Wind } from "lucide-react";

interface MeditationExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: "breathing" | "mindfulness" | "body-scan" | "visualization";
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  isFavorite: boolean;
  completed: boolean;
}

export default function MeditationPage() {
  const [exercises, setExercises] = useState<MeditationExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<MeditationExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Mock meditation exercises
    const mockExercises: MeditationExercise[] = [
      {
        id: "1",
        title: "Breathing Basics",
        description: "Learn fundamental breathing techniques for relaxation and focus",
        duration: 300,
        type: "breathing",
        difficulty: "beginner",
        category: "Stress Relief",
        isFavorite: true,
        completed: true
      },
      {
        id: "2",
        title: "Mindful Moment",
        description: "A quick mindfulness exercise to center yourself during busy days",
        duration: 180,
        type: "mindfulness",
        difficulty: "beginner",
        category: "Quick Sessions",
        isFavorite: false,
        completed: false
      },
      {
        id: "3",
        title: "Body Scan Meditation",
        description: "Progressive relaxation technique for full-body awareness",
        duration: 600,
        type: "body-scan",
        difficulty: "intermediate",
        category: "Deep Relaxation",
        isFavorite: true,
        completed: false
      },
      {
        id: "4",
        title: "Ocean Visualization",
        description: "Guided imagery journey to a peaceful ocean setting",
        duration: 480,
        type: "visualization",
        difficulty: "intermediate",
        category: "Visualization",
        isFavorite: false,
        completed: true
      },
      {
        id: "5",
        title: "Advanced Breathwork",
        description: "Advanced pranayama techniques for experienced practitioners",
        duration: 900,
        type: "breathing",
        difficulty: "advanced",
        category: "Advanced Practice",
        isFavorite: false,
        completed: false
      },
      {
        id: "6",
        title: "Loving Kindness",
        description: "Cultivate compassion and positive emotions towards self and others",
        duration: 420,
        type: "mindfulness",
        difficulty: "intermediate",
        category: "Emotional Wellness",
        isFavorite: true,
        completed: false
      }
    ];
    setExercises(mockExercises);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentExercise && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const exerciseProgress = ((currentExercise.duration - newTime) / currentExercise.duration) * 100;
          setProgress(exerciseProgress);
          
          if (newTime <= 0) {
            setIsPlaying(false);
            // Mark exercise as completed
            setExercises(prev => prev.map(ex => 
              ex.id === currentExercise.id ? { ...ex, completed: true } : ex
            ));
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentExercise]);

  const startExercise = (exercise: MeditationExercise) => {
    setCurrentExercise(exercise);
    setTimeLeft(exercise.duration);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    setIsPlaying(false);
    if (currentExercise) {
      setTimeLeft(currentExercise.duration);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "breathing": return <Wind className="h-5 w-5" />;
      case "mindfulness": return <Brain className="h-5 w-5" />;
      case "body-scan": return <Leaf className="h-5 w-5" />;
      case "visualization": return <Waves className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredExercises = (type: string) => {
    return exercises.filter(exercise => exercise.type === type);
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const totalCount = exercises.length;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meditation & Mindfulness 🧘‍♀️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover inner peace and improve your mental well-being through guided meditation practices
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{completedCount}</div>
              <p className="text-xs text-muted-foreground">
                of {totalCount} exercises
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completionRate.toFixed(0)}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">7 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(exercises.reduce((acc, ex) => ex.completed ? acc + ex.duration : acc, 0) / 60)}m
              </div>
              <p className="text-xs text-muted-foreground">
                Time meditated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Exercise Player */}
        {currentExercise && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(currentExercise.type)}
                Now Playing: {currentExercise.title}
              </CardTitle>
              <CardDescription>{currentExercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      size="lg"
                      onClick={togglePlayPause}
                      className="rounded-full w-16 h-16"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={resetExercise}
                      className="rounded-full w-16 h-16"
                    >
                      <RotateCcw className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      remaining
                    </div>
                  </div>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatTime(currentExercise.duration - timeLeft)} elapsed</span>
                  <span>{formatTime(currentExercise.duration)} total</span>
                </div>
                
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                    {currentExercise.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentExercise.category}</Badge>
                  <Badge variant="secondary">{currentExercise.type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Exercises</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="body-scan">Body Scan</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(exercise.type)}
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      </div>
                      {exercise.isFavorite && <Heart className="h-5 w-5 text-red-500 fill-current" />}
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{formatTime(exercise.duration)}</span>
                        </div>
                        {exercise.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                        <Badge variant="outline">{exercise.category}</Badge>
                      </div>
                      
                      <Button 
                        onClick={() => startExercise(exercise)}
                        className="w-full"
                        disabled={currentExercise?.id === exercise.id && isPlaying}
                      >
                        {currentExercise?.id === exercise.id && isPlaying ? "Playing..." : "Start Exercise"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["breathing", "mindfulness", "body-scan", "visualization"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises(type).map((exercise) => (
                  <Card key={exercise.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(exercise.type)}
                          <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        </div>
                        {exercise.isFavorite && <Heart className="h-5 w-5 text-red-500 fill-current" />}
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{formatTime(exercise.duration)}</span>
                          </div>
                          {exercise.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Badge className={getDifficultyColor(exercise.difficulty)}>
                            {exercise.difficulty}
                          </Badge>
                          <Badge variant="outline">{exercise.category}</Badge>
                        </div>
                        
                        <Button 
                          onClick={() => startExercise(exercise)}
                          className="w-full"
                          disabled={currentExercise?.id === exercise.id && isPlaying}
                        >
                          {currentExercise?.id === exercise.id && isPlaying ? "Playing..." : "Start Exercise"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
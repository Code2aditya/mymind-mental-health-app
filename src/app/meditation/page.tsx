"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Brain, 
  Heart, 
  Leaf, 
  Sun, 
  Moon, 
  Waves, 
  Wind,
  Volume2,
  VolumeX,
  Settings,
  Star,
  Calendar,
  Trophy,
  Target,
  CheckCircle,
  Plus,
  BookOpen,
  Music,
  Users,
  Flame,
  Sparkles
} from "lucide-react";

interface MeditationExercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: "breathing" | "mindfulness" | "body-scan" | "visualization" | "yoga" | "sleep";
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  isFavorite: boolean;
  completed: boolean;
  instructor?: string;
  audioUrl?: string;
  benefits: string[];
  equipment?: string[];
  rating?: number;
  timesCompleted?: number;
}

interface BreathingPattern {
  id: string;
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfterExhale: number;
  description: string;
  benefits: string[];
}

interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
  weeklyGoal: number;
  weeklyProgress: number;
  favoriteType: string;
  achievements: Achievement[];
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

interface SessionHistory {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: Date;
  duration: number;
  type: string;
  moodBefore: number;
  moodAfter: number;
  notes?: string;
}

export default function MeditationPage() {
  const [exercises, setExercises] = useState<MeditationExercise[]>([]);
  const [breathingPatterns, setBreathingPatterns] = useState<BreathingPattern[]>([]);
  const [currentExercise, setCurrentExercise] = useState<MeditationExercise | null>(null);
  const [currentBreathingPattern, setCurrentBreathingPattern] = useState<BreathingPattern | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([]);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfterExhale'>('inhale');
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [customDuration, setCustomDuration] = useState([300]);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("exercises");
  const animationRef = useRef<number>();
  const breathingIntervalRef = useRef<NodeJS.Timeout>();

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
        completed: true,
        instructor: "Dr. Sarah Johnson",
        benefits: ["Reduces stress", "Improves focus", "Lowers blood pressure"],
        rating: 4.8,
        timesCompleted: 15
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
        completed: false,
        instructor: "Dr. Michael Chen",
        benefits: ["Quick reset", "Mental clarity", "Stress reduction"],
        rating: 4.6,
        timesCompleted: 8
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
        completed: false,
        instructor: "Dr. Lisa Wang",
        benefits: ["Full body relaxation", "Pain management", "Better sleep"],
        equipment: ["Yoga mat", "Comfortable clothing"],
        rating: 4.9,
        timesCompleted: 12
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
        completed: true,
        instructor: "Dr. Emma Wilson",
        benefits: ["Stress relief", "Imagination", "Emotional balance"],
        rating: 4.7,
        timesCompleted: 6
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
        completed: false,
        instructor: "Dr. James Brown",
        benefits: ["Energy boost", "Advanced focus", "Spiritual growth"],
        rating: 4.9,
        timesCompleted: 3
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
        completed: false,
        instructor: "Dr. Sarah Johnson",
        benefits: ["Compassion", "Emotional healing", "Better relationships"],
        rating: 4.8,
        timesCompleted: 9
      },
      {
        id: "7",
        title: "Gentle Yoga Flow",
        description: "Combine movement with breath for mindful exercise",
        duration: 900,
        type: "yoga",
        difficulty: "beginner",
        category: "Movement",
        isFavorite: false,
        completed: true,
        instructor: "Dr. Lisa Wang",
        benefits: ["Flexibility", "Strength", "Mind-body connection"],
        equipment: ["Yoga mat", "Comfortable clothing"],
        rating: 4.7,
        timesCompleted: 11
      },
      {
        id: "8",
        title: "Deep Sleep Meditation",
        description: "Guided meditation to help you fall asleep and sleep better",
        duration: 1200,
        type: "sleep",
        difficulty: "beginner",
        category: "Sleep",
        isFavorite: true,
        completed: false,
        instructor: "Dr. Michael Chen",
        benefits: ["Better sleep", "Insomnia relief", "Deep relaxation"],
        rating: 4.9,
        timesCompleted: 7
      }
    ];
    setExercises(mockExercises);

    // Mock breathing patterns
    const mockBreathingPatterns: BreathingPattern[] = [
      {
        id: "1",
        name: "4-7-8 Breathing",
        inhale: 4,
        hold: 7,
        exhale: 8,
        holdAfterExhale: 0,
        description: "Calming breath pattern that helps reduce anxiety and promote sleep",
        benefits: ["Reduces anxiety", "Promotes sleep", "Lowers heart rate"]
      },
      {
        id: "2",
        name: "Box Breathing",
        inhale: 4,
        hold: 4,
        exhale: 4,
        holdAfterExhale: 4,
        description: "Balanced breathing pattern used by Navy SEALs for focus and calm",
        benefits: ["Improves focus", "Reduces stress", "Emotional balance"]
      },
      {
        id: "3",
        name: "Coherent Breathing",
        inhale: 5,
        hold: 0,
        exhale: 5,
        holdAfterExhale: 0,
        description: "Simple 5-5 breathing pattern for heart rate variability",
        benefits: ["Heart health", "Stress reduction", "Emotional regulation"]
      },
      {
        id: "4",
        name: "Energizing Breath",
        inhale: 6,
        hold: 2,
        exhale: 2,
        holdAfterExhale: 0,
        description: "Breathing pattern to increase energy and alertness",
        benefits: ["Energy boost", "Increased alertness", "Improved focus"]
      }
    ];
    setBreathingPatterns(mockBreathingPatterns);

    // Mock progress data
    const mockProgressData: ProgressData = {
      currentStreak: 7,
      longestStreak: 21,
      totalSessions: 89,
      totalMinutes: 1245,
      weeklyGoal: 5,
      weeklyProgress: 4,
      favoriteType: "breathing",
      achievements: [
        {
          id: "1",
          title: "First Steps",
          description: "Complete your first meditation session",
          icon: "🎯",
          unlocked: true,
          progress: 1,
          maxProgress: 1,
          category: "Getting Started"
        },
        {
          id: "2",
          title: "Week Warrior",
          description: "Meditate for 7 consecutive days",
          icon: "🔥",
          unlocked: true,
          progress: 7,
          maxProgress: 7,
          category: "Consistency"
        },
        {
          id: "3",
          title: "Meditation Master",
          description: "Complete 50 meditation sessions",
          icon: "🧘‍♀️",
          unlocked: true,
          progress: 50,
          maxProgress: 50,
          category: "Milestones"
        },
        {
          id: "4",
          title: "Breathing Expert",
          description: "Complete 25 breathing exercises",
          icon: "🌬️",
          unlocked: false,
          progress: 18,
          maxProgress: 25,
          category: "Skills"
        },
        {
          id: "5",
          title: "Mindful Month",
          description: "Meditate for 30 consecutive days",
          icon: "📅",
          unlocked: false,
          progress: 7,
          maxProgress: 30,
          category: "Consistency"
        }
      ]
    };
    setProgressData(mockProgressData);

    // Mock session history
    const mockSessionHistory: SessionHistory[] = [
      {
        id: "1",
        exerciseId: "1",
        exerciseName: "Breathing Basics",
        date: new Date(Date.now() - 86400000),
        duration: 300,
        type: "breathing",
        moodBefore: 3,
        moodAfter: 7,
        notes: "Felt very relaxed after this session"
      },
      {
        id: "2",
        exerciseId: "3",
        exerciseName: "Body Scan Meditation",
        date: new Date(Date.now() - 172800000),
        duration: 600,
        type: "body-scan",
        moodBefore: 4,
        moodAfter: 8,
        notes: "Great for releasing tension in my shoulders"
      },
      {
        id: "3",
        exerciseId: "2",
        exerciseName: "Mindful Moment",
        date: new Date(Date.now() - 259200000),
        duration: 180,
        type: "mindfulness",
        moodBefore: 5,
        moodAfter: 6,
        notes: "Quick reset during work day"
      }
    ];
    setSessionHistory(mockSessionHistory);
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
            // Mark exercise as completed and add to history
            setExercises(prev => prev.map(ex => 
              ex.id === currentExercise.id ? { ...ex, completed: true } : ex
            ));
            
            // Add to session history
            const newSession: SessionHistory = {
              id: Date.now().toString(),
              exerciseId: currentExercise.id,
              exerciseName: currentExercise.title,
              date: new Date(),
              duration: currentExercise.duration,
              type: currentExercise.type,
              moodBefore: 5,
              moodAfter: 8
            };
            setSessionHistory(prev => [newSession, ...prev]);
            
            // Update progress data
            if (progressData) {
              setProgressData({
                ...progressData,
                totalSessions: progressData.totalSessions + 1,
                totalMinutes: progressData.totalMinutes + Math.floor(currentExercise.duration / 60),
                currentStreak: progressData.currentStreak + 1,
                weeklyProgress: progressData.weeklyProgress + 1
              });
            }
            
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentExercise, progressData]);

  useEffect(() => {
    if (currentBreathingPattern && isPlaying) {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
      
      const runBreathingCycle = () => {
        const phases = [
          { name: 'inhale', duration: currentBreathingPattern.inhale },
          { name: 'hold', duration: currentBreathingPattern.hold },
          { name: 'exhale', duration: currentBreathingPattern.exhale },
          { name: 'holdAfterExhale', duration: currentBreathingPattern.holdAfterExhale }
        ];
        
        let currentPhaseIndex = 0;
        
        const nextPhase = () => {
          const phase = phases[currentPhaseIndex];
          setBreathingPhase(phase.name as any);
          setBreathingTimer(phase.duration);
          
          breathingIntervalRef.current = setInterval(() => {
            setBreathingTimer(prev => {
              if (prev <= 1) {
                clearInterval(breathingIntervalRef.current!);
                currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
                nextPhase();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        };
        
        nextPhase();
      };
      
      runBreathingCycle();
    }
    
    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [currentBreathingPattern, isPlaying]);

  const startExercise = (exercise: MeditationExercise) => {
    setCurrentExercise(exercise);
    setCurrentBreathingPattern(null);
    setTimeLeft(exercise.duration);
    setProgress(0);
    setIsPlaying(true);
  };

  const startBreathingExercise = (pattern: BreathingPattern) => {
    setCurrentBreathingPattern(pattern);
    setCurrentExercise(null);
    setIsPlaying(true);
    setBreathingPhase('inhale');
    setBreathingTimer(pattern.inhale);
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
    if (currentBreathingPattern) {
      setBreathingPhase('inhale');
      setBreathingTimer(currentBreathingPattern.inhale);
    }
  };

  const toggleFavorite = (exerciseId: string) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId ? { ...ex, isFavorite: !ex.isFavorite } : ex
    ));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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
      case "yoga": return <Sparkles className="h-5 w-5" />;
      case "sleep": return <Moon className="h-5 w-5" />;
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

  const getBreathingPhaseColor = (phase: string) => {
    switch (phase) {
      case "inhale": return "bg-blue-500";
      case "hold": return "bg-yellow-500";
      case "exhale": return "bg-green-500";
      case "holdAfterExhale": return "bg-purple-500";
      default: return "bg-gray-500";
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
              <div className="text-2xl font-bold text-purple-600">{progressData?.totalSessions || 0}</div>
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
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{progressData?.currentStreak || 0} days</div>
              <p className="text-xs text-muted-foreground">
                Best: {progressData?.longestStreak || 0} days 🔥
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
                {progressData?.totalMinutes || 0}m
              </div>
              <p className="text-xs text-muted-foreground">
                Time meditated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Exercise Player */}
        {(currentExercise || currentBreathingPattern) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentExercise ? getTypeIcon(currentExercise.type) : <Wind className="h-5 w-5" />}
                Now Playing: {currentExercise?.title || currentBreathingPattern?.name}
              </CardTitle>
              <CardDescription>
                {currentExercise?.description || currentBreathingPattern?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentBreathingPattern ? (
                  /* Breathing Exercise Visualization */
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-1000 ${getBreathingPhaseColor(breathingPhase)}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-bold uppercase">
                            {breathingPhase}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {breathingTimer}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          seconds remaining
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-blue-600">Inhale</div>
                        <div>{currentBreathingPattern.inhale}s</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">Hold</div>
                        <div>{currentBreathingPattern.hold}s</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">Exhale</div>
                        <div>{currentBreathingPattern.exhale}s</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-purple-600">Hold</div>
                        <div>{currentBreathingPattern.holdAfterExhale}s</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Exercise Player */
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
                )}
                
                <Progress value={progress} className="h-2" />
                
                {currentExercise && (
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatTime(currentExercise.duration - timeLeft)} elapsed</span>
                    <span>{formatTime(currentExercise.duration)} total</span>
                  </div>
                )}
                
                <div className="flex gap-2">
                  {currentExercise && (
                    <>
                      <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                        {currentExercise.difficulty}
                      </Badge>
                      <Badge variant="outline">{currentExercise.category}</Badge>
                      <Badge variant="secondary">{currentExercise.type}</Badge>
                      {currentExercise.instructor && (
                        <Badge variant="outline">👨‍⚕️ {currentExercise.instructor}</Badge>
                      )}
                    </>
                  )}
                </div>

                {/* Audio Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {volume[0]}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Exercises</TabsTrigger>
                <TabsTrigger value="breathing">Breathing</TabsTrigger>
                <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
                <TabsTrigger value="body-scan">Body Scan</TabsTrigger>
                <TabsTrigger value="visualization">Visualization</TabsTrigger>
                <TabsTrigger value="yoga">Yoga</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(exercise.id)}
                          >
                            <Star className={`h-5 w-5 ${exercise.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                          </Button>
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
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          
                          {exercise.instructor && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              👨‍⚕️ {exercise.instructor}
                            </div>
                          )}
                          
                          {exercise.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{exercise.rating}</span>
                              {exercise.timesCompleted && (
                                <span className="text-xs text-gray-500">({exercise.timesCompleted} sessions)</span>
                              )}
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Badge className={getDifficultyColor(exercise.difficulty)}>
                                {exercise.difficulty}
                              </Badge>
                              <Badge variant="outline">{exercise.category}</Badge>
                            </div>
                            
                            {exercise.benefits && exercise.benefits.length > 0 && (
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                <strong>Benefits:</strong> {exercise.benefits.join(', ')}
                              </div>
                            )}
                            
                            {exercise.equipment && exercise.equipment.length > 0 && (
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                <strong>Equipment:</strong> {exercise.equipment.join(', ')}
                              </div>
                            )}
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

              {["breathing", "mindfulness", "body-scan", "visualization", "yoga", "sleep"].map((type) => (
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(exercise.id)}
                            >
                              <Star className={`h-5 w-5 ${exercise.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                            </Button>
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
                                  <CheckCircle className="h-3 w-3 mr-1" />
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
          </TabsContent>

          <TabsContent value="breathing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {breathingPatterns.map((pattern) => (
                <Card key={pattern.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-blue-500" />
                      {pattern.name}
                    </CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <div className="font-medium text-blue-600">Inhale</div>
                          <div>{pattern.inhale}s</div>
                        </div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                          <div className="font-medium text-yellow-600">Hold</div>
                          <div>{pattern.hold}s</div>
                        </div>
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                          <div className="font-medium text-green-600">Exhale</div>
                          <div>{pattern.exhale}s</div>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                          <div className="font-medium text-purple-600">Hold</div>
                          <div>{pattern.holdAfterExhale}s</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Benefits:</strong> {pattern.benefits.join(', ')}
                      </div>
                      
                      <Button 
                        onClick={() => startBreathingExercise(pattern)}
                        className="w-full"
                        disabled={currentBreathingPattern?.id === pattern.id && isPlaying}
                      >
                        {currentBreathingPattern?.id === pattern.id && isPlaying ? "Practicing..." : "Start Breathing"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              {progressData && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Goal</CardTitle>
                        <CardDescription>Complete {progressData.weeklyGoal} sessions this week</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={(progressData.weeklyProgress / progressData.weeklyGoal) * 100} className="h-3" />
                          <div className="flex justify-between text-sm">
                            <span>{progressData.weeklyProgress} completed</span>
                            <span>{progressData.weeklyGoal} goal</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>Your meditation milestones</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {progressData.achievements.map((achievement) => (
                            <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl">{achievement.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{achievement.title}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                                  <div
                                    className={`h-1 rounded-full ${achievement.unlocked ? "bg-green-500" : "bg-blue-500"}`}
                                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              {achievement.unlocked && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Sessions</h3>
              <div className="space-y-3">
                {sessionHistory.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{session.exerciseName}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatTime(session.duration)} • {session.type} • {formatDate(session.date)}
                          </p>
                          {session.notes && (
                            <p className="text-sm text-gray-500 mt-1">{session.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <span>😔</span>
                            <span>→</span>
                            <span>😊</span>
                          </div>
                          <p className="text-xs text-gray-500">Mood improved</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
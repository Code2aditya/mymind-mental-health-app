"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Video, Headphones, FileText, Clock, Star, Eye, Heart, Filter, Check } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "audio" | "exercise";
  category: string;
  duration?: number;
  author: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  views: number;
  isFavorite: boolean;
  isCompleted: boolean;
  thumbnail?: string;
  content?: string;
  url?: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    // Mock resources data
    const mockResources: Resource[] = [
      {
        id: "1",
        title: "Understanding Anxiety Disorders",
        description: "Comprehensive guide to understanding different types of anxiety disorders and their symptoms",
        type: "article",
        category: "Anxiety",
        author: "Dr. Sarah Johnson",
        tags: ["anxiety", "mental health", "disorders"],
        difficulty: "beginner",
        rating: 4.8,
        views: 15420,
        isFavorite: true,
        isCompleted: false,
        content: "Anxiety disorders are the most common mental health conditions..."
      },
      {
        id: "2",
        title: "10-Minute Breathing Exercise",
        description: "Guided breathing exercise for immediate stress relief and relaxation",
        type: "audio",
        category: "Exercises",
        duration: 600,
        author: "MindWell Team",
        tags: ["breathing", "relaxation", "stress"],
        difficulty: "beginner",
        rating: 4.9,
        views: 23150,
        isFavorite: true,
        isCompleted: true,
        url: "/audio/breathing-exercise.mp3"
      },
      {
        id: "3",
        title: "Mindfulness Meditation for Beginners",
        description: "Learn the basics of mindfulness meditation with this comprehensive video guide",
        type: "video",
        category: "Meditation",
        duration: 900,
        author: "Dr. Michael Chen",
        tags: ["mindfulness", "meditation", "beginners"],
        difficulty: "beginner",
        rating: 4.7,
        views: 31280,
        isFavorite: false,
        isCompleted: false,
        thumbnail: "/thumbnails/mindfulness.jpg",
        url: "/videos/mindfulness-basics.mp4"
      },
      {
        id: "4",
        title: "Cognitive Behavioral Therapy Techniques",
        description: "Practical CBT techniques you can use to manage negative thought patterns",
        type: "article",
        category: "Therapy",
        author: "Dr. Emily Rodriguez",
        tags: ["cbt", "therapy", "thought patterns"],
        difficulty: "intermediate",
        rating: 4.6,
        views: 8750,
        isFavorite: false,
        isCompleted: true,
        content: "Cognitive Behavioral Therapy (CBT) is a type of psychotherapy..."
      },
      {
        id: "5",
        title: "Body Scan Relaxation",
        description: "Progressive muscle relaxation exercise for full-body stress relief",
        type: "exercise",
        category: "Exercises",
        duration: 1200,
        author: "Dr. Lisa Wang",
        tags: ["relaxation", "body scan", "stress relief"],
        difficulty: "intermediate",
        rating: 4.8,
        views: 19640,
        isFavorite: true,
        isCompleted: false
      },
      {
        id: "6",
        title: "Depression: Signs, Symptoms, and Treatment",
        description: "Understanding depression and exploring evidence-based treatment options",
        type: "video",
        category: "Depression",
        duration: 1800,
        author: "Dr. James Thompson",
        tags: ["depression", "treatment", "mental health"],
        difficulty: "intermediate",
        rating: 4.9,
        views: 28900,
        isFavorite: false,
        isCompleted: false,
        thumbnail: "/thumbnails/depression.jpg",
        url: "/videos/depression-guide.mp4"
      },
      {
        id: "7",
        title: "Sleep Hygiene for Better Mental Health",
        description: "Learn how improving your sleep can significantly impact your mental wellbeing",
        type: "article",
        category: "Lifestyle",
        author: "Dr. Anna Martinez",
        tags: ["sleep", "hygiene", "mental health"],
        difficulty: "beginner",
        rating: 4.5,
        views: 12300,
        isFavorite: false,
        isCompleted: false,
        content: "Quality sleep is essential for maintaining good mental health..."
      },
      {
        id: "8",
        title: "Advanced Stress Management Techniques",
        description: "Advanced strategies for managing chronic stress and building resilience",
        type: "video",
        category: "Stress Management",
        duration: 2400,
        author: "Dr. Robert Kim",
        tags: ["stress", "resilience", "advanced"],
        difficulty: "advanced",
        rating: 4.7,
        views: 6800,
        isFavorite: false,
        isCompleted: false,
        thumbnail: "/thumbnails/stress-management.jpg",
        url: "/videos/advanced-stress.mp4"
      }
    ];
    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedCategory, selectedType, selectedDifficulty]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return <FileText className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "audio": return <Headphones className="h-5 w-5" />;
      case "exercise": return <BookOpen className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article": return "bg-blue-100 text-blue-800";
      case "video": return "bg-red-100 text-red-800";
      case "audio": return "bg-green-100 text-green-800";
      case "exercise": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const toggleFavorite = (resourceId: string) => {
    setResources(prev => prev.map(resource =>
      resource.id === resourceId 
        ? { ...resource, isFavorite: !resource.isFavorite }
        : resource
    ));
  };

  const markAsCompleted = (resourceId: string) => {
    setResources(prev => prev.map(resource =>
      resource.id === resourceId 
        ? { ...resource, isCompleted: !resource.isCompleted }
        : resource
    ));
  };

  const categories = ["all", ...new Set(resources.map(r => r.category))];
  const types = ["all", ...new Set(resources.map(r => r.type))];
  const difficulties = ["all", ...new Set(resources.map(r => r.difficulty))];

  const completedCount = resources.filter(r => r.isCompleted).length;
  const favoriteCount = resources.filter(r => r.isFavorite).length;
  const totalCount = resources.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mental Health Resources Library 📚
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our curated collection of articles, videos, exercises, and guided practices to support your mental health journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
              <p className="text-xs text-muted-foreground">
                Available resources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <p className="text-xs text-muted-foreground">
                Resources completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
              <p className="text-xs text-muted-foreground">
                Saved resources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Progress rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(resource.id)}
                      >
                        <Heart className={`h-4 w-4 ${resource.isFavorite ? "text-red-500 fill-current" : ""}`} />
                      </Button>
                    </div>
                    <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{formatViews(resource.views)}</span>
                          </div>
                          {resource.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatDuration(resource.duration)}</span>
                            </div>
                          )}
                        </div>
                        {resource.isCompleted && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {resource.type === "article" ? "Read" : 
                           resource.type === "video" ? "Watch" :
                           resource.type === "audio" ? "Listen" : "Start"}
                        </Button>
                        {!resource.isCompleted && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsCompleted(resource.id)}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By {resource.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["articles", "videos", "audio", "exercises"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter(resource => resource.type === type)
                  .map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(resource.id)}
                        >
                          <Heart className={`h-4 w-4 ${resource.isFavorite ? "text-red-500 fill-current" : ""}`} />
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{resource.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{formatViews(resource.views)}</span>
                            </div>
                            {resource.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatDuration(resource.duration)}</span>
                              </div>
                            )}
                          </div>
                          {resource.isCompleted && (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                          <Badge className={getDifficultyColor(resource.difficulty)}>
                            {resource.difficulty}
                          </Badge>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            {resource.type === "article" ? "Read" : 
                             resource.type === "video" ? "Watch" :
                             resource.type === "audio" ? "Listen" : "Start"}
                          </Button>
                          {!resource.isCompleted && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => markAsCompleted(resource.id)}
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          By {resource.author}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.isFavorite).map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      </div>
                      <Heart className="h-5 w-5 text-red-500 fill-current cursor-pointer" onClick={() => toggleFavorite(resource.id)} />
                    </div>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{formatDuration(resource.duration || 0)}</span>
                        </div>
                        {resource.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {resource.type === "article" ? "Read" : 
                           resource.type === "video" ? "Watch" :
                           resource.type === "audio" ? "Listen" : "Start"}
                        </Button>
                        {!resource.completed && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsCompleted(resource.id)}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By {resource.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.isCompleted).map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      </div>
                      <Heart className={`h-5 w-5 cursor-pointer ${resource.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} onClick={() => toggleFavorite(resource.id)} />
                    </div>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{formatDuration(resource.duration || 0)}</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Review Again
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsCompleted(resource.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By {resource.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
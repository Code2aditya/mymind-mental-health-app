"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    router.push("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to MindWell
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your mental health wellness companion
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Login to Your Account
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={userType === "student" ? "default" : "outline"}
                        onClick={() => setUserType("student")}
                        className="flex-1"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "doctor" ? "default" : "outline"}
                        onClick={() => setUserType("doctor")}
                        className="flex-1"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Doctor
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  Create Your Account
                </CardTitle>
                <CardDescription>
                  Join MindWell and start your mental health journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regEmail">Email</Label>
                    <Input
                      id="regEmail"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="regPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={userType === "student" ? "default" : "outline"}
                        onClick={() => setUserType("student")}
                        className="flex-1"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "doctor" ? "default" : "outline"}
                        onClick={() => setUserType("doctor")}
                        className="flex-1"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Doctor
                      </Button>
                    </div>
                  </div>
                  
                  {userType === "student" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Age"
                            min="16"
                            max="100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Study Year</Label>
                          <Input
                            id="year"
                            type="number"
                            placeholder="Year"
                            min="1"
                            max="10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                          id="university"
                          type="text"
                          placeholder="University name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          type="text"
                          placeholder="Your course"
                        />
                      </div>
                    </div>
                  )}
                  
                  {userType === "doctor" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          type="text"
                          placeholder="e.g., Clinical Psychology, Psychiatry"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience (years)</Label>
                          <Input
                            id="experience"
                            type="number"
                            placeholder="Years"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license">License Number</Label>
                          <Input
                            id="license"
                            type="text"
                            placeholder="License number"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fee">Consultation Fee (₹)</Label>
                        <Input
                          id="fee"
                          type="number"
                          placeholder="Fee per session"
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
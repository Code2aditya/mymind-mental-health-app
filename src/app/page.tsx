"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Heart, Brain, Users, Calendar, BookOpen, MessageCircle, Shield, Star, ArrowRight, Sparkles, CheckCircle, Target, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge 
                variant="secondary" 
                className="w-fit animate-fade-in hover:scale-105 transition-transform duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                🇮🇳 Smart India Hackathon Project
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className={`inline-block transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  MindWell: Your Mental Health
                </span>
                <br />
                <span className={`text-blue-600 dark:text-blue-400 inline-block transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  Wellness Companion
                </span>
              </h1>
              <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Connecting students with mental health professionals through an intuitive platform. 
                Track your mood, book appointments, access resources, and prioritize your mental well-being.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => router.push("/auth")}
                >
                  <Heart className="mr-2 h-5 w-5 animate-pulse" />
                  Get Started as Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
                  onClick={() => router.push("/auth")}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Join as Doctor
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">10,000+</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <Brain className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">500+</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expert Doctors</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">50,000+</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Appointments</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <Star className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">4.9/5</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Target className="mr-2 h-4 w-4" />
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to maintain and improve your mental well-being in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-xl">Mood Tracking</CardTitle>
                <CardDescription className="text-base">
                  Monitor your emotional well-being with daily mood entries and get insights into your mental health patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Real-time analytics
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Easy Appointments</CardTitle>
                <CardDescription className="text-base">
                  Book consultations with certified mental health professionals at your convenience.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  24/7 availability
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">Resource Library</CardTitle>
                <CardDescription className="text-base">
                  Access curated articles, videos, and exercises to support your mental health journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Expert-curated content
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Secure Messaging</CardTitle>
                <CardDescription className="text-base">
                  Communicate privately with your healthcare provider through our encrypted messaging system.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  End-to-end encryption
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-indigo-500" />
                </div>
                <CardTitle className="text-xl">Mindfulness Exercises</CardTitle>
                <CardDescription className="text-base">
                  Practice meditation and mindfulness with guided sessions designed for stress relief.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Guided sessions
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-xl">Privacy First</CardTitle>
                <CardDescription className="text-base">
                  Your mental health data is encrypted and protected with industry-standard security measures.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  HIPAA compliant
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            <Award className="mr-2 h-4 w-4" />
            Join Our Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Prioritize Your Mental Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and doctors who are already using MindWell to make mental healthcare accessible and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={() => router.push("/auth")}
            >
              <Heart className="mr-2 h-5 w-5" />
              Student Registration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              onClick={() => router.push("/auth")}
            >
              <Brain className="mr-2 h-5 w-5" />
              Doctor Registration
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Free to Join</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">10,000+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">MindWell</h3>
              </div>
              <p className="text-gray-400">
                Your comprehensive mental health wellness platform for students and professionals.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">💬</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-4 text-blue-400">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Mood Tracking</li>
                <li className="hover:text-white transition-colors cursor-pointer">Book Appointments</li>
                <li className="hover:text-white transition-colors cursor-pointer">Resources</li>
                <li className="hover:text-white transition-colors cursor-pointer">Progress Dashboard</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-4 text-blue-400">For Doctors</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Patient Management</li>
                <li className="hover:text-white transition-colors cursor-pointer">Appointment Scheduling</li>
                <li className="hover:text-white transition-colors cursor-pointer">Consultation Tools</li>
                <li className="hover:text-white transition-colors cursor-pointer">Analytics</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-4 text-blue-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-2">&copy; 2024 MindWell. Built for Smart India Hackathon.</p>
            <div className="flex justify-center gap-6 text-sm">
              <span className="hover:text-white transition-colors cursor-pointer">Made with ❤️ in India</span>
              <span className="hover:text-white transition-colors cursor-pointer">Open Source</span>
              <span className="hover:text-white transition-colors cursor-pointer">Community Driven</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
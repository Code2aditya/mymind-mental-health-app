"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, Eye, EyeOff, Key, Database, Server, FileText, AlertTriangle, CheckCircle, Settings, Download, Trash2, Users } from "lucide-react";

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "data" | "communication" | "sharing" | "security";
  level: "basic" | "enhanced" | "maximum";
}

interface DataLog {
  id: string;
  action: string;
  timestamp: Date;
  user: string;
  ipAddress: string;
  device: string;
  location: string;
}

interface ConsentRecord {
  id: string;
  type: string;
  title: string;
  description: string;
  givenAt: Date;
  expiresAt?: Date;
  status: "active" | "expired" | "revoked";
}

export default function PrivacyPage() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([]);
  const [dataLogs, setDataLogs] = useState<DataLog[]>([]);
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState<"standard" | "enhanced" | "maximum">("enhanced");
  const [dataRetention, setDataRetention] = useState(30);
  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    // Mock privacy settings
    const mockSettings: PrivacySetting[] = [
      {
        id: "1",
        name: "Data Encryption",
        description: "Encrypt all sensitive data at rest and in transit",
        enabled: true,
        category: "security",
        level: "maximum"
      },
      {
        id: "2",
        name: "Anonymous Analytics",
        description: "Collect anonymous usage data to improve the service",
        enabled: false,
        category: "data",
        level: "basic"
      },
      {
        id: "3",
        name: "End-to-End Encryption",
        description: "Encrypt messages end-to-end for maximum privacy",
        enabled: true,
        category: "communication",
        level: "maximum"
      },
      {
        id: "4",
        name: "Data Sharing with Partners",
        description: "Share anonymized data with trusted healthcare partners",
        enabled: false,
        category: "sharing",
        level: "basic"
      },
      {
        id: "5",
        name: "Location Privacy",
        description: "Hide location data in appointments and communications",
        enabled: true,
        category: "data",
        level: "enhanced"
      },
      {
        id: "6",
        name: "Read Receipts",
        description: "Show when messages have been read",
        enabled: true,
        category: "communication",
        level: "basic"
      },
      {
        id: "7",
        name: "Profile Visibility",
        description: "Control who can see your profile information",
        enabled: true,
        category: "sharing",
        level: "enhanced"
      },
      {
        id: "8",
        name: "Session Timeout",
        description: "Automatically log out after periods of inactivity",
        enabled: true,
        category: "security",
        level: "enhanced"
      }
    ];
    setPrivacySettings(mockSettings);

    // Mock data logs
    const mockLogs: DataLog[] = [
      {
        id: "1",
        action: "User Login",
        timestamp: new Date(Date.now() - 3600000),
        user: "current-user",
        ipAddress: "192.168.1.1",
        device: "Chrome on Windows",
        location: "New York, USA"
      },
      {
        id: "2",
        action: "Data Export",
        timestamp: new Date(Date.now() - 7200000),
        user: "current-user",
        ipAddress: "192.168.1.1",
        device: "Chrome on Windows",
        location: "New York, USA"
      },
      {
        id: "3",
        action: "Privacy Settings Updated",
        timestamp: new Date(Date.now() - 10800000),
        user: "current-user",
        ipAddress: "192.168.1.1",
        device: "Chrome on Windows",
        location: "New York, USA"
      },
      {
        id: "4",
        action: "Message Sent",
        timestamp: new Date(Date.now() - 14400000),
        user: "current-user",
        ipAddress: "192.168.1.1",
        device: "Mobile App on iOS",
        location: "New York, USA"
      }
    ];
    setDataLogs(mockLogs);

    // Mock consent records
    const mockConsent: ConsentRecord[] = [
      {
        id: "1",
        type: "Terms of Service",
        title: "Terms of Service Agreement",
        description: "Agreement to our terms of service and community guidelines",
        givenAt: new Date(Date.now() - 2592000000),
        status: "active"
      },
      {
        id: "2",
        type: "Privacy Policy",
        title: "Privacy Policy Acceptance",
        description: "Acceptance of our comprehensive privacy policy",
        givenAt: new Date(Date.now() - 2592000000),
        status: "active"
      },
      {
        id: "3",
        type: "Data Processing",
        title: "Data Processing Consent",
        description: "Consent for processing of personal health data",
        givenAt: new Date(Date.now() - 2592000000),
        expiresAt: new Date(Date.now() + 31536000000),
        status: "active"
      },
      {
        id: "4",
        type: "Marketing Communications",
        title: "Marketing Communications",
        description: "Consent to receive marketing and promotional materials",
        givenAt: new Date(Date.now() - 2592000000),
        status: "revoked"
      }
    ];
    setConsentRecords(mockConsent);
  }, []);

  const togglePrivacySetting = (id: string) => {
    setPrivacySettings(prev => prev.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "data": return "bg-blue-100 text-blue-800";
      case "communication": return "bg-green-100 text-green-800";
      case "sharing": return "bg-purple-100 text-purple-800";
      case "security": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "basic": return "bg-yellow-100 text-yellow-800";
      case "enhanced": return "bg-blue-100 text-blue-800";
      case "maximum": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "revoked": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const enabledSettings = privacySettings.filter(s => s.enabled).length;
  const totalSettings = privacySettings.length;
  const privacyScore = (enabledSettings / totalSettings) * 100;

  const settingsByCategory = privacySettings.reduce((acc, setting) => {
    acc[setting.category] = (acc[setting.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy First 🔒
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive privacy controls and data protection for your peace of mind
          </p>
        </div>

        {/* Privacy Score Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Privacy Score
            </CardTitle>
            <CardDescription>
              Overall privacy protection level based on your current settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {privacyScore.toFixed(0)}%
                </div>
                <Progress value={privacyScore} className="h-3 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {privacyScore >= 80 ? "Excellent Protection" : 
                   privacyScore >= 60 ? "Good Protection" : 
                   "Room for Improvement"}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Settings by Category</h4>
                <div className="space-y-1">
                  {Object.entries(settingsByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <Badge className={getCategoryColor(category)}>
                        {count} settings
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete My Account
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Data Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="consent">Consents</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Controls</CardTitle>
                  <CardDescription>
                    Manage your privacy preferences and data sharing settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {privacySettings.map((setting) => (
                      <div key={setting.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{setting.name}</h4>
                            <Badge className={getLevelColor(setting.level)}>
                              {setting.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={() => togglePrivacySetting(setting.id)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Levels</CardTitle>
                  <CardDescription>
                    Choose your preferred level of privacy protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Basic Privacy</h4>
                        <Badge className={getLevelColor("basic")}>Basic</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Standard privacy protection with essential data encryption
                      </p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Data encryption at rest
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Secure login
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Enhanced Privacy</h4>
                        <Badge className={getLevelColor("enhanced")}>Enhanced</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Advanced protection with additional security features
                      </p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          End-to-end encryption
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Location privacy
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Enhanced session security
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Maximum Privacy</h4>
                        <Badge className={getLevelColor("maximum")}>Maximum</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Complete privacy protection with all security features enabled
                      </p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Maximum encryption
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Anonymous mode
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          No data sharing
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Encryption Level</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred encryption strength
                        </p>
                      </div>
                      <Select value={encryptionLevel} onValueChange={(value: "standard" | "enhanced" | "maximum") => setEncryptionLevel(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="enhanced">Enhanced</SelectItem>
                          <SelectItem value="maximum">Maximum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Session Management</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          View Active Sessions
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Recovery Options
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Protection</CardTitle>
                  <CardDescription>
                    Control how your data is stored and protected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="data-retention">Data Retention Period</Label>
                      <Select value={dataRetention.toString()} onValueChange={(value) => setDataRetention(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="0">Keep forever</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        Data older than this period will be automatically deleted
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Data Protection Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <span className="text-sm">Automatic backups</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            <span className="text-sm">Secure servers</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm">Regular security audits</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Emergency Actions</h4>
                      <div className="space-y-2">
                        <Button variant="destructive" size="sm" className="w-full justify-start">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Lock Account
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download All Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Control your personal data and manage your digital footprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Export Data</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Profile Information
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Health Records
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Appointment History
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Communication Logs
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Data Controls</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        View Data Usage
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Permissions
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Request Data Report
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Activity Data
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Account Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Connected Apps
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Key className="h-4 w-4 mr-2" />
                        API Keys
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Privacy Checkup
                      </Button>
                      <Button variant="destructive" size="sm" className="w-full justify-start">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">📋 Data Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">2.3 GB</div>
                      <div className="text-gray-600 dark:text-gray-400">Total Data</div>
                    </div>
                    <div>
                      <div className="font-semibold">156</div>
                      <div className="text-gray-600 dark:text-gray-400">Files</div>
                    </div>
                    <div>
                      <div className="font-semibold">89%</div>
                      <div className="text-gray-600 dark:text-gray-400">Encrypted</div>
                    </div>
                    <div>
                      <div className="font-semibold">12</div>
                      <div className="text-gray-600 dark:text-gray-400">Active Sessions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consent">
            <Card>
              <CardHeader>
                <CardTitle>Consent Management</CardTitle>
                <CardDescription>
                  View and manage your consent records and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consentRecords.map((consent) => (
                    <div key={consent.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{consent.title}</h4>
                            <Badge className={getStatusColor(consent.status)}>
                              {consent.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {consent.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Type: {consent.type}</span>
                            <span>Given: {formatDateTime(consent.givenAt)}</span>
                            {consent.expiresAt && (
                              <span>Expires: {formatDateTime(consent.expiresAt)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {consent.status === "active" && (
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">✅ Your Rights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Right to Access</div>
                      <div className="text-gray-600 dark:text-gray-400">Access your personal data anytime</div>
                    </div>
                    <div>
                      <div className="font-medium">Right to Rectify</div>
                      <div className="text-gray-600 dark:text-gray-400">Correct inaccurate personal data</div>
                    </div>
                    <div>
                      <div className="font-medium">Right to Erase</div>
                      <div className="text-gray-600 dark:text-gray-400">Request deletion of your data</div>
                    </div>
                    <div>
                      <div className="font-medium">Right to Object</div>
                      <div className="text-gray-600 dark:text-gray-400">Object to data processing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Monitor all account activity and security events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataLogs.map((log) => (
                    <div key={log.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                          <Eye className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-medium">{log.action}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>{formatDateTime(log.timestamp)}</span>
                            <span>{log.device}</span>
                            <span>{log.location}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            IP: {log.ipAddress}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {log.user}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    Load More Activity
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
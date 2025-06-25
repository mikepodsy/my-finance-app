"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  Key, 
  Eye, 
  EyeOff,
  Save,
  Settings as SettingsIcon
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "price" | "news" | "policy" | "portfolio" | "security";
}

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: "1",
    name: "Price Alerts",
    description: "Get notified when stocks reach your target prices",
    enabled: true,
    category: "price"
  },
  {
    id: "2",
    name: "Market News",
    description: "Receive breaking news and market updates",
    enabled: true,
    category: "news"
  },
  {
    id: "3",
    name: "Policy Changes",
    description: "Alerts for regulatory changes and policy updates",
    enabled: false,
    category: "policy"
  },
  {
    id: "4",
    name: "Portfolio Performance",
    description: "Daily and weekly portfolio performance summaries",
    enabled: true,
    category: "portfolio"
  },
  {
    id: "5",
    name: "Security Alerts",
    description: "Login attempts and account security notifications",
    enabled: true,
    category: "security"
  },
  {
    id: "6",
    name: "Earnings Announcements",
    description: "Notifications for upcoming earnings releases",
    enabled: false,
    category: "news"
  }
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(mockNotificationSettings);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const getCategoryIcon = (category: NotificationSetting["category"]) => {
    switch (category) {
      case "price": return <Globe className="h-4 w-4" />;
      case "news": return <Bell className="h-4 w-4" />;
      case "policy": return <Shield className="h-4 w-4" />;
      case "portfolio": return <User className="h-4 w-4" />;
      case "security": return <Key className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: NotificationSetting["category"]) => {
    switch (category) {
      case "price": return "bg-green-100 text-green-800";
      case "news": return "bg-blue-100 text-blue-800";
      case "policy": return "bg-purple-100 text-purple-800";
      case "portfolio": return "bg-orange-100 text-orange-800";
      case "security": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and security settings</p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone" 
                className="w-full px-3 py-2 border rounded-md bg-background"
                defaultValue="America/New_York"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type="password"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Recent Login Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <div className="font-medium">New York, NY</div>
                    <div className="text-muted-foreground">Chrome on Windows • 2 hours ago</div>
                  </div>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <div className="font-medium">San Francisco, CA</div>
                    <div className="text-muted-foreground">Safari on iPhone • 1 day ago</div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications in your browser
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getCategoryColor(notification.category)}`}>
                        {getCategoryIcon(notification.category)}
                      </div>
                      <div>
                        <div className="font-medium">{notification.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {notification.description}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for better visibility
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <select 
                id="currency" 
                className="w-full px-3 py-2 border rounded-md bg-background"
                defaultValue="USD"
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <select 
                id="dateFormat" 
                className="w-full px-3 py-2 border rounded-md bg-background"
                defaultValue="MM/DD/YYYY"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Data Export</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download your portfolio data, transaction history, and account information.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Portfolio Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Transaction History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trash2 className="h-5 w-5" />
                <span>Account Deletion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>API & Integrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex space-x-2">
                <Input 
                  id="apiKey" 
                  type="password" 
                  defaultValue="sk_live_1234567890abcdef"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this API key to integrate with third-party applications
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input 
                id="webhookUrl" 
                placeholder="https://your-app.com/webhook"
              />
              <p className="text-xs text-muted-foreground">
                Receive real-time updates via webhooks
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 
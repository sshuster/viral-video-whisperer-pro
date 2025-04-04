
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Search, Trash2, UserX, LinkIcon, User, Video, Shield, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from 'sonner';

// Mock data for admin dashboard
const mockUsers = [
  { id: "1", username: "muser", name: "Mock User", role: "user", videosSubmitted: 5, joinDate: "2023-11-15T10:30:00Z", status: "active" },
  { id: "2", username: "mvc", name: "Admin User", role: "admin", videosSubmitted: 0, joinDate: "2023-10-01T08:15:00Z", status: "active" },
  { id: "3", username: "johndoe", name: "John Doe", role: "user", videosSubmitted: 12, joinDate: "2023-12-05T14:45:00Z", status: "active" },
  { id: "4", username: "janedoe", name: "Jane Doe", role: "user", videosSubmitted: 8, joinDate: "2024-01-10T09:20:00Z", status: "active" },
  { id: "5", username: "bobsmith", name: "Bob Smith", role: "user", videosSubmitted: 3, joinDate: "2024-02-20T11:10:00Z", status: "active" },
];

const mockVideos = [
  { id: "1", userId: "1", username: "muser", url: "https://www.youtube.com/watch?v=abc123", platform: "youtube", status: "active", submittedAt: "2024-03-01T10:30:00Z", score: 78 },
  { id: "2", userId: "1", username: "muser", url: "https://www.tiktok.com/@user/video/123456", platform: "tiktok", status: "active", submittedAt: "2024-03-05T15:45:00Z", score: 64 },
  { id: "3", userId: "3", username: "johndoe", url: "https://www.youtube.com/watch?v=def456", platform: "youtube", status: "active", submittedAt: "2024-03-10T09:15:00Z", score: 82 },
  { id: "4", userId: "3", username: "johndoe", url: "https://www.instagram.com/reel/123456/", platform: "instagram", status: "reported", submittedAt: "2024-03-12T14:20:00Z", score: 71 },
  { id: "5", userId: "4", username: "janedoe", url: "https://www.youtube.com/watch?v=ghi789", platform: "youtube", status: "active", submittedAt: "2024-03-15T11:30:00Z", score: 93 },
  { id: "6", userId: "5", username: "bobsmith", url: "https://www.tiktok.com/@user/video/789012", platform: "tiktok", status: "active", submittedAt: "2024-03-18T16:45:00Z", score: 56 },
  { id: "7", userId: "4", username: "janedoe", url: "https://www.facebook.com/watch/?v=123456", platform: "facebook", status: "active", submittedAt: "2024-03-20T13:10:00Z", score: 68 },
  { id: "8", userId: "3", username: "johndoe", url: "https://www.youtube.com/watch?v=jkl012", platform: "youtube", status: "active", submittedAt: "2024-03-22T10:45:00Z", score: 75 },
];

// Charts data
const platformData = [
  { name: "YouTube", value: 4 },
  { name: "TikTok", value: 2 },
  { name: "Instagram", value: 1 },
  { name: "Facebook", value: 1 },
];

const userActivityData = [
  { name: "John Doe", videos: 12 },
  { name: "Jane Doe", videos: 8 },
  { name: "Mock User", videos: 5 },
  { name: "Bob Smith", videos: 3 },
  { name: "Admin User", videos: 0 },
];

const scoreDistributionData = [
  { score: "90-100", count: 1 },
  { score: "80-89", count: 1 },
  { score: "70-79", count: 2 },
  { score: "60-69", count: 3 },
  { score: "50-59", count: 1 },
  { score: "0-49", count: 0 },
];

const Admin = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [videos, setVideos] = useState(mockVideos);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [videoSearchQuery, setVideoSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  useEffect(() => {
    // Filter users based on search query
    setFilteredUsers(
      users.filter(user => 
        user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
      )
    );
  }, [users, userSearchQuery]);

  useEffect(() => {
    // Filter videos based on search query
    setFilteredVideos(
      videos.filter(video => 
        video.url.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
        video.username.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
        video.platform.toLowerCase().includes(videoSearchQuery.toLowerCase())
      )
    );
  }, [videos, videoSearchQuery]);

  // If still loading auth state, return loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-viral-purple rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If user is not admin, redirect to dashboard
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User has been removed");
  };

  const handleRemoveVideo = (videoId: string) => {
    setVideos(videos.filter(video => video.id !== videoId));
    toast.success("Video has been removed");
  };

  const COLORS = ['#8B5CF6', '#0EA5E9', '#D946EF', '#F97316'];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, videos, and monitor system performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-viral-purple mr-2" />
              <div className="text-2xl font-bold">{users.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Video className="h-5 w-5 text-viral-purple mr-2" />
              <div className="text-2xl font-bold">{videos.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reported Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-viral-purple mr-2" />
              <div className="text-2xl font-bold">
                {videos.filter(v => v.status === "reported").length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">User</div>
                  <div className="col-span-1">Role</div>
                  <div className="col-span-1">Videos</div>
                  <div className="col-span-2">Join Date</div>
                  <div className="col-span-1">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                        <div className="col-span-2 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <Badge variant={user.role === "admin" ? "destructive" : "default"}>
                            {user.role === "admin" ? (
                              <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                <span>Admin</span>
                              </div>
                            ) : (
                              "User"
                            )}
                          </Badge>
                        </div>
                        <div className="col-span-1">{user.videosSubmitted}</div>
                        <div className="col-span-2 text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                        <div className="col-span-1">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" disabled={user.role === "admin"}>
                                <UserX className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {user.name} (@{user.username})? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveUser(user.id)}>
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No users found matching "{userSearchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Management</CardTitle>
              <CardDescription>
                View and manage submitted videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos by URL, username, or platform..."
                    value={videoSearchQuery}
                    onChange={(e) => setVideoSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="col-span-3">Video URL</div>
                  <div className="col-span-1">Platform</div>
                  <div className="col-span-1">User</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <div key={video.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                        <div className="col-span-3 flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <a 
                            href={video.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-viral-purple hover:underline truncate"
                          >
                            {video.url}
                          </a>
                        </div>
                        <div className="col-span-1">
                          <Badge variant="outline" className="capitalize">
                            {video.platform}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-sm">@{video.username}</div>
                        <div className="col-span-1">
                          <Badge variant={video.status === "reported" ? "destructive" : "secondary"}>
                            {video.status === "reported" ? "Reported" : "Active"}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Video</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this video? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveVideo(video.id)}>
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No videos found matching "{videoSearchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platforms Distribution</CardTitle>
                <CardDescription>
                  Breakdown of videos by platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  Number of videos submitted by user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userActivityData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="videos" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Virality Score Distribution</CardTitle>
                <CardDescription>
                  Distribution of videos by virality score range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scoreDistributionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="score" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Number of Videos" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

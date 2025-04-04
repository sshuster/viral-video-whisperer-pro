
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import VideoSubmissionForm from "@/components/VideoSubmissionForm";
import SuggestionResults from "@/components/SuggestionResults";
import VideoHistory from "@/components/VideoHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUp, ArrowDown, BarChart3, Lightbulb, Share2, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentSuggestion, setCurrentSuggestion] = useState<any>(null);
  const [videoHistory, setVideoHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalVideos: 0,
    averageScore: 0,
    improvementRate: 0,
    topPlatform: 'YouTube'
  });

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

  // If user is admin, redirect to admin dashboard
  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  const handleSubmissionSuccess = (suggestion: any) => {
    setCurrentSuggestion(suggestion);
    setVideoHistory(prev => [suggestion, ...prev]);
    
    // Update stats
    const newTotalVideos = videoHistory.length + 1;
    const allScores = [...videoHistory.map(v => v.metrics.overall), suggestion.metrics.overall];
    const newAverageScore = Math.round(allScores.reduce((a, b) => a + b, 0) / newTotalVideos);
    
    setStats({
      totalVideos: newTotalVideos,
      averageScore: newAverageScore,
      improvementRate: Math.round(Math.random() * 30), // Mock data
      topPlatform: ['YouTube', 'TikTok', 'Instagram Reels'][Math.floor(Math.random() * 3)] // Mock data
    });
  };
  
  const handleSelectVideo = (video: any) => {
    setCurrentSuggestion(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data for the pie chart
  const pieData = [
    { name: "Engagement", value: currentSuggestion?.metrics.engagement || 0 },
    { name: "Retention", value: currentSuggestion?.metrics.retention || 0 },
    { name: "Shareability", value: currentSuggestion?.metrics.shareability || 0 },
  ];
  
  const COLORS = ['#8B5CF6', '#0EA5E9', '#D946EF'];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          Submit your videos to get AI-powered suggestions for viral content
        </p>
      </div>
      
      {videoHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-viral-purple mr-2" />
                <div className="text-2xl font-bold">{stats.totalVideos}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Virality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-viral-purple mr-2" />
                <div className="text-2xl font-bold">{stats.averageScore}%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {stats.improvementRate > 0 ? (
                  <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-red-500 mr-2" />
                )}
                <div className="text-2xl font-bold">
                  {stats.improvementRate > 0 ? '+' : ''}{stats.improvementRate}%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Share2 className="h-5 w-5 text-viral-purple mr-2" />
                <div className="text-2xl font-bold">{stats.topPlatform}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <VideoSubmissionForm onSubmitSuccess={handleSubmissionSuccess} />
          
          {currentSuggestion && (
            <Card className="hidden lg:block">
              <CardHeader>
                <CardTitle>Metrics Breakdown</CardTitle>
                <CardDescription>
                  Detailed breakdown of your video's metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
            
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
              <CardDescription>
                Tips to increase your content's virality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-viral-purple flex-shrink-0 mt-0.5" />
                  <span>Hook viewers in the first 3 seconds to improve retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-viral-purple flex-shrink-0 mt-0.5" />
                  <span>Use trending audio and hashtags to increase discoverability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-viral-purple flex-shrink-0 mt-0.5" />
                  <span>Post consistently at the optimal times for your audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-viral-purple flex-shrink-0 mt-0.5" />
                  <span>Create content that elicits strong emotional responses</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          {currentSuggestion ? (
            <SuggestionResults suggestion={currentSuggestion} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>
                  Submit your first video to get AI-powered virality suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <div className="mb-4 text-viral-purple">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Get Started</h3>
                <p className="text-muted-foreground max-w-md">
                  Use the form on the left to submit your video URL and get detailed AI-powered suggestions to make your content go viral
                </p>
              </CardContent>
            </Card>
          )}
          
          <VideoHistory 
            videos={videoHistory} 
            onSelectVideo={handleSelectVideo} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

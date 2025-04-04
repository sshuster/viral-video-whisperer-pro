
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VideoHistoryProps = {
  videos: any[];
  onSelectVideo: (video: any) => void;
};

const VideoHistory = ({ videos, onSelectVideo }: VideoHistoryProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (videos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Video History</CardTitle>
          <CardDescription>
            Submit your first video to get AI-powered suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 text-viral-purple">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-muted-foreground">No videos analyzed yet</p>
          <p className="text-sm text-muted-foreground mt-1">Your analyzed videos will appear here</p>
        </CardContent>
      </Card>
    );
  }

  // Data for the chart
  const chartData = videos.map(video => ({
    name: formatDistanceToNow(new Date(video.timestamp), { addSuffix: true }),
    score: video.metrics.overall,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video History</CardTitle>
        <CardDescription>
          Your previously analyzed videos and their virality scores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8B5CF6" name="Virality Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="border rounded-md overflow-hidden"
            >
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent/50"
                onClick={() => toggleExpand(video.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        video.metrics.overall > 80 
                          ? "bg-green-500" 
                          : video.metrics.overall > 50 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">
                      {video.url}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(video.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {video.platform}
                  </Badge>
                  <div className="text-sm font-medium">
                    {video.metrics.overall}%
                  </div>
                  {expandedId === video.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>
              
              {expandedId === video.id && (
                <div className="p-3 border-t bg-background">
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Engagement:</span>{" "}
                        <span className="font-medium">{video.metrics.engagement}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention:</span>{" "}
                        <span className="font-medium">{video.metrics.retention}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shareability:</span>{" "}
                        <span className="font-medium">{video.metrics.shareability}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overall:</span>{" "}
                        <span className="font-medium">{video.metrics.overall}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-medium">Top suggestions:</div>
                      <ul className="text-xs">
                        {video.suggestions.slice(0, 2).map((sugg: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-1">
                            <Check className="h-3 w-3 text-viral-purple mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{sugg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVideo(video);
                        }}
                      >
                        View Full Analysis
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(video.url, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Video
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoHistory;

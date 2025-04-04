
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, LinkIcon } from "lucide-react";
import { toast } from 'sonner';

const platformOptions = [
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram Reels" },
  { value: "facebook", label: "Facebook" },
];

type VideoSubmissionFormProps = {
  onSubmitSuccess: (suggestion: any) => void;
};

const VideoSubmissionForm = ({ onSubmitSuccess }: VideoSubmissionFormProps) => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!url) {
      setError("Video URL is required");
      return;
    }
    
    if (!platform) {
      setError("Platform is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const mockSuggestion = {
        id: Date.now().toString(),
        url,
        platform,
        description,
        timestamp: new Date().toISOString(),
        suggestions: [
          "Add trending hashtags like #viral #trending #explore",
          "Shorten the intro to 3 seconds to improve retention",
          "Add text overlays to make it more engaging",
          "Use more vibrant color grading to stand out in feeds",
          "Add a hook in the first 5 seconds to capture attention"
        ],
        metrics: {
          engagement: Math.floor(Math.random() * 100),
          retention: Math.floor(Math.random() * 100),
          shareability: Math.floor(Math.random() * 100),
          overall: Math.floor(Math.random() * 100)
        }
      };
      
      // Pass the suggestion data to parent component
      onSubmitSuccess(mockSuggestion);
      
      // Reset form
      setUrl("");
      setPlatform("");
      setDescription("");
      
      toast.success("Your video has been analyzed!");
    } catch (err) {
      console.error(err);
      setError("Failed to analyze video. Please try again.");
      toast.error("Failed to analyze video");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Video</CardTitle>
        <CardDescription>
          Enter your video URL and details to get AI-powered suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Video URL</Label>
            <div className="flex">
              <div className="relative flex-grow">
                <LinkIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-8"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={platform} 
              onValueChange={setPlatform}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any details about your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing video...
            </>
          ) : (
            "Get Suggestions"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoSubmissionForm;

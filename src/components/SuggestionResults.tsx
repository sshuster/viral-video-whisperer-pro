
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, CheckCircle, Copy, Share2 } from "lucide-react";
import { toast } from 'sonner';

type SuggestionResultsProps = {
  suggestion: any;
};

const SuggestionResults = ({ suggestion }: SuggestionResultsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast.success("Suggestion copied to clipboard!");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Virality Analysis</CardTitle>
          <CardDescription>
            Our AI analyzed your {suggestion.platform} video and has suggestions to increase virality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Engagement Potential</h3>
                <div className="flex items-center gap-2">
                  <Progress value={suggestion.metrics.engagement} className="h-2" />
                  <span className="text-sm">{suggestion.metrics.engagement}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Viewer Retention</h3>
                <div className="flex items-center gap-2">
                  <Progress value={suggestion.metrics.retention} className="h-2" />
                  <span className="text-sm">{suggestion.metrics.retention}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Shareability</h3>
                <div className="flex items-center gap-2">
                  <Progress value={suggestion.metrics.shareability} className="h-2" />
                  <span className="text-sm">{suggestion.metrics.shareability}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Overall Virality Score</h3>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={suggestion.metrics.overall} 
                    className={`h-2 ${
                      suggestion.metrics.overall > 80 
                        ? "bg-green-500" 
                        : suggestion.metrics.overall > 50 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">{suggestion.metrics.overall}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Video Details</h3>
              <div className="bg-muted/50 p-3 rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">URL:</span>
                  <div className="flex items-center">
                    <a 
                      href={suggestion.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-viral-purple hover:underline flex items-center"
                    >
                      {suggestion.url.length > 40 ? `${suggestion.url.substring(0, 40)}...` : suggestion.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Platform:</span>
                  <span className="capitalize">{suggestion.platform}</span>
                </div>
                {suggestion.description && (
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="text-right">
                      {suggestion.description.length > 40 
                        ? `${suggestion.description.substring(0, 40)}...` 
                        : suggestion.description}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Suggestions</CardTitle>
          <CardDescription>
            Implement these changes to boost your video's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {suggestion.suggestions.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2 p-3 bg-accent/50 rounded-md">
                <CheckCircle className="h-5 w-5 text-viral-purple flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p>{item}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopy(item, index)}
                  className="flex-shrink-0"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionResults;

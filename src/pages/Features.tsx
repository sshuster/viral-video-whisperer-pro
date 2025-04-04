
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp, BarChart, LineChart, Users, Video, Zap, ArrowRight, Code, PenTool, Lightbulb, Target } from "lucide-react";

const Features = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features to <span className="text-viral-purple">Boost Your Content</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Discover how our AI-powered platform can help you create more engaging, shareable, and viral videos across all major social platforms.
          </p>
          <Button 
            size="lg"
            className="bg-viral-purple hover:bg-viral-dark-purple"
            onClick={handleGetStarted}
          >
            Try It Free
          </Button>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Platform Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to analyze, optimize, and improve your video content
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="inline-flex items-center bg-viral-light-purple text-viral-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Content Analysis
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  AI-Powered Video Analysis
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our advanced AI algorithms analyze your video content across multiple dimensions to identify key areas for improvement. We evaluate factors like hook strength, pacing, engagement triggers, and more.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Detailed breakdown of engagement factors</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Comparison with trending content in your niche</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Retention analysis to identify drop-off points</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="AI analyzing video content" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                    alt="Platform-specific optimization" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="inline-flex items-center bg-viral-light-purple text-viral-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Target className="mr-1 h-4 w-4" />
                  Platform Optimization
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Platform-Specific Recommendations
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  What works on TikTok might not work on YouTube. Our platform provides tailored suggestions optimized for each social media platform's unique algorithm and audience expectations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Optimized suggestions for TikTok, YouTube, Instagram, and more</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Platform-specific format and length recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Trending hashtags and keywords for maximum visibility</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="inline-flex items-center bg-viral-light-purple text-viral-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <LineChart className="mr-1 h-4 w-4" />
                  Performance Tracking
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Comprehensive Analytics Dashboard
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Track your progress over time with our detailed analytics dashboard. Monitor improvements in your virality scores and see how implementing our suggestions impacts your content performance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Historical performance tracking of all analyzed videos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Visual charts and metrics for engagement factors</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">
                      <svg className="h-5 w-5 text-viral-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Improvement trend analysis across content types</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Analytics dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Features Grid */}
      <section className="py-20 px-4 bg-accent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to take your content to the next level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Ideation</h3>
              <p className="text-muted-foreground">
                Get AI-powered content ideas based on trending topics in your niche to help you stay relevant and capture audience interest.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Script Optimization</h3>
              <p className="text-muted-foreground">
                Enhance your video scripts with suggestions for stronger hooks, better pacing, and more engaging language.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Audience Insights</h3>
              <p className="text-muted-foreground">
                Understand your audience demographics and preferences to create content that resonates with your specific viewers.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">SEO Recommendations</h3>
              <p className="text-muted-foreground">
                Get platform-specific SEO suggestions for titles, descriptions, and tags to maximize discoverability.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitor Analysis</h3>
              <p className="text-muted-foreground">
                See how your content stacks up against similar creators in your niche and get ideas for differentiation.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Export & Sharing</h3>
              <p className="text-muted-foreground">
                Easily export and share your analysis results with team members or clients to coordinate content strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Getting started is easy - analyze your first video in minutes
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 text-center">
              <div className="w-16 h-16 rounded-full bg-viral-light-purple flex items-center justify-center mx-auto mb-6">
                <div className="text-viral-purple text-xl font-bold">1</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Submit Your Video</h3>
              <p className="text-muted-foreground">
                Simply paste the URL of your video from YouTube, TikTok, Instagram, or Facebook into our platform.
              </p>
            </div>
            
            <div className="md:w-1/3 text-center">
              <div className="w-16 h-16 rounded-full bg-viral-light-purple flex items-center justify-center mx-auto mb-6">
                <div className="text-viral-purple text-xl font-bold">2</div>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your content across multiple dimensions to identify optimization opportunities.
              </p>
            </div>
            
            <div className="md:w-1/3 text-center">
              <div className="w-16 h-16 rounded-full bg-viral-light-purple flex items-center justify-center mx-auto mb-6">
                <div className="text-viral-purple text-xl font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Actionable Insights</h3>
              <p className="text-muted-foreground">
                Review your personalized suggestions and implement them to improve your next video's viral potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-viral-purple text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your Content?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of content creators who are using our platform to increase their reach and engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="default"
              className="bg-white text-viral-purple hover:bg-gray-100"
              onClick={handleGetStarted}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

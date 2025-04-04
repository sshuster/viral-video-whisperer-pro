
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, TrendingUp, Zap, BarChart, Users, Video } from "lucide-react";

const Home = () => {
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
      <section className="py-20 px-4 bg-gradient-to-br from-accent via-background to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-accent text-sm font-medium text-viral-purple mb-2">
                Your secret weapon for viral content
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your Videos into <span className="text-viral-purple">Viral Sensations</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Get AI-powered suggestions to optimize your videos for TikTok, YouTube, Instagram, and more. Start creating content that captures attention and drives engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-viral-purple hover:bg-viral-dark-purple"
                  onClick={handleGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/features")}
                >
                  See How It Works
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Content Creator at Work" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-viral-light-purple flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-viral-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Virality Score</div>
                      <div className="text-xl font-bold text-viral-purple">92%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-viral-light-purple flex items-center justify-center">
                      <Zap className="h-5 w-5 text-viral-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Suggestions</div>
                      <div className="text-xl font-bold text-viral-purple">5 Tips</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Content Creation Strategy
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform analyzes your videos and provides actionable suggestions to maximize engagement and virality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Our algorithms analyze your videos against trending content to identify optimization opportunities that increase virality potential.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Platform-Specific Tips</h3>
              <p className="text-muted-foreground">
                Get tailored recommendations for each platform including TikTok, YouTube, Instagram Reels, and Facebook to maximize your reach.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Metrics</h3>
              <p className="text-muted-foreground">
                Track your progress with detailed metrics on engagement, retention, and shareability to understand what works for your audience.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Actionable Suggestions</h3>
              <p className="text-muted-foreground">
                Receive specific, easy-to-implement recommendations to improve your videos and boost their viral potential.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Audience Insights</h3>
              <p className="text-muted-foreground">
                Understand what keeps your audience engaged and how to create content that resonates with your specific viewers.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-viral-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trend Detection</h3>
              <p className="text-muted-foreground">
                Stay ahead of the curve with insights on emerging trends and content formats that are gaining traction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Content Creators
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of creators who have transformed their content strategy with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mr-4">
                  <span className="text-viral-purple font-bold">JD</span>
                </div>
                <div>
                  <div className="font-bold">Jessica Davis</div>
                  <div className="text-sm text-muted-foreground">Travel Vlogger</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Since using ViralVideoWhisperer, my average view count has increased by 300%. The platform helped me identify exactly what was missing from my travel videos to make them more engaging."
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mr-4">
                  <span className="text-viral-purple font-bold">MK</span>
                </div>
                <div>
                  <div className="font-bold">Marcus Kim</div>
                  <div className="text-sm text-muted-foreground">TikTok Creator</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I went from 5K to 500K followers in just 3 months using the suggestions from this platform. The platform-specific tips for TikTok were especially valuable for my growth."
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-viral-light-purple flex items-center justify-center mr-4">
                  <span className="text-viral-purple font-bold">AP</span>
                </div>
                <div>
                  <div className="font-bold">Alicia Peters</div>
                  <div className="text-sm text-muted-foreground">YouTube Educator</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As an educational content creator, I was struggling to make my videos engaging. The insights from ViralVideoWhisperer helped me restructure my content to be both informative and entertaining."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-viral-purple text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Viral Content?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of content creators who are using our AI-powered platform to increase their reach and engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="default"
              className="bg-white text-viral-purple hover:bg-gray-100"
              onClick={handleGetStarted}
            >
              Get Started Free
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

export default Home;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    description: "Get started with basic video analysis",
    price: "$0",
    duration: "forever",
    features: [
      { text: "3 video analyses per month", included: true },
      { text: "Basic virality suggestions", included: true },
      { text: "Platform-specific optimizations", included: true },
      { text: "Video history (30 days)", included: true },
      { text: "Priority analysis", included: false },
      { text: "Advanced metrics breakdown", included: false },
      { text: "Trend analysis", included: false },
      { text: "24/7 priority support", included: false },
    ],
    mostPopular: false,
    cta: "Get Started",
  },
  {
    name: "Creator",
    description: "Perfect for emerging content creators",
    price: "$19",
    duration: "per month",
    features: [
      { text: "20 video analyses per month", included: true },
      { text: "Enhanced virality suggestions", included: true },
      { text: "Platform-specific optimizations", included: true },
      { text: "Video history (90 days)", included: true },
      { text: "Priority analysis", included: true },
      { text: "Advanced metrics breakdown", included: true },
      { text: "Trend analysis", included: false },
      { text: "24/7 priority support", included: false },
    ],
    mostPopular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "For serious content creators and teams",
    price: "$49",
    duration: "per month",
    features: [
      { text: "Unlimited video analyses", included: true },
      { text: "Premium virality suggestions", included: true },
      { text: "Platform-specific optimizations", included: true },
      { text: "Unlimited video history", included: true },
      { text: "Priority analysis", included: true },
      { text: "Advanced metrics breakdown", included: true },
      { text: "Trend analysis", included: true },
      { text: "24/7 priority support", included: true },
    ],
    mostPopular: false,
    cta: "Start Free Trial",
  },
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string) => {
    if (isAuthenticated) {
      // In a real app, this would navigate to a checkout page or show a checkout modal
      alert(`You selected the ${planName} plan. This would redirect to checkout in a real app.`);
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that best fits your content creation needs
        </p>
        
        <div className="flex items-center justify-center mt-8">
          <div className="bg-accent rounded-lg p-1 inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === "monthly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === "yearly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
              <span className="ml-1 text-xs font-normal text-viral-purple">
                (Save 20%)
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${
              plan.mostPopular ? "border-viral-purple shadow-lg" : ""
            }`}
          >
            {plan.mostPopular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-viral-purple text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {billingPeriod === "yearly" 
                    ? plan.price === "$0" 
                      ? "$0" 
                      : `$${parseInt(plan.price.substring(1)) * 0.8 * 12}`
                    : plan.price}
                </span>
                <span className="text-muted-foreground ml-2">
                  {plan.price === "$0" 
                    ? "forever" 
                    : billingPeriod === "yearly" 
                      ? "per year" 
                      : "per month"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.mostPopular 
                    ? "bg-viral-purple hover:bg-viral-dark-purple" 
                    : ""
                }`}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6 text-left">
          <div>
            <h3 className="text-lg font-medium mb-2">Can I switch between plans?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the beginning of your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes, both our Creator and Professional plans come with a 14-day free trial, no credit card required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and Apple Pay.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Can I get a refund if I'm not satisfied?</h3>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee if you're not completely satisfied with our service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Do you offer discounts for teams?</h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for teams of 5 or more. Please contact our sales team for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

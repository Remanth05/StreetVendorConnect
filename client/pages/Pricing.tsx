import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  X,
  Star,
  Users,
  Package,
  TrendingUp,
  Shield,
  Headphones,
  Zap,
  Crown,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  limitations: string[];
  ideal: string;
  savings: string;
  color: string;
}

const clientPlans: PricingPlan[] = [
  {
    id: "client-free",
    name: "Basic",
    description: "Perfect for getting started with supplier connections",
    price: 0,
    period: "Forever",
    features: [
      "Access to verified suppliers",
      "Basic search and filters",
      "Up to 5 supplier contacts per month",
      "Join existing group orders",
      "Basic order tracking",
      "Email support",
    ],
    limitations: [
      "Limited supplier details",
      "No priority support",
      "No bulk discount negotiations",
    ],
    ideal: "Small vendors just starting out",
    savings: "Save up to 10% on purchases",
    color: "border-gray-200",
  },
  {
    id: "client-pro",
    name: "Professional",
    description:
      "For growing businesses that need better supplier relationships",
    price: 999,
    period: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Unlimited supplier contacts",
      "Advanced search and analytics",
      "Create and organize group orders",
      "Priority customer support",
      "Bulk order discounts",
      "Supplier rating and reviews",
      "Order history and insights",
      "Mobile app access",
    ],
    limitations: [],
    ideal: "Established food vendors and restaurants",
    savings: "Save up to 25% on purchases",
    color: "border-brand-green",
  },
  {
    id: "client-enterprise",
    name: "Enterprise",
    description: "For large operations with complex supply chain needs",
    price: 2499,
    period: "month",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom supplier network",
      "API access for integration",
      "Advanced analytics and reporting",
      "White-label solutions",
      "Priority supplier partnerships",
      "Custom contract negotiations",
      "24/7 phone support",
    ],
    limitations: [],
    ideal: "Large restaurant chains and food distributors",
    savings: "Save up to 35% on purchases",
    color: "border-brand-orange",
  },
];

const supplierPlans: PricingPlan[] = [
  {
    id: "supplier-free",
    name: "Starter",
    description: "Great for suppliers new to the platform",
    price: 0,
    period: "Forever",
    features: [
      "Basic supplier profile",
      "List up to 10 products",
      "Receive customer inquiries",
      "Basic order management",
      "Email notifications",
      "Standard support",
    ],
    limitations: [
      "Limited product listings",
      "No featured placement",
      "Basic analytics only",
    ],
    ideal: "New suppliers testing the platform",
    savings: "5% platform fee on orders",
    color: "border-gray-200",
  },
  {
    id: "supplier-business",
    name: "Business",
    description: "For established suppliers ready to grow their business",
    price: 1499,
    period: "month",
    popular: true,
    features: [
      "Everything in Starter",
      "Unlimited product listings",
      "Featured placement in search",
      "Advanced order management",
      "Customer analytics and insights",
      "Priority support",
      "Group order creation tools",
      "Bulk pricing management",
      "Mobile app access",
    ],
    limitations: [],
    ideal: "Growing suppliers with regular customers",
    savings: "3% platform fee on orders",
    color: "border-brand-green",
  },
  {
    id: "supplier-premium",
    name: "Premium",
    description: "For large suppliers dominating their market",
    price: 3999,
    period: "month",
    features: [
      "Everything in Business",
      "Premium badge and verification",
      "Top placement in all searches",
      "Dedicated account manager",
      "API access for inventory sync",
      "Advanced reporting and analytics",
      "Custom branding options",
      "Direct customer relationship tools",
      "24/7 priority support",
    ],
    limitations: [],
    ideal: "Large suppliers and wholesalers",
    savings: "2% platform fee on orders",
    color: "border-brand-orange",
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(
    user?.type === "supplier" ? "suppliers" : "clients",
  );
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const getPlans = () => {
    return selectedTab === "clients" ? clientPlans : supplierPlans;
  };

  const getDiscountedPrice = (price: number) => {
    return billingPeriod === "yearly" ? Math.round(price * 0.8) : price;
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    if (!user) {
      alert("Please sign in to select a plan");
      return;
    }

    if (plan.price === 0) {
      alert(
        `You're already on the ${plan.name} plan! Start exploring the platform.`,
      );
    } else {
      alert(
        `Plan selection: ${plan.name} - ₹${getDiscountedPrice(plan.price)}/${billingPeriod === "yearly" ? "year" : "month"}. Our team will contact you to complete the setup.`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business needs. No hidden fees, no
            surprises.
          </p>

          {/* User Type Toggle */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="mb-8"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="clients">For Buyers</TabsTrigger>
              <TabsTrigger value="suppliers">For Suppliers</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${billingPeriod === "monthly" ? "text-gray-900 font-medium" : "text-gray-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingPeriod(
                  billingPeriod === "monthly" ? "yearly" : "monthly",
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingPeriod === "yearly" ? "bg-brand-green" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${billingPeriod === "yearly" ? "text-gray-900 font-medium" : "text-gray-500"}`}
            >
              Yearly
            </span>
            {billingPeriod === "yearly" && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <TabsContent value={selectedTab}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {getPlans().map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-2 ${plan.color} ${
                  plan.popular ? "shadow-2xl scale-105" : "shadow-lg"
                } transition-all hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-green text-white px-4 py-2">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 min-h-12">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹
                        {plan.price === 0
                          ? "0"
                          : getDiscountedPrice(plan.price).toLocaleString()}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 ml-2">
                          /{billingPeriod === "yearly" ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    {billingPeriod === "yearly" && plan.price > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="line-through">
                          ₹{(plan.price * 12).toLocaleString()}
                        </span>
                        <span className="text-green-600 ml-2 font-medium">
                          Save ₹{(plan.price * 12 * 0.2).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">
                      {plan.savings}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      vs. traditional sourcing
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Perfect for:
                      </div>
                      <div className="text-sm text-gray-600">{plan.ideal}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-3">
                        What's included:
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          Limitations:
                        </div>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <X className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-500">
                                {limitation}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Button
                    className={`w-full mt-6 ${
                      plan.popular
                        ? "bg-brand-green hover:bg-brand-green-dark"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.price === 0 ? "Get Started Free" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Features Comparison */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-center">
              See what's included in each plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Features</th>
                    {getPlans().map((plan) => (
                      <th
                        key={plan.id}
                        className="text-center py-4 px-4 min-w-32"
                      >
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-sm text-gray-500">
                          ₹
                          {plan.price === 0
                            ? "0"
                            : getDiscountedPrice(plan.price).toLocaleString()}
                          {plan.price > 0 &&
                            `/${billingPeriod === "yearly" ? "yr" : "mo"}`}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Supplier Access",
                    "Product Listings",
                    "Order Management",
                    "Customer Support",
                    "Analytics & Insights",
                    "Mobile App Access",
                    "API Access",
                    "Dedicated Account Manager",
                  ].map((feature) => (
                    <tr key={feature} className="border-b">
                      <td className="py-3 px-4 font-medium">{feature}</td>
                      {getPlans().map((plan, index) => (
                        <td key={plan.id} className="py-3 px-4 text-center">
                          {index === 0 ? (
                            feature === "Supplier Access" ||
                            feature === "Product Listings" ||
                            feature === "Order Management" ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            )
                          ) : index === 1 ? (
                            feature === "API Access" ||
                            feature === "Dedicated Account Manager" ? (
                              <X className="h-5 w-5 text-gray-300 mx-auto" />
                            ) : (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            )
                          ) : (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    Can I change plans anytime?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Yes! You can upgrade or downgrade your plan at any time.
                    Changes take effect immediately.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    What payment methods do you accept?
                  </h4>
                  <p className="text-sm text-gray-600">
                    We accept all major credit cards, debit cards, UPI, and bank
                    transfers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
                  <p className="text-sm text-gray-600">
                    No setup fees! You only pay the monthly or yearly
                    subscription cost.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                  <p className="text-sm text-gray-600">
                    Yes, we offer a 30-day money-back guarantee for all paid
                    plans.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Can I get a custom plan?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Absolutely! Contact us for enterprise-level custom solutions
                    tailored to your needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How does billing work?</h4>
                  <p className="text-sm text-gray-600">
                    Billing is automatic and processed monthly or yearly based
                    on your chosen plan.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-brand-green to-brand-green-dark text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your supply chain?
            </h3>
            <p className="text-green-100 mb-6">
              Join thousands of businesses already saving money and time with
              StreetVendor Connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-brand-green hover:bg-gray-100"
                onClick={() => {
                  if (!user) {
                    alert("Please sign in to start your free trial");
                  } else {
                    alert(
                      "Great! Your free trial is already active. Start exploring the platform!",
                    );
                  }
                }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green"
                onClick={() => {
                  const whatsappUrl = `https://wa.me/919876543214?text=${encodeURIComponent("Hi, I have questions about StreetVendor Connect pricing plans.")}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                Talk to Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

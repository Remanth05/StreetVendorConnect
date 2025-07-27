import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  TrendingDown,
  Truck,
  Star,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  CreditCard,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-green to-brand-green-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-brand-orange mb-6 text-white">
                Trusted by 10,000+ Street Vendors
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Connect with{" "}
                <span className="text-brand-yellow">Trusted Suppliers</span> in
                Your Area
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Stop overpaying middlemen. Get fresh, quality raw materials
                directly from verified local suppliers with group discounts and
                AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/suppliers">
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white"
                  >
                    Find Suppliers Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/demo');
                        const data = await response.json();
                        alert(`Demo API Response: ${data.message}`);
                      } catch (error) {
                        console.error('Demo API failed:', error);
                        alert('Demo API failed');
                      }
                    }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Watch Demo
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-8 text-green-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-yellow" />
                  <span>No Registration Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-yellow" />
                  <span>Same Day Delivery</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Search</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search vegetables, spices, packaging..."
                      className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-200"
                    />
                    <Button
                      className="bg-brand-orange hover:bg-brand-orange-dark"
                      onClick={() => {
                        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                        const searchTerm = input?.value || '';
                        if (searchTerm) {
                          alert(`Searching for: ${searchTerm}`);
                        } else {
                          alert('Please enter a search term');
                        }
                      }}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Tomatoes", "Onions", "Spices", "Packaging", "Oil"].map(
                      (item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30"
                        >
                          {item}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Source Smartly
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From verified suppliers to AI recommendations, we've built
              everything to make your sourcing easier, cheaper, and more
              reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Verified Suppliers
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All suppliers are verified through crowdsourced reviews and
                  quality checks. No more worrying about reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Group Buying Power
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join other vendors in your area for bulk orders and get
                  discounts up to 30% off regular prices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingDown className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  AI Price Insights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get smart recommendations on the best prices, seasonal
                  alternatives, and market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Real-time Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your orders from confirmation to delivery with live
                  updates and notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Rating System</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rate suppliers and see reviews from other vendors to make
                  informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Hyperlocal Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find suppliers within your delivery radius for fresher
                  products and lower delivery costs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                10,000+
              </div>
              <div className="text-green-100">Active Vendors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                5,000+
              </div>
              <div className="text-green-100">Verified Suppliers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                30%
              </div>
              <div className="text-green-100">Average Savings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-yellow mb-2">
                24hr
              </div>
              <div className="text-green-100">Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                1. Search & Compare
              </h3>
              <p className="text-gray-600">
                Search for raw materials, compare prices from multiple verified
                suppliers in your area.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                2. Join Group Orders
              </h3>
              <p className="text-gray-600">
                Join existing group orders or create new ones to get bulk
                discounts with other vendors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Track & Receive</h3>
              <p className="text-gray-600">
                Place your order, track delivery in real-time, and receive fresh
                quality materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of vendors who are already saving money and time with
            StreetVendor Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/suppliers">
              <Button
                size="lg"
                className="bg-white text-brand-orange hover:bg-gray-100"
              >
                Start Sourcing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-orange"
              onClick={() => {
                alert('Contact Sales: Call us at +1-800-VENDORS or email sales@streetvendorconnect.com');
              }}
            >
              Contact Sales
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8 text-orange-200">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              <span>Mobile App</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>Multiple Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Truck,
  Filter,
  Phone,
  CheckCircle,
} from "lucide-react";

// Mock data for suppliers
const suppliers = [
  {
    id: 1,
    name: "Fresh Veggie Hub",
    category: "Vegetables",
    location: "Andheri West, Mumbai",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 156,
    deliveryTime: "2-4 hours",
    minOrder: "₹500",
    verified: true,
    image: "/placeholder.svg",
    specialties: ["Organic", "Fresh Daily", "Bulk Orders"],
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Spice Masters",
    category: "Spices",
    location: "Bandra East, Mumbai",
    distance: "3.1 km",
    rating: 4.9,
    reviews: 203,
    deliveryTime: "1-3 hours",
    minOrder: "₹300",
    verified: true,
    image: "/placeholder.svg",
    specialties: ["Premium Quality", "Wholesale", "Custom Blends"],
    contact: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Packaging Pro",
    category: "Packaging",
    location: "Malad West, Mumbai",
    distance: "4.2 km",
    rating: 4.6,
    reviews: 89,
    deliveryTime: "4-6 hours",
    minOrder: "₹1000",
    verified: true,
    image: "/placeholder.svg",
    specialties: ["Eco-Friendly", "Custom Sizes", "Bulk Discount"],
    contact: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Oil Express",
    category: "Cooking Oil",
    location: "Kandivali East, Mumbai",
    distance: "5.8 km",
    rating: 4.7,
    reviews: 124,
    deliveryTime: "2-5 hours",
    minOrder: "₹800",
    verified: true,
    image: "/placeholder.svg",
    specialties: ["Pure Quality", "Fast Delivery", "Competitive Prices"],
    contact: "+91 98765 43213",
  },
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("distance");

  const categories = [
    "All",
    "Vegetables",
    "Spices",
    "Packaging",
    "Cooking Oil",
    "Dairy",
    "Grains",
  ];

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Suppliers
          </h1>
          <p className="text-gray-600">
            Connect with verified suppliers in your area for the best deals
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search suppliers, products, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="distance">Nearest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="delivery">Fastest Delivery</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && (
                            <CheckCircle className="h-4 w-4 text-brand-green" />
                          )}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {supplier.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {supplier.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({supplier.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {supplier.location} • {supplier.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Delivery: {supplier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>Min Order: {supplier.minOrder}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {supplier.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{supplier.contact}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-brand-green hover:bg-brand-green-dark"
                        >
                          Contact Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No suppliers found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or explore different
                categories.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-brand-green to-brand-green-dark text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-green-100 mb-6">
              Request quotes from multiple suppliers or let us help you find the
              perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-orange hover:bg-brand-orange-dark">
                Request Custom Quote
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

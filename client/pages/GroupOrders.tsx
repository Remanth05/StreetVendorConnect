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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Clock,
  DollarSign,
  Package,
  Star,
  MapPin,
  TrendingDown,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Calendar,
  Truck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface GroupOrder {
  id: string;
  title: string;
  description: string;
  category: string;
  organizer: string;
  organizerRating: number;
  currentParticipants: number;
  maxParticipants: number;
  minOrder: number;
  currentTotal: number;
  targetAmount: number;
  savings: number;
  deadline: string;
  deliveryDate: string;
  location: string;
  status: "open" | "filling" | "closed" | "completed";
  image: string;
  products: string[];
  pricePerUnit: number;
  unit: string;
}

const mockGroupOrders: GroupOrder[] = [
  {
    id: "GRP-001",
    title: "Bulk Fresh Vegetables Order",
    description:
      "High-quality fresh vegetables for restaurants and food vendors. Sourced directly from farms.",
    category: "Vegetables",
    organizer: "Fresh Veggie Hub",
    organizerRating: 4.8,
    currentParticipants: 8,
    maxParticipants: 15,
    minOrder: 10,
    currentTotal: 180,
    targetAmount: 300,
    savings: 25,
    deadline: "2024-01-25",
    deliveryDate: "2024-01-27",
    location: "Andheri West, Mumbai",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
    products: ["Tomatoes", "Onions", "Potatoes", "Carrots", "Leafy Greens"],
    pricePerUnit: 15,
    unit: "kg",
  },
  {
    id: "GRP-002",
    title: "Premium Spice Mix Collection",
    description:
      "Authentic Indian spice mixes for commercial kitchens. Premium quality guaranteed.",
    category: "Spices",
    organizer: "Spice Masters",
    organizerRating: 4.9,
    currentParticipants: 12,
    maxParticipants: 20,
    minOrder: 5,
    currentTotal: 85,
    targetAmount: 100,
    savings: 20,
    deadline: "2024-01-22",
    deliveryDate: "2024-01-24",
    location: "Bandra East, Mumbai",
    status: "filling",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
    products: ["Garam Masala", "Turmeric", "Red Chili", "Cumin", "Coriander"],
    pricePerUnit: 120,
    unit: "pack",
  },
  {
    id: "GRP-003",
    title: "Eco-Friendly Packaging Supplies",
    description:
      "Sustainable packaging solutions for food vendors. Biodegradable and eco-friendly options.",
    category: "Packaging",
    organizer: "Packaging Pro",
    organizerRating: 4.6,
    currentParticipants: 15,
    maxParticipants: 15,
    minOrder: 100,
    currentTotal: 1500,
    targetAmount: 1500,
    savings: 30,
    deadline: "2024-01-20",
    deliveryDate: "2024-01-22",
    location: "Malad West, Mumbai",
    status: "closed",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    products: ["Food Containers", "Paper Bags", "Labels", "Wrapping Paper"],
    pricePerUnit: 8,
    unit: "pieces",
  },
  {
    id: "GRP-004",
    title: "Cooking Oil Bulk Purchase",
    description:
      "High-quality cooking oils for commercial use. Various types available.",
    category: "Oil",
    organizer: "Oil Express",
    organizerRating: 4.7,
    currentParticipants: 6,
    maxParticipants: 12,
    minOrder: 20,
    currentTotal: 140,
    targetAmount: 240,
    savings: 18,
    deadline: "2024-01-28",
    deliveryDate: "2024-01-30",
    location: "Kandivali East, Mumbai",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
    products: ["Sunflower Oil", "Mustard Oil", "Coconut Oil", "Sesame Oil"],
    pricePerUnit: 180,
    unit: "liter",
  },
];

export default function GroupOrders() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<GroupOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = [
    "All",
    "Vegetables",
    "Spices",
    "Packaging",
    "Oil",
    "Dairy",
    "Grains",
  ];
  const statuses = ["All", "open", "filling", "closed"];

  const filteredOrders = mockGroupOrders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || order.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "filling":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open for Joining";
      case "filling":
        return "Almost Full";
      case "closed":
        return "Order Closed";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const joinGroupOrder = (order: GroupOrder, quantity: number) => {
    if (!user) {
      alert("Please sign in to join group orders");
      return;
    }

    if (order.status !== "open") {
      alert("This group order is no longer accepting participants");
      return;
    }

    alert(
      `Successfully joined "${order.title}" with quantity: ${quantity} ${order.unit}. You'll receive updates on your dashboard.`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Group Orders
              </h1>
              <p className="text-gray-600">
                Join group purchases to save money and get better deals on bulk
                orders
              </p>
            </div>
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="bg-brand-green hover:bg-brand-green-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Group Order</DialogTitle>
                  <DialogDescription>
                    Start a new group order to get better prices for bulk
                    purchases
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Product/Service
                    </label>
                    <Input placeholder="e.g., Fresh Vegetables, Spice Mix" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Target Quantity
                    </label>
                    <Input placeholder="e.g., 500 kg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deadline</label>
                    <Input type="date" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        alert(
                          "Group order request submitted! We'll help you set it up and find participants.",
                        );
                        setShowCreateModal(false);
                      }}
                      className="flex-1"
                    >
                      Submit Request
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      mockGroupOrders.filter(
                        (o) => o.status === "open" || o.status === "filling",
                      ).length
                    }
                  </p>
                </div>
                <Package className="h-8 w-8 text-brand-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockGroupOrders.reduce(
                      (sum, order) => sum + order.currentParticipants,
                      0,
                    )}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(
                      mockGroupOrders.reduce(
                        (sum, order) => sum + order.savings,
                        0,
                      ) / mockGroupOrders.length,
                    )}
                    %
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-brand-orange">
                    {new Set(mockGroupOrders.map((o) => o.category)).size}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-brand-orange" />
              </div>
            </CardContent>
          </Card>
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
                    placeholder="Search group orders..."
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

              {/* Status Filter */}
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className="whitespace-nowrap capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {order.title}
                          </h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {order.savings}% OFF
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {order.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {order.currentParticipants}/{order.maxParticipants}{" "}
                        participants
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-brand-green h-2 rounded-full transition-all"
                        style={{
                          width: `${(order.currentParticipants / order.maxParticipants) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>
                          ₹{order.pricePerUnit}/{order.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>
                          Min: {order.minOrder} {order.unit}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Ends {new Date(order.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>
                          Delivery{" "}
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">by</span>
                      <span className="font-medium">{order.organizer}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs">{order.organizerRating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green-dark"
                        disabled={order.status !== "open"}
                        onClick={() => {
                          const quantity = prompt(
                            `How many ${order.unit} would you like to order? (Min: ${order.minOrder})`,
                          );
                          if (
                            quantity &&
                            parseInt(quantity) >= order.minOrder
                          ) {
                            joinGroupOrder(order, parseInt(quantity));
                          } else if (quantity) {
                            alert(
                              `Minimum order is ${order.minOrder} ${order.unit}`,
                            );
                          }
                        }}
                      >
                        {order.status === "open"
                          ? "Join Order"
                          : order.status === "filling"
                            ? "Almost Full"
                            : "Closed"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Details Modal */}
        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <DialogContent className="max-w-2xl">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedOrder.title}</DialogTitle>
                  <DialogDescription>
                    Organized by {selectedOrder.organizer}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Order Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Category: {selectedOrder.category}</div>
                        <div>
                          Price: ₹{selectedOrder.pricePerUnit} per{" "}
                          {selectedOrder.unit}
                        </div>
                        <div>
                          Min Order: {selectedOrder.minOrder}{" "}
                          {selectedOrder.unit}
                        </div>
                        <div>Savings: {selectedOrder.savings}%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Timeline</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          Deadline:{" "}
                          {new Date(
                            selectedOrder.deadline,
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          Delivery:{" "}
                          {new Date(
                            selectedOrder.deliveryDate,
                          ).toLocaleDateString()}
                        </div>
                        <div>Location: {selectedOrder.location}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Available Products</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedOrder.products.map((product) => (
                        <div
                          key={product}
                          className="p-2 bg-gray-50 rounded text-sm text-center"
                        >
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.description}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1 bg-brand-green hover:bg-brand-green-dark"
                      disabled={selectedOrder.status !== "open"}
                      onClick={() => {
                        const quantity = prompt(
                          `How many ${selectedOrder.unit} would you like to order? (Min: ${selectedOrder.minOrder})`,
                        );
                        if (
                          quantity &&
                          parseInt(quantity) >= selectedOrder.minOrder
                        ) {
                          joinGroupOrder(selectedOrder, parseInt(quantity));
                          setSelectedOrder(null);
                        } else if (quantity) {
                          alert(
                            `Minimum order is ${selectedOrder.minOrder} ${selectedOrder.unit}`,
                          );
                        }
                      }}
                    >
                      {selectedOrder.status === "open"
                        ? "Join This Order"
                        : "Order Closed"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const message = `Hi, I'm interested in the group order: ${selectedOrder.title}. Can you provide more details?`;
                        const whatsappUrl = `https://wa.me/919876543214?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, "_blank");
                      }}
                    >
                      Contact Organizer
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-brand-green to-brand-green-dark text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Want to organize your own group order?
            </h3>
            <p className="text-green-100 mb-6">
              Create a group order and let others join to get better wholesale
              prices for everyone.
            </p>
            <Button
              className="bg-brand-orange hover:bg-brand-orange-dark"
              onClick={() => setShowCreateModal(true)}
            >
              Start Group Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

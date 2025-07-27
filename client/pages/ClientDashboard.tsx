import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Package,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  items: string[];
  total: number;
  status: "pending" | "confirmed" | "delivered";
  date: string;
  supplier: string;
}

interface GroupOrder {
  id: string;
  title: string;
  participants: number;
  savings: number;
  deadline: string;
  status: "open" | "closed" | "delivered";
}

export default function ClientDashboard() {
  const { user } = useAuth();

  // Mock data for client dashboard
  const recentOrders: Order[] = [
    {
      id: "ORD-001",
      items: ["Tomatoes (5kg)", "Onions (3kg)", "Spices Mix"],
      total: 45.5,
      status: "delivered",
      date: "2024-01-15",
      supplier: "Fresh Produce Co.",
    },
    {
      id: "ORD-002",
      items: ["Packaging Boxes (100)", "Labels"],
      total: 28.75,
      status: "confirmed",
      date: "2024-01-14",
      supplier: "Supply Plus",
    },
    {
      id: "ORD-003",
      items: ["Rice (10kg)", "Oil (2L)"],
      total: 62.3,
      status: "pending",
      date: "2024-01-13",
      supplier: "Bulk Foods Ltd",
    },
  ];

  const activeGroupOrders: GroupOrder[] = [
    {
      id: "GRP-001",
      title: "Bulk Vegetables Order",
      participants: 8,
      savings: 15,
      deadline: "2024-01-20",
      status: "open",
    },
    {
      id: "GRP-002",
      title: "Packaging Supplies",
      participants: 12,
      savings: 22,
      deadline: "2024-01-18",
      status: "closed",
    },
  ];

  const stats = {
    totalOrders: 23,
    totalSavings: 245.8,
    activeGroups: 3,
    monthlySpend: 1250.5,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user || user.type !== "client") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            This page is only accessible to clients.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your orders, join group purchases, and track your savings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-brand-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${stats.totalSavings}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Groups</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.activeGroups}
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
                  <p className="text-sm text-gray-600">Monthly Spend</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats.monthlySpend}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-brand-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Recent Orders
              </CardTitle>
              <CardDescription>Your latest purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {order.id}
                          </span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {order.items.join(", ")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.supplier} •{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${order.total}
                        </div>
                        <Button variant="outline" size="sm" className="mt-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Group Orders
              </CardTitle>
              <CardDescription>
                Join group purchases for better prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeGroupOrders.map((group) => (
                  <div
                    key={group.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {group.title}
                          </span>
                          <Badge className={getStatusColor(group.status)}>
                            {group.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {group.participants} participants • {group.savings}%
                          savings
                        </div>
                        <div className="text-xs text-gray-500">
                          Deadline:{" "}
                          {new Date(group.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Button size="sm" disabled={group.status === "closed"}>
                          {group.status === "open" ? "Join" : "Joined"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/group-orders">
                  <Button className="w-full">Browse All Group Orders</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/suppliers">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  Find Suppliers
                </Button>
              </Link>
              <Link to="/group-orders">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Join Group Order
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex-col">
                <Clock className="h-6 w-6 mb-2" />
                Order History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

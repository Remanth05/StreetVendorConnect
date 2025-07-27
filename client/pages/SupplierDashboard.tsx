import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, Users, TrendingUp, Eye, MessageSquare, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  orders: number;
}

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export default function SupplierDashboard() {
  const { user } = useAuth();

  // Mock data for supplier dashboard
  const products: Product[] = [
    {
      id: 'PROD-001',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 3.50,
      unit: 'per kg',
      stock: 250,
      orders: 45
    },
    {
      id: 'PROD-002',
      name: 'Red Onions',
      category: 'Vegetables',
      price: 2.20,
      unit: 'per kg',
      stock: 180,
      orders: 32
    },
    {
      id: 'PROD-003',
      name: 'Spice Mix',
      category: 'Spices',
      price: 8.90,
      unit: 'per pack',
      stock: 75,
      orders: 18
    },
    {
      id: 'PROD-004',
      name: 'Packaging Boxes',
      category: 'Supplies',
      price: 0.45,
      unit: 'per piece',
      stock: 500,
      orders: 89
    }
  ];

  const recentOrders: Order[] = [
    {
      id: 'ORD-101',
      customer: 'John Client',
      items: ['Tomatoes (5kg)', 'Onions (3kg)'],
      total: 24.10,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD-102',
      customer: 'Sarah Vendor',
      items: ['Spice Mix (3 packs)', 'Packaging Boxes (50)'],
      total: 49.20,
      status: 'confirmed',
      date: '2024-01-14'
    },
    {
      id: 'ORD-103',
      customer: 'Mike Vendor',
      items: ['Tomatoes (10kg)', 'Onions (5kg)'],
      total: 46.00,
      status: 'shipped',
      date: '2024-01-13'
    }
  ];

  const stats = {
    totalRevenue: 5420.80,
    totalOrders: 156,
    activeProducts: 24,
    avgOrderValue: 34.75
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock < 50) return { color: 'text-red-600', label: 'Low Stock' };
    if (stock < 100) return { color: 'text-yellow-600', label: 'Medium Stock' };
    return { color: 'text-green-600', label: 'In Stock' };
  };

  if (!user || user.type !== 'supplier') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to suppliers.</p>
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
            Supplier Dashboard - {user.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your products, track orders, and grow your business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-brand-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-brand-orange">${stats.avgOrderValue}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-brand-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Your Products
                  </CardTitle>
                  <CardDescription>
                    Manage your product inventory
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <div key={product.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{product.name}</span>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            ${product.price} {product.unit} • {product.orders} orders
                          </div>
                          <div className={`text-xs ${stockStatus.color}`}>
                            {product.stock} units • {stockStatus.label}
                          </div>
                        </div>
                        <div className="text-right space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                Orders from your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {order.items.join(', ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${order.total}</div>
                        <div className="space-x-1 mt-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
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
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your supplier account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Add Product
              </Button>
              <Button variant="outline" className="w-full h-20 flex-col">
                <Package className="h-6 w-6 mb-2" />
                Update Inventory
              </Button>
              <Button variant="outline" className="w-full h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                View Customers
              </Button>
              <Button variant="outline" className="w-full h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                Sales Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

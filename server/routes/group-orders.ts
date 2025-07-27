import { RequestHandler } from "express";

export interface GroupOrder {
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

export interface GroupOrdersResponse {
  groupOrders: GroupOrder[];
  total: number;
}

export interface JoinOrderRequest {
  groupOrderId: string;
  quantity: number;
  userEmail: string;
}

// Mock group orders data
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

export const handleGetGroupOrders: RequestHandler = (req, res) => {
  const { category, status, search } = req.query;

  let filteredOrders = [...mockGroupOrders];

  // Filter by category
  if (category && category !== "All") {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.category.toLowerCase() === (category as string).toLowerCase(),
    );
  }

  // Filter by status
  if (status && status !== "All") {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  // Filter by search term
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.title.toLowerCase().includes(searchTerm) ||
        order.category.toLowerCase().includes(searchTerm) ||
        order.organizer.toLowerCase().includes(searchTerm),
    );
  }

  const response: GroupOrdersResponse = {
    groupOrders: filteredOrders,
    total: filteredOrders.length,
  };

  res.json(response);
};

export const handleGetGroupOrderById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const groupOrder = mockGroupOrders.find((order) => order.id === id);

  if (!groupOrder) {
    return res.status(404).json({ error: "Group order not found" });
  }

  res.json({ groupOrder });
};

export const handleJoinGroupOrder: RequestHandler = (req, res) => {
  const { groupOrderId, quantity, userEmail }: JoinOrderRequest = req.body;

  if (!groupOrderId || !quantity || !userEmail) {
    return res.status(400).json({
      error: "Group order ID, quantity, and user email are required",
    });
  }

  const groupOrder = mockGroupOrders.find((order) => order.id === groupOrderId);

  if (!groupOrder) {
    return res.status(404).json({ error: "Group order not found" });
  }

  if (groupOrder.status !== "open") {
    return res.status(400).json({
      error: "This group order is no longer accepting participants",
    });
  }

  if (quantity < groupOrder.minOrder) {
    return res.status(400).json({
      error: `Minimum order is ${groupOrder.minOrder} ${groupOrder.unit}`,
    });
  }

  if (groupOrder.currentParticipants >= groupOrder.maxParticipants) {
    return res.status(400).json({
      error: "This group order is full",
    });
  }

  // In a real app, this would update the database
  // For demo, we'll just return success
  res.json({
    success: true,
    message: `Successfully joined "${groupOrder.title}" with quantity: ${quantity} ${groupOrder.unit}`,
    groupOrder: {
      ...groupOrder,
      currentParticipants: groupOrder.currentParticipants + 1,
      currentTotal: groupOrder.currentTotal + quantity,
    },
  });
};

export const handleCreateGroupOrder: RequestHandler = (req, res) => {
  const { title, description, category, targetQuantity, deadline, userEmail } =
    req.body;

  if (
    !title ||
    !description ||
    !category ||
    !targetQuantity ||
    !deadline ||
    !userEmail
  ) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // In a real app, this would create a new group order in the database
  const newGroupOrder: GroupOrder = {
    id: `GRP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    title,
    description,
    category,
    organizer: userEmail,
    organizerRating: 4.5,
    currentParticipants: 1,
    maxParticipants: 20,
    minOrder: Math.floor(targetQuantity / 20),
    currentTotal: 0,
    targetAmount: targetQuantity,
    savings: 15,
    deadline,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Mumbai",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
    products: ["Mixed Items"],
    pricePerUnit: 50,
    unit: "unit",
  };

  res.json({
    success: true,
    message:
      "Group order created successfully! We will help you find participants.",
    groupOrder: newGroupOrder,
  });
};

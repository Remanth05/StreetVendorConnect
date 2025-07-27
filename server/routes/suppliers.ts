import { RequestHandler } from "express";

export interface Supplier {
  id: number;
  name: string;
  category: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  minOrder: string;
  verified: boolean;
  image: string;
  specialties: string[];
  contact: string;
  description: string;
  products: string[];
}

export interface SuppliersResponse {
  suppliers: Supplier[];
  total: number;
}

// Mock suppliers data
const mockSuppliers: Supplier[] = [
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
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&h=150&fit=crop",
    specialties: ["Organic", "Fresh Daily", "Bulk Orders"],
    contact: "+91 98765 43210",
    description: "Premium fresh vegetables supplier specializing in organic produce for restaurants and food vendors.",
    products: ["Tomatoes", "Onions", "Potatoes", "Leafy Greens", "Bell Peppers"]
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
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150&h=150&fit=crop",
    specialties: ["Premium Quality", "Wholesale", "Custom Blends"],
    contact: "+91 98765 43211",
    description: "Your one-stop destination for authentic spices and custom spice blends.",
    products: ["Turmeric", "Red Chili", "Garam Masala", "Cumin", "Coriander"]
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
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop",
    specialties: ["Eco-Friendly", "Custom Sizes", "Bulk Discount"],
    contact: "+91 98765 43212",
    description: "Eco-friendly packaging solutions for food vendors and small businesses.",
    products: ["Food Containers", "Paper Bags", "Plastic Boxes", "Labels", "Wrapping Paper"]
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
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&h=150&fit=crop",
    specialties: ["Pure Quality", "Fast Delivery", "Competitive Prices"],
    contact: "+91 98765 43213",
    description: "High-quality cooking oils for commercial kitchens and food preparation.",
    products: ["Sunflower Oil", "Mustard Oil", "Coconut Oil", "Olive Oil", "Sesame Oil"]
  }
];

export const handleGetSuppliers: RequestHandler = (req, res) => {
  const { category, search, sortBy } = req.query;
  
  let filteredSuppliers = [...mockSuppliers];
  
  // Filter by category
  if (category && category !== 'All') {
    filteredSuppliers = filteredSuppliers.filter(supplier => 
      supplier.category.toLowerCase() === (category as string).toLowerCase()
    );
  }
  
  // Filter by search term
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredSuppliers = filteredSuppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm) ||
      supplier.category.toLowerCase().includes(searchTerm) ||
      supplier.products.some(product => product.toLowerCase().includes(searchTerm))
    );
  }
  
  // Sort suppliers
  if (sortBy) {
    switch (sortBy) {
      case 'rating':
        filteredSuppliers.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filteredSuppliers.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'distance':
        filteredSuppliers.sort((a, b) => 
          parseFloat(a.distance) - parseFloat(b.distance)
        );
        break;
      default:
        break;
    }
  }
  
  const response: SuppliersResponse = {
    suppliers: filteredSuppliers,
    total: filteredSuppliers.length
  };
  
  res.json(response);
};

export const handleGetSupplierById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const supplier = mockSuppliers.find(s => s.id === parseInt(id));
  
  if (!supplier) {
    return res.status(404).json({ error: 'Supplier not found' });
  }
  
  res.json({ supplier });
};

export const handleContactSupplier: RequestHandler = (req, res) => {
  const { supplierId, message, userEmail } = req.body;
  
  if (!supplierId || !message || !userEmail) {
    return res.status(400).json({ 
      error: 'Supplier ID, message, and user email are required' 
    });
  }
  
  const supplier = mockSuppliers.find(s => s.id === parseInt(supplierId));
  
  if (!supplier) {
    return res.status(404).json({ error: 'Supplier not found' });
  }
  
  // In a real app, this would send an email or notification
  res.json({
    success: true,
    message: `Your message has been sent to ${supplier.name}. They will contact you soon!`
  });
};

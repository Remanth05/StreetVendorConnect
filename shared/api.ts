/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Notification types
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface NotificationsResponse {
  notifications: Notification[];
}

/**
 * Authentication types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  type: 'client' | 'supplier';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

/**
 * Supplier types
 */
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

/**
 * Group Order types
 */
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
  status: 'open' | 'filling' | 'closed' | 'completed';
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

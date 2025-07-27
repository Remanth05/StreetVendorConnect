import { RequestHandler } from "express";

export interface User {
  id: string;
  email: string;
  name: string;
  type: "client" | "supplier";
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

// Demo users for testing
const demoUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "client@demo.com",
    password: "demo123",
    name: "John Client",
    type: "client",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    email: "supplier@demo.com",
    password: "demo123",
    name: "Sarah Supplier",
    type: "supplier",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    email: "vendor@demo.com",
    password: "demo123",
    name: "Mike Vendor",
    type: "supplier",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password }: LoginRequest = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    } as LoginResponse);
  }

  const user = demoUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    } as LoginResponse);
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  const response: LoginResponse = {
    success: true,
    user: userWithoutPassword,
    token: `demo-token-${user.id}`,
    message: "Login successful",
  };

  res.json(response);
};

export const handleGetProfile: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No valid authorization token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  const userId = token.replace("demo-token-", "");

  const user = demoUsers.find((u) => u.id === userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    user: userWithoutPassword,
  });
};

export const handleLogout: RequestHandler = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetNotifications,
  handleMarkNotificationRead,
  handleMarkAllNotificationsRead
} from "./routes/notifications";
import { handleLogin, handleGetProfile, handleLogout } from "./routes/auth";
import {
  handleGetSuppliers,
  handleGetSupplierById,
  handleContactSupplier
} from "./routes/suppliers";
import {
  handleGetGroupOrders,
  handleGetGroupOrderById,
  handleJoinGroupOrder,
  handleCreateGroupOrder
} from "./routes/group-orders";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Notifications API
  app.get("/api/notifications", handleGetNotifications);
  app.put("/api/notifications/:id/read", handleMarkNotificationRead);
  app.put("/api/notifications/mark-all-read", handleMarkAllNotificationsRead);

  // Authentication API
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/profile", handleGetProfile);
  app.post("/api/auth/logout", handleLogout);

  return app;
}

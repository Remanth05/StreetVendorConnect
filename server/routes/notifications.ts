import { RequestHandler } from "express";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Supplier Available',
    message: 'Fresh produce supplier added in your area',
    timestamp: new Date().toISOString(),
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Group Order Complete',
    message: 'Your recent group order has been fulfilled',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    type: 'success'
  },
  {
    id: '3',
    title: 'Payment Reminder',
    message: 'Payment due for order #12345',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
    type: 'warning'
  }
];

export const handleGetNotifications: RequestHandler = (req, res) => {
  res.json({ notifications: mockNotifications });
};

export const handleMarkNotificationRead: RequestHandler = (req, res) => {
  const { id } = req.params;
  const notification = mockNotifications.find(n => n.id === id);
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notification.read = true;
  res.json({ success: true, notification });
};

export const handleMarkAllNotificationsRead: RequestHandler = (req, res) => {
  mockNotifications.forEach(notification => {
    notification.read = true;
  });
  
  res.json({ success: true, notifications: mockNotifications });
};

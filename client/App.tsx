import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Suppliers from "./pages/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/suppliers" element={<PlaceholderPage title="Supplier Directory" description="Find and connect with verified suppliers in your area" />} />
            <Route path="/group-orders" element={<PlaceholderPage title="Group Orders" description="Join group orders for bulk discounts" />} />
            <Route path="/dashboard" element={<PlaceholderPage title="Vendor Dashboard" description="Manage your orders and profile" />} />
            <Route path="/pricing" element={<PlaceholderPage title="Pricing" description="View our pricing plans" />} />
            <Route path="/how-it-works" element={<PlaceholderPage title="How It Works" description="Learn how to use StreetVendor Connect" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="Our privacy policy" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Our terms of service" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

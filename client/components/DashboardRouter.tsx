import { useAuth } from "@/lib/auth-context";
import ClientDashboard from "@/pages/ClientDashboard";
import SupplierDashboard from "@/pages/SupplierDashboard";
import PlaceholderPage from "@/pages/PlaceholderPage";

export function DashboardRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <PlaceholderPage
        title="Please Sign In"
        description="You need to sign in to access your dashboard"
      />
    );
  }

  if (user.type === 'client') {
    return <ClientDashboard />;
  }

  if (user.type === 'supplier') {
    return <SupplierDashboard />;
  }

  return (
    <PlaceholderPage
      title="Unknown User Type"
      description="We couldn't determine your account type"
    />
  );
}

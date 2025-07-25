import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-8 w-8 text-brand-green" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
            
            <div className="bg-brand-yellow/20 border border-brand-yellow/30 rounded-lg p-6 mb-8">
              <p className="text-gray-700">
                This page is coming soon! We're working hard to bring you the best experience. 
                In the meantime, check out our homepage to learn more about StreetVendor Connect.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-brand-green hover:bg-brand-green-dark">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Homepage
                </Button>
              </Link>
              <Button variant="outline">
                Get Notified When Ready
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

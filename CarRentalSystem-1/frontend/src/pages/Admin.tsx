import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ✅ Replace placeholders with real components
import AdminCarManagement from "@/components/admin/AdminCarManagement";
import AdminBookingManagement from "@/components/admin/AdminBookingManagement"; // build next

const ReviewManagement = () => <div>⭐ Review Management Section</div>;
const EmailTesting = () => <div>📧 Email Testing Section</div>;

const Admin = () => {
  useEffect(() => {
    console.log("✅ Admin Dashboard rendered");
  }, []);

  return (
    <MainLayout>
      <div className="bg-rental-background min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-rental-blue mb-6">
            Admin Dashboard
          </h1>

          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="email">Email Testing</TabsTrigger>
            </TabsList>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TabsContent value="cars">
                <AdminCarManagement />
              </TabsContent>

              <TabsContent value="bookings">
                <AdminBookingManagement />
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewManagement />
              </TabsContent>

              <TabsContent value="email">
                <EmailTesting />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;

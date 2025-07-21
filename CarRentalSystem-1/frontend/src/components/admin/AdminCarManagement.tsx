import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ADMIN_HEADERS = {
  adminEmail: "admin@gmail.com",
  adminPassword: "123",
};

interface Car {
  id: number;
  brand: string;
  model: string;
  brandModel: string;
  carType: string;
  fuelType: string;
  pricePerDay: number;
  available: boolean;
  features: string;
  imageUrl: string;
}

const AdminCarManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [adminAction, setAdminAction] = useState("ALL");
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    brandModel: "",
    carType: "",
    fuelType: "",
    pricePerDay: "",
    available: true,
    features: "",
    imageUrl: "", // ✅ Added image URL
  });

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cars/all");
      setCars(res.data);
    } catch (error: any) {
      toast({
        title: "Error fetching cars",
        description: error?.response?.data || error?.message || "Unknown error",
      });
    }
  };

  const resetForm = () => {
    setNewCar({
      brand: "",
      model: "",
      brandModel: "",
      carType: "",
      fuelType: "",
      pricePerDay: "",
      available: true,
      features: "",
      imageUrl: "", // ✅ reset field
    });
    setEditingCarId(null);
  };

  const addCar = async () => {
    try {
      const payload = {
        ...newCar,
        pricePerDay: parseFloat(newCar.pricePerDay),
        brandModel: `${newCar.brand} ${newCar.model}`,
      };

      await axios.post("http://localhost:8080/api/cars/admin/add", payload, {
        headers: ADMIN_HEADERS,
      });

      toast({ title: "✅ Car added successfully!" });
      fetchCars();
      resetForm();
    } catch (error: any) {
      toast({
        title: "❌ Error adding car",
        description: error?.response?.data || error?.message || "Unknown error",
      });
    }
  };

  const updateCar = async () => {
    if (editingCarId === null) return;

    try {
      const payload = {
        ...newCar,
        pricePerDay: parseFloat(newCar.pricePerDay),
        brandModel: `${newCar.brand} ${newCar.model}`,
      };

      await axios.post(
        `http://localhost:8080/api/cars/admin/update/${editingCarId}`,
        payload,
        { headers: ADMIN_HEADERS }
      );

      toast({ title: "✏️ Car updated successfully!" });
      fetchCars();
      resetForm();
    } catch (error: any) {
      toast({
        title: "❌ Error updating car",
        description: error?.response?.data || error?.message || "Unknown error",
      });
    }
  };

  const deleteCar = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/cars/admin/delete/${id}`,
        {},
        { headers: ADMIN_HEADERS }
      );
      toast({ title: "🗑️ Car deleted" });
      fetchCars();
    } catch (error: any) {
      toast({
        title: "❌ Error deleting car",
        description: error?.response?.data?.message || error?.message || "Unknown error",
      });
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🚗 Car Management</h1>

      {/* Admin Action Dropdown */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Admin Action:</label>
        <select
          className="border p-2 rounded"
          value={adminAction}
          onChange={(e) => {
            setAdminAction(e.target.value);
            resetForm();
          }}
        >
          <option value="ALL">All</option>
          <option value="ADD">Add Car</option>
          <option value="UPDATE">Update Car</option>
          <option value="DELETE">Delete Car</option>
        </select>
      </div>

      {/* Add or Update Form */}
      {(adminAction === "ADD" || editingCarId !== null) && (
        <div className="bg-white p-6 rounded shadow mb-10 space-y-4">
          <h2 className="text-xl font-semibold">
            {editingCarId ? "✏️ Update Car" : "➕ Add New Car"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Brand" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
            <Input placeholder="Model" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} />
            <Input placeholder="Car Type" value={newCar.carType} onChange={(e) => setNewCar({ ...newCar, carType: e.target.value })} />
            <Input placeholder="Fuel Type" value={newCar.fuelType} onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })} />
            <Input placeholder="Price Per Day" type="number" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} />
            <Input placeholder="Features (comma separated)" value={newCar.features} onChange={(e) => setNewCar({ ...newCar, features: e.target.value })} />
            <Input placeholder="Image URL" value={newCar.imageUrl} onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button onClick={editingCarId ? updateCar : addCar}>
              {editingCarId ? "Update Car" : "Add Car"}
            </Button>
            {editingCarId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Car List */}
      {(adminAction === "ALL" || adminAction === "DELETE" || adminAction === "UPDATE") && (
        <>
          <h2 className="text-xl font-semibold mb-4">📋 Car List</h2>
          <div className="space-y-4">
            {cars.length === 0 ? (
              <p>No cars available.</p>
            ) : (
              cars.map((car) => (
                <div key={car.id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{car.brandModel} - ₹{car.pricePerDay}/day</p>
                    <p className="text-sm text-gray-600">Type: {car.carType} | Fuel: {car.fuelType} | Available: {car.available ? "Yes" : "No"}</p>
                    <p className="text-sm text-gray-500">Features: {car.features}</p>
                    {car.imageUrl && (
                      <img src={car.imageUrl} alt="Car" className="mt-2 w-32 h-20 object-cover rounded border" />
                    )}
                  </div>
                  <div className="space-x-2">
                    {(adminAction === "DELETE" || adminAction === "ALL") && (
                      <Button variant="destructive" onClick={() => deleteCar(car.id)}>Delete</Button>
                    )}
                    {(adminAction === "UPDATE" || adminAction === "ALL") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setNewCar({
                            brand: car.brand,
                            model: car.model,
                            brandModel: car.brandModel,
                            carType: car.carType,
                            fuelType: car.fuelType,
                            pricePerDay: car.pricePerDay.toString(),
                            available: car.available,
                            features: car.features,
                            imageUrl: car.imageUrl || "",
                          });
                          setEditingCarId(car.id);
                          setAdminAction("UPDATE");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCarManagement;

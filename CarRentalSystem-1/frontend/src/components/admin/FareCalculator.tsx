// src/components/admin/FareCalculator.tsx
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FareCalculator = () => {
  const [carId, setCarId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleEstimate = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/fare/estimate", {
        carId: Number(carId),
        startDate,
        endDate,
      });

      setFare(response.data);
    } catch (err) {
      setFare(null);
      setError("Failed to estimate fare. Please check the input and try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-rental-blue">Fare Estimator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Car ID</Label>
          <Input value={carId} onChange={(e) => setCarId(e.target.value)} type="number" />
        </div>
        <div>
          <Label>Start Date</Label>
          <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" />
        </div>
        <div>
          <Label>End Date</Label>
          <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
        </div>
      </div>

      <Button onClick={handleEstimate}>Estimate Fare</Button>

      {fare !== null && (
        <div className="text-green-700 mt-4 font-medium">
          Estimated Fare: ₹{fare}
        </div>
      )}

      {error && (
        <div className="text-red-600 mt-2">{error}</div>
      )}
    </div>
  );
};

export default FareCalculator;

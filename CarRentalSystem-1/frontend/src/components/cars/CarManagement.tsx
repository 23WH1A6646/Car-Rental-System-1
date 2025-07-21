import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CarManagement = () => {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    carType: '',
    fuelType: '',
    pricePerDay: 0,
    available: true,
    features: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleAddCar = async () => {
    try {
      await axios.post('http://localhost:8080/api/cars/admin/add', carData, {
        headers: {
          adminEmail: 'admin@gmail.com',
          adminPassword: '123',
        },
      });
      alert('✅ Car added successfully!');
    } catch (err: any) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <Input name="brand" placeholder="Brand" onChange={handleChange} />
      <Input name="model" placeholder="Model" onChange={handleChange} />
      <Input name="carType" placeholder="Car Type (e.g., SUV)" onChange={handleChange} />
      <Input name="fuelType" placeholder="Fuel Type (e.g., PETROL)" onChange={handleChange} />
      <Input name="pricePerDay" type="number" placeholder="Price per Day" onChange={handleChange} />
      <Input name="features" placeholder="Features (comma separated)" onChange={handleChange} />

      <Button onClick={handleAddCar}>Add Car</Button>
    </div>
  );
};

export default CarManagement;

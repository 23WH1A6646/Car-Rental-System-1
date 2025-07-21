import axios from "axios";

export interface FareRequest {
  carId: number;
  startDate: string; // format: YYYY-MM-DD
  endDate: string;
  totalKmDriven?: number;
}

export const estimateFare = async (data: FareRequest): Promise<number> => {
  const response = await axios.post("http://localhost:8080/api/fare/estimate", data);
  return response.data;
};

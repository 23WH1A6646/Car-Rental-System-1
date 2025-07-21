// src/types/Fare.ts
export interface FareRequest {
  carId: number;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
  totalKmDriven?: number; // optional for now
}

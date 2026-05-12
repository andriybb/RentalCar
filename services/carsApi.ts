import axios from 'axios';
const BASE_URL = process.env.BASE_URL;

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
  }

export interface CarsFilters {
  page?: number;
  limit?: number;
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
}
export async function getCars(): Promise<Car[]> {
    const { data } = await axios.get(`${BASE_URL}/cars`);
    return data.cars; 
  }
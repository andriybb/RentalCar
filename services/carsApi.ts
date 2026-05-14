import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;;

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
export async function getCars(page: number = 1): Promise<Car[]> {
  const { data } = await axios.get(`${BASE_URL}/cars`, {
    params: {
      page: page,
      limit: 12,
    }
  });
  return data.cars; 
}
export async function getCarById(id: string): Promise<Car> {
  const { data } = await axios.get(`${BASE_URL}/cars/${id}`);
  return data; 
}
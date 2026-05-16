import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;   
  engine: string;            
  features: string[];        
  rentalPrice: string;
  rentalCompany: string;
  location: CarLocation;      
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;       
  createdAt: string;          //
  updatedAt: string;         
}

export interface CarsResponse {
  cars: Car[];
}

export interface CarsFilters {
  page?: number;
  perPage?: number;          
  brand?: string;
  rentalPrice?: number;           
  minMileage?: number;
  maxMileage?: number;
}

export interface BookingPayload {
  name: string;
  email: string;
  comment: string;
}

export interface FilterMetadata {
  brands: string[];
  rentalPrice: {
    min: number;
    max: number;
  };
}


export async function getCars(page: number = 1, filters?: CarsFilters): Promise<Car[]> {
  const { data } = await axios.get(`${BASE_URL}/cars`, {
    params: {
      page: page,
      perPage: 12,
      ...filters, 
    }
  });
  
  return data.cars; 
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await axios.get(`${BASE_URL}/cars/${id}`);
  return data; 
}

export async function bookCar(carId: string, bookingData: BookingPayload) {
  const { data } = await axios.post(`${BASE_URL}/cars/${carId}/booking-requests`, bookingData);
  return data; 
}

export async function getCarFilters(): Promise<FilterMetadata> {
  const { data } = await axios.get(`${BASE_URL}/cars/filters`);
  return data;
}

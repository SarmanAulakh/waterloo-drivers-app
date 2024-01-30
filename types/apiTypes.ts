export interface User {
  id: number;
  firebase_id: string;
  name: string;
  phone_number?: string;
  email: string;
  drivers_licence_number: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: number;
  licence_plate: string;
  make: string;
  model: string;
  year: number;
  province: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  vehicle_id: number;
  cost: number;
  type: string;
  status: string;
  issue_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export type CreateUser = {
  user: {
    firebase_id: string;
    name: string;
    phone_number?: string;
    email: string;
    drivers_licence_number: string;
  };
};

export type CreateUserVehicle = {
  vehicle: {
    licence_plate: string;
    province: string;
    make: string;
    model: string;
    year: string;
  };
};

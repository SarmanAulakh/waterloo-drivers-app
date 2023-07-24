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

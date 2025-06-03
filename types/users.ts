import type { MySubscription } from "./midtypes.ts";
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscription: MySubscription;
  next_payment_date: Date;
}

export interface Student {
  student_id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Teacher {
  teacher_id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  rating: number;
}

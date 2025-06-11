export interface User {
  id: number;
  pib: string;
  email: string;
  password: string;
  phone_number: string;
  subscription: boolean;
  activation_date: Date | null;
  bank_card_number: string;
}

export interface Student {
  id: number;
}

export interface Teacher {
  id: number;
  description: string;
  rating: number | null;
}

export interface Moderator {
  id: number;
  description: string;
  role: string;
  email: string;
  phone_number: string;
  rating: number | null;
}

export interface Document {
  id: number;
  upload_date: Date;
  name: string;
  extension: string;
  work_type: string;
  subject_area: string;
  disk_path: string;
  author_id: number;
}

export interface UserFavorites {
  user_id: number;
  document_id: number;
}

export interface Post {
  id: number;
  work_type: string;
  university: string;
  subject_area: string;
  description: string;
  initial_price: number;
  creation_date: Date;
  status: string;
  student_id: number;
}

export interface PostError {
  id: number;
  description: string;
  creation_date: Date;
  work_type: string;
  university: string;
  subject_area: string;
  post_description: string;
  initial_price: number;
  status: string;
  student_id: number;
  moderator_id: number | null;
}

export interface ProfileError {
  id: number;
  description: string;
  creation_date: Date;
  pib: string;
  email: string;
  phone_number: string;
  role: string;
  user_description: string;
  rating: number | null;
  moderator_id: number | null;
}

export interface Response {
  id: number;
  creation_date: Date;
  price: number;
  respondent_id: number;
  respondent: "teacher" | "student";
  post_id: number;
}

export interface Agreement {
  id: number;
  price: number;
  status: string;
  student_feedback: number | null;
  post_id: number;
  teacher_id: number;
}

export interface Complaint {
  id: number;
  description: string;
  creation_date: Date;
  status: string;
  plaintiff_id: number;
  moderator_id: number | null;
}

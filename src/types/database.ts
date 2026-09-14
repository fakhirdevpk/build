export interface Profile {
  id: string;
  full_name: string | null;
  role: 'member' | 'trainer' | 'admin';
  phone: string | null;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration_days: number;
  description: string | null;
}

export interface GymClass {
  id: string;
  title: string;
  trainer_id: string;
  starts_at: string;
  duration_minutes: number;
  capacity: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  starts_at: string;
  ends_at: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface Booking {
  id: string;
  class_id: string;
  user_id: string;
  created_at: string;
}
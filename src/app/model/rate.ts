import { Employee } from './employee';

export interface Rate {
  _id: string;
  salon_id: string;
  employee_id: string;
  booking_id: string;
  salon_rate: number;
  employee_rate: number;
  comment: string;
  status: number;
  created_date: Date;
  created_by: string;
  user_id: string;
  employee: Employee;
}

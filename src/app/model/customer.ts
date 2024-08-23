import { User } from "./auth";

export interface Customer {
  _id: string;
  code: string;
  status: number;
  user_id?: string; // Optional field
  created_date: string; // Use string type for ISO 8601 date format
  created_by?: string; // Optional field
  modified_by?: string; // Optional field
  modified_date?: string; // Optional field
  customer_type?: number; // Optional field
  user?: User; // Optional nested User object
}

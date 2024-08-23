export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  identifier: string;
  birthday: string; // Use string type for ISO 8601 date format
  userName: string;
  status: number;
  roles?: string; // Optional field
  avatar?: string; // Optional field
  cover?: string; // Optional field
  customer_id?: string; // Optional field
  modified_by?: string; // Optional field
  modified_date?: string; // Optional field
}

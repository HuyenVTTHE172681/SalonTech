export class User {
  _id: string = '';
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  commune: string = '';
  identifier: string = '';
  birthday: string = ''; // Use string type for ISO 8601 date format
  userName: string = '';
  password: string = '';
  status: number = 0;
  roles?: string[]; // Optional field
  avatar?: string; // Optional field
  cover?: string; // Optional field
  customer_id?: string; // Optional field
  modified_by?: string; // Optional field
  modified_date?: string; // Optional field
}

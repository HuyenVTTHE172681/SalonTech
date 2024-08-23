export interface Salon {
  _id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  commune: string;
  status: number;
  rate_average: number;
  opening_from_date: string;
  opening_to_date: string;
  avatar: string;
  qrCode: string;
  cover: string;
  description: string;
  short_description: string;
  latitude: number;
  longitude: number;
  created_date: string;
  created_by: string;
  modified_by: string;
  modified_date: string;
  employee_ids: string[];
  service_ids: string[];
  salonNames: string;
}
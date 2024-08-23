import { Customer } from './customer';
import { Employee } from './employee';
import { Salon } from './salon';
import { Service } from './service';


export interface Booking {
  _id: string;
  code: string;
  checkin_date: Date;
  checkout_date: Date;
  status: number;
  qr: string;
  note: string;
  employee_id: string;
  salon_id: string;
  customer_id: string;
  total_money: number;
  voucher_id: string;
  service_ids: string[];
  created_date: Date;
  created_by: string;
  salon: Salon;
  employee: Employee;
  customer: Customer;
  services: Service[]; // Đổi tên khi sử dụng
  serviceNames: string;
  sectorCodes: string;
}

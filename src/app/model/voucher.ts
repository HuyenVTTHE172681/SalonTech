import { Salon } from './salon';
import { Service } from './service';

export interface Voucher {
  _id: string;
  code: string;
  name: string;
  description: string;
  status: number;
  start_date: string;
  end_date: string;
  discount: number;
  service_ids: string[];
  created_date: string;
  created_by: string;
  modified_by: string;
  modified_date: string;
  salon_ids: string[];
  avatar: string;
  services: Service[];
  salons: Salon[];
  salonNames?: string;
}

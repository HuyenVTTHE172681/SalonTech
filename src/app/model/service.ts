import { Sector } from "./sector";

export interface Service {
  _id: string;
  name: string;
  code: string;
  description: string;
  status: number;
  price: number;
  sector_id: string;
  created_date: string;
  created_by: string;
  modified_by: string;
  modified_date: string;
  voucher_ids: string[];
  sector: Sector;
}

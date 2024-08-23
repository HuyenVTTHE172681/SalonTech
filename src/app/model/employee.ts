import { User } from './auth';
import { Salon } from './salon';

export interface Employee {
  _id: string;
  code: string;
  rate: number;
  status: number;
  introduce: string;
  user_id: string;
  created_date: Date;
  created_by: string;
  modified_by: string;
  modified_date: Date;
  user: User;
}

export interface Pagination {
  items: Salon[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

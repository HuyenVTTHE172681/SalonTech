export interface Menu {
  _id: string;
  name: string;
  nameEn: string;
  parentId?: string;
  path: string;
  screen?: string;
  icon: string;
  status: number;
  order: number;
  code: string;
  className?: string;
  created_date: string;
  created_by: string;
  modified_by?: string;
  modified_date?: string;
  user_id?: string;
  actions: string[];
}

export interface MenuResponse {
  items: Menu[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

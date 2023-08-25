import { IUser } from "@interface/user";
import type { ColumnsType } from "antd/es/table";

export interface ICustomTableProps {
  columns?: ColumnsType<any>;
  dataSource: any[];
  onChange?: any;
  meta?: IMetaResponse;
  isLoading: boolean;
  searchData?: any;
  detailData: IUser;
  onToggleDrawer: () => void;
}

export interface IMetaResponse {
  current?: number;
  pageSize?: number;
  pages?: number;
  total?: number;
}

export interface ICustomPagination {
  change?: (page: number) => void;
  meta?: IMetaResponse;
}
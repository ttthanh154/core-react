import { IUser } from "@interface/user";
import type { ColumnsType } from "antd/es/table";

export interface ICustomTableProps {
  columns?: ColumnsType<any>;
  dataSource?: any;
  onChange?: any;
  meta?: IMetaResponse;
  isLoading?: boolean;
  searchData?: any;
  detailData?: IUser;
  onToggleDrawer?: any;
  showModal?: any;
  isModalOpen?: boolean;
  type?: string;
  handleCancel?: () => void;
  labelName?: any;
  modalFields?: any;
  modalApi: any;
  options?: any[]; 
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

export interface ICustomTypeModal {
  type: string;
}

export interface ICustomSearchBox {
  hidden?: boolean;
  label: string;
  name: string;
  rules?: any;
  inputType?: string;
}

export interface ICustomValModal {
  title: string;
  field: ICustomSearchBox[];
}

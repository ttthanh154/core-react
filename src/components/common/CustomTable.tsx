import { ICustomTableProps } from "@interface/tableCustomize";
import { Table } from "antd";
import CustomPagination from "./CustomPagination";

const CustomTable = (props: ICustomTableProps) => {
  const { columns, dataSource, onChange, meta, isLoading } = props;
  
  return (
    <>
      <div className="customTable">
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          pagination={false}
          rowKey="_id"
          loading={isLoading}
        />
        <CustomPagination meta={meta} />
      </div>
    </>
  );
};

export default CustomTable;

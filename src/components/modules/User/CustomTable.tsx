import { ICustomTableProps } from "@interface/tableCustomize";
import { Button, Space, Table } from "antd";
import CustomPagination from "./CustomPagination";
import SearchBox from "./SearchBox";
import CustomDrawer from "./CustomDrawer";
import CustomModal from "./CustomModal";
import * as XLSX from "xlsx";
const CustomTable = (props: ICustomTableProps) => {
  const {
    columns,
    dataSource,
    onChange,
    meta,
    isLoading,
    searchData,
    detailData,
    onToggleDrawer,
    showModal,
    isModalOpen, 
    type,
    handleCancel,
    labelName
  } = props;
  


  // console.log(labelName)

  const handleExport = (data: any[]) => {
    if (data.length > 1) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataSheet.xlsx");
    }
  };

  

  const renderHeader = () => {
    return (
      <>
        <div className="table__header-title">
          <span>Danh sách người dùng</span>
          <Space>
            <Button
              type="primary"
              className="btn-export"
              onClick={() => handleExport(dataSource)}
            >
              Xuất file
            </Button>
            <Button
              type="primary"
              className="btn-import"
              onClick={() => showModal("upload")}
            >
              Nhập file
            </Button>
            <Button
              type="primary"
              className="btn-add"
              onClick={() => showModal("addNew")}
            >
              Thêm mới
            </Button>
          </Space>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="customTable">
        <SearchBox searchData={searchData} labelName={labelName}/>
        <CustomDrawer data={detailData} onToggleDrawer={onToggleDrawer} />

        <Table
          title={renderHeader}
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          pagination={false}
          rowKey="_id"
          loading={isLoading}
        />
        <CustomPagination meta={meta} />
        <CustomModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          type={type}
          detailData={detailData}
          columns={columns}
        />
      </div>
    </>
  );
};

export default CustomTable;

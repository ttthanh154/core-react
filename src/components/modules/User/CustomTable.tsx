import { ICustomTableProps } from "@interface/tableCustomize";
import { Button, Space, Table } from "antd";
import CustomPagination from "./CustomPagination";
import SearchBox from "./SearchBox";
import CustomDrawer from "./CustomDrawer";
import { useState } from "react";
import CustomModal from "./CustomModal";

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
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('')
  const showModal = (type: string) => {
    setType(type)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderHeader = () => {
    return (
      <>
        <div className="table__header-title">
          <span>Danh sách người dùng</span>
          <Space>
            <Button type="primary" className="btn-export">
              Xuất file
            </Button>
            <Button type="primary" className="btn-import" onClick={() => showModal('upload')}>
              Nhập file
            </Button>
            <Button type="primary" className="btn-add" onClick={() => showModal('addNew')}>
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
        <SearchBox searchData={searchData} />
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
        />
      </div>
    </>
  );
};

export default CustomTable;

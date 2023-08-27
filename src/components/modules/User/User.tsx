import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "./CustomTable";
import { useState, useEffect } from "react";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import { IUser, IUserDataType } from "@interface/user";
import { Button, Space } from "antd";
import { IMetaResponse } from "@interface/tableCustomize";
import { DeleteOutlined } from "@ant-design/icons";
import { active } from "@store/slice/globalSlice";

const User = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState([]);
  const page = useAppSelector((state) => state.global.page);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<IUser>();
  const [detailId, setDetailId] = useState<any>();
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.global.active);
  const reload = useAppSelector((state) => state.global.reload)
  const handleSearchData = (data: any) => {
    setDataSearch(data);
  };

  const toggleDrawer = () => {
    dispatch(active(!isActive));
  };

  const handleClickId = async (_id: string) => {
    const res = await UserManagementApi.getUsersWithPaginate(params);
    const dataRes = res.data;
    const { result } = dataRes;
    const detailData = result.find((item: IUser) => item._id === _id);
    setDetailId(detailData);
    toggleDrawer();
  };

  const onChange: TableProps<IUserDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns: ColumnsType<IUserDataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_id: string) => (
        <span
          style={{ color: "#1070b6", cursor: "pointer" }}
          onClick={() => handleClickId(_id)}
        >
          {_id}
        </span>
      ),
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, _record) => (
        <Space size="middle">
          <Button>
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </Space>
      ),
    },
  ];

  const params = `current=${page.current}&pageSize=${page.pageSize}&email=${
    dataSearch?.email || ""
  }&fullName=/${dataSearch?.fullName || ""}/&phone=/${
    dataSearch?.phone || ""
  }/`;

  const getUsers = async () => {
    setIsLoading(true);
    const res = await UserManagementApi.getUsersWithPaginate(params);
    const dataRes = res.data;
    const { meta, result } = dataRes;

    const dataSource = result.map((item: IUser, index: any) => ({
      _id: item._id, // Storing the actual _id separately
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
    }));

    setData(dataSource);
    setMeta(meta);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [page, dataSearch, reload]);

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        onChange={onChange}
        meta={meta}
        isLoading={isLoading}
        searchData={handleSearchData}
        detailData={detailId}
        onToggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default User;

import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "../common/CustomTable";
import { useState, useEffect } from "react";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { useAppSelector } from "@utils/hook";
import { IUser, IUserDataType } from "@interface/user";
import { Button, Space } from "antd";
import { IMetaResponse } from "@interface/tableCustomize";
import { DeleteOutlined } from "@ant-design/icons";

const User = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState([]);
  const page = useAppSelector((state) => state.global.page);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      key: "_id",
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: {
        compare: (a, b) => a.fullName - b.fullName,
        multiple: 3,
      },
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 2,
      },
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 1,
      },
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </Space>
      ),
    },
  ];

  const params = `current=${page.current}&pageSize=${page.pageSize}`;

  const getUsers = async () => {
    try {
      setIsLoading(true)
      const res = await UserManagementApi.getUsersWithPaginate(params);
      const dataRes = res.data;
      const { meta, result } = dataRes;

      const dataSource = result.map((item: IUser) => ({
        _id: item._id,
        fullName: item.fullName,
        email: item.email,
        phone: item.phone,
      }));

      setData(dataSource);
      setMeta(meta);
      setIsLoading(false)
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [page]);

   
  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        onChange={onChange}
        meta={meta}
        isLoading={isLoading}
      />
    </>
  );
};

export default User;

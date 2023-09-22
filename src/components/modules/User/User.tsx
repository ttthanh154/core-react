import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "./CustomTable";
import { useState, useEffect } from "react";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import { IUser, IUserDataType, IUserFieldType } from "@interface/user";
import { Button, Form, Popconfirm, Space } from "antd";
import { ICustomSearchBox, ICustomValModal, IMetaResponse } from "@interface/tableCustomize";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { active, reload } from "@store/slice/globalSlice";

const User = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<IUser>();
  const [detailId, setDetailId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<any>("");
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.global.page);
  const isActive = useAppSelector((state) => state.global.active);
  const reloadPage = useAppSelector((state) => state.global.reload);

  const modalApi = UserManagementApi;

  const handleSearchData = (data: any) => {
    setDataSearch(data);
  };

  const toggleDrawer = () => {
    dispatch(active(!isActive));
  };

  const showModal = (type: string) => {
    setType(type);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setType("");
  };

  const handleViewDetailId = async (_id: string) => {
    const res = await UserManagementApi.getWithPaginate(params);
    const dataRes = res.data;
    const { result } = dataRes;
    const detailData = result.find((item: IUser) => item._id === _id);
    setDetailId(detailData);
    toggleDrawer();
  };

  const handleEditDetailId = async (_id: string, type: string) => {
    const detailData = data.find((item: IUser) => item._id === _id);
    console.log(detailData);
    setDetailId(detailData);
    showModal(type);
  };

  const handleDeleteId = async (_id: string) => {
    try {
      const res = await UserManagementApi.delete(_id);
      console.log("delete::: ", res);
      setIsLoading(false);
      dispatch(reload(!reloadPage));
      funcUtils.notify('Xóa người dùng thành công!', 'success');
    } catch (error) {
    }
  };

  

  const labelName: ICustomSearchBox[] = [
    {
      label: "Tên hiển thị",
      name: 'fullName',
    },
    {
      label: 'Email',
      name: 'email'
    },
    {
      label: 'Số điện thoại',
      name: 'phone',
      inputType: 'number'
    }
  ]

  const modalFields: ICustomValModal[] = [
    {
      title: 'người dùng',
      field: [
        {
          label: 'ID',
          name: '_id',
          hidden: true
        },
        {
          label: 'Họ tên',
          name: 'fullName',
          rules: [
            { required: true, message: "Vui lòng nhập họ tên đầy đủ!" }
          ]
        },
        {
          label: 'Mật khẩu',
          name: 'password',
          rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }], 
          inputType: 'password'
        },
        {
          label: "Email",
          name: 'email',
          rules:[{ required: true, message: "Vui lòng nhập email!" }]

        },
        {
          label: 'Số điện thoại',
          name: 'phone',
          rules: [
            { required: true, message: "Vui lòng nhập số điện thoại!" },
          ]
        }
      ]
    }
  ]

  // console.log(modalFields)

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
          onClick={() => handleViewDetailId(_id)}
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
          <Popconfirm
            placement="left"
            title="Xác nhận xóa người dùng"
            description="Bạn có muốn xóa người dùng này?"
            onConfirm={() => handleDeleteId(_record._id)}
            okText="Xóa"
            cancelText="Không"
          >
            <Button>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Popconfirm>

          <Button onClick={() => handleEditDetailId(_record._id, "edit")}>
            <EditOutlined style={{ color: "#f57800" }} />
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
    const res = await UserManagementApi.getWithPaginate(params);
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
  }, [page, dataSearch, reloadPage]);

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
        showModal={showModal}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        type={type}
        labelName={labelName}
        modalFields={modalFields}
        modalApi={modalApi}
      />
    </>
  );
};

export default User;

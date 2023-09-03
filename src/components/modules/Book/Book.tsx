import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "../User/CustomTable";
import { useState, useEffect } from "react";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import { IUser, IUserDataType } from "@interface/user";
import { Button, Popconfirm, Space } from "antd";
import { ICustomSearchBox, IMetaResponse } from "@interface/tableCustomize";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { active, reload } from "@store/slice/globalSlice";
import { IBook } from "@interface/book";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import moment from "moment";

const Book = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<IBook>();
  const [detailId, setDetailId] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<any>("");
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.global.page);
  const isActive = useAppSelector((state) => state.global.active);
  const reloadPage = useAppSelector((state) => state.global.reload);

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
    const res = await BookManagementApi.getBooksWithPaginate(params);
    const dataRes = res.data;
    const { result } = dataRes;
    const detailData = result.find((item: IUser) => item._id === _id);
    setDetailId(detailData);
    toggleDrawer();
  };

  // const handleEditDetailId = async (_id: string, type: string) => {
  //   const detailData = data.find((item: IUser) => item._id === _id);
  //   console.log(detailData);
  //   setDetailId(detailData);
  //   showModal(type);
  // };

  // const handleDeleteId = async (_id: string) => {
  //   try {
  //     const res = await UserManagementApi.deleteAUser(_id);
  //     console.log("delete::: ", res);
  //     setIsLoading(false);
  //     dispatch(reload(!reloadPage));
  //     funcUtils.notify('Xóa người dùng thành công!', 'success');
  //   } catch (error) {
  //   }
  // };

  const labelName: ICustomSearchBox[] = [
    {
      label: "Tên sách",
      name: "mainText",
    },
    {
      label: "Tác giả",
      name: "author",
    },
    {
      label: "Thể loại",
      name: "category",
    },
  ];

  const onChange: TableProps<IUserDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns: ColumnsType<IBook> = [
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
      title: "Tên sách",
      dataIndex: "mainText",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, _record) => (
        <Space size="middle">
          <Popconfirm
            placement="left"
            title="Xác nhận xóa người dùng"
            description="Bạn có muốn xóa sách này?"
            // onConfirm={() => handleDeleteId(_record._id)}
            okText="Xóa"
            cancelText="Không"
          >
            <Button>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Popconfirm>

          <Button
          // onClick={() => handleEditDetailId(_record._id, "edit")}
          >
            <EditOutlined style={{ color: "#f57800" }} />
          </Button>
        </Space>
      ),
    },
  ];

  const params = `current=${page.current}&pageSize=${page.pageSize}&mainText=${
    dataSearch?.mainText || ""
  }&author=/${dataSearch?.author || ""}/&category=/${
    dataSearch?.category || ""
  }/`;

  const getBooks = async () => {
    setIsLoading(true);
    const res = await BookManagementApi.getBooksWithPaginate(params);
    const dataRes = res.data;
    const { meta, result } = dataRes;

    const dataSource = result.map((item: IBook, index: any) => ({
      _id: item._id, // Storing the actual _id separately
      mainText: item.mainText,
      category: item.category,
      author: item.author,
      price: item.price,
      updatedAt: moment(item.updatedAt).format("DD-MM-YYYY HH:MM:SS"),
    }));

    setData(dataSource);
    setMeta(meta);
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks();
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
      />
    </>
  );
};

export default Book;

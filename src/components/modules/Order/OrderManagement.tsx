import { ColumnsType } from "antd/es/table";
import CustomTable from "../User/CustomTable";
import { useState, useEffect } from "react";
import { funcUtils, useAppSelector } from "@utils/hook";

import {
  ICustomSearchBox,
  IMetaResponse,
} from "@interface/tableCustomize";

import { IBook } from "@interface/book";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import moment from "moment";
import OrderManagementApi from "@api/Admin/OrderManagement/OrderManagementApi";
import { IOrderManagement } from "@interface/order";

const OrderManagement = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<IOrderManagement>();
  const page = useAppSelector((state) => state.global.page);
  const reloadPage = useAppSelector((state) => state.global.reload);

  const modalApi = BookManagementApi;

  const handleSearchData = (data: any) => {
    setDataSearch(data);
  };

  const labelName: ICustomSearchBox[] = [
    {
      label: "Tên khách hàng",
      name: "name",
    },
    {
      label: "Số điện thoại",
      name: "phone",
    },
  ];



  const columns: ColumnsType<IBook> = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_id: string) => (
        <span style={{ color: "#1070b6"}}>{_id}</span>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      render: (text, record, index) => (
        <span>{funcUtils.formattedCurrency(text)}</span>
      )
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
    },
  ];

  const params = `current=${page.current}&pageSize=${page.pageSize}&name=/${dataSearch?.name || ""}/&phone=/${
    dataSearch?.phone || ""
  }/`;

  const getBooks = async () => {
    setIsLoading(true);
    const res = await OrderManagementApi.getWithPaginate(params);
    const dataRes = res.data;
    const { meta, result } = dataRes;
    const dataSource = result.map((item: IOrderManagement, index: any) => ({
      _id: item._id, // Storing the actual _id separately
      name: item.name,
      phone: item.phone,
      address: item.address,
      totalPrice: item.totalPrice,
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
    <div className="order-management">
      <CustomTable
        columns={columns}
        dataSource={data}
        meta={meta}
        isLoading={isLoading}
        labelName={labelName}
        modalApi={modalApi}
        searchData={handleSearchData}
      />
    </div>
  );
};

export default OrderManagement;

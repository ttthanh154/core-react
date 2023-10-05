import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { IDetailCart } from "@interface/order/order";
import { funcUtils } from "@utils/hook";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

const History = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const dataRes = await UserManagementApi.history();
        const data = dataRes.data.map((item: DataType, index: any) => ({
          key: uuid4(),
          stt: (index + 1).toString(),
          createdAt: item.createdAt,
          totalPrice: funcUtils.formattedCurrency(item.totalPrice),
          status: "Thành công",
          detail: item.detail,
        }));
        setTableData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    getHistory();
  }, []);

  interface DataType {
    stt: string;
    key: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    detail: any[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <p>{moment(date).format("DD-MM-YYYY hh:mm:ss A")},</p>
      ),
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record, index) => {
        return <div className="priceCol">{text}</div>;
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      render: (text, record, index) => {
        return (
          <div>
            {record.detail.map((item: IDetailCart, index) => (
              <div key={item._id} className="detailCol">
                {index + 1}. {item.bookName} &nbsp; - &nbsp; Số lượng:{" "}
                {item.quantity}
              </div>
            ))}
          </div>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="green">{status}</Tag>,
    },
  ];

  return (
    <div className="history">
      <div>
        <b>Lịch sử đặt hàng</b>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        className="historyTable"
      />
    </div>
  );
};

export default History;

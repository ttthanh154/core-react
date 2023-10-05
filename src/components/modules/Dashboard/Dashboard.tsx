import { Card, Col, Row, Statistic } from "antd";
//@ts-ignore
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { useAppSelector } from "@utils/hook";
import DashboardApi from "@api/Admin/Dashboard/DashboardApi";
import { IDashboardData } from "@interface/dashboard";
const Dashboard = () => {
  const page = useAppSelector((state) => state.global.page);
  const [dashboardData, setDashboardData] = useState<IDashboardData>({
    countOrder: 0,
    countUser: 0,
  });
  const getGeneralData = async () => {
    const dataRes = await DashboardApi.getAll();
    console.log(dataRes);
    setDashboardData(dataRes.data);
  };

  const formatter = (value: number) => <CountUp end={value} />;

  useEffect(() => {
    getGeneralData();
  }, []);
  return (
    <div className="dashboard">
      {/* <div></div> */}
      <Row gutter={[40, 40]}>
        <Col span={12}>
          <Card title="" bordered={false}>
            <Statistic
              title="Tổng người dùng"
              value={dashboardData.countUser}
              //@ts-ignore
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="" bordered={false}>
            <Statistic
              title="Tổng đơn hàng"
              value={dashboardData.countUser}
              precision={2}
              //@ts-ignore
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

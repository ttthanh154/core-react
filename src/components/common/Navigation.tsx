import { Link } from "react-router-dom";
import {
  BookOutlined,
  PaperClipOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useState } from "react";
import Header from "./Header";
import { useAppSelector } from "@utils/hook";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Navigation = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;
  const userInfo = useAppSelector((state) => state.user.user.role);
  const items: MenuItem[] = [
    getItem(<Link to={"/"}>Dashboard</Link>, "1", <PieChartOutlined />),
    getItem(<Link to={"/user"}>Manage Users</Link>, "sub1", <UserOutlined />),
    getItem(<Link to={"book"}>Manage Books</Link>, "sub2", <BookOutlined />),
    getItem(
      <Link to={"order/management"}>Manage Orders</Link>,
      "sub3",
      <PaperClipOutlined />
    ),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {userInfo === "ADMIN" && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
      )}

      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <div className="container__content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
           ©2023 Thành Dev
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;

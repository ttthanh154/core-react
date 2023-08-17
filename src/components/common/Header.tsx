import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import AuthApi from "@api/Auth/AuthApi";
import { loading } from "@store/slice/globalSlice";
import { logout } from "@store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import { Avatar, Badge, Dropdown, Form, Input, Popover, Space } from "antd";
import type { MenuProps } from "antd";

import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";
const Header = () => {
  const username = useAppSelector((state) => state.user.user.fullName);
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(loading(true));
    try {
      const res = await AuthApi.logout();
      console.log(res);
      if(res?.statusCode === 201){
        dispatch(logout())
      }
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false))
    }
  }
  const items: MenuProps["items"] = [
    {
      label: <Link to='/changePassword'>Đổi mật khẩu</Link>,
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: <p onClick={handleLogout}>Đăng xuất</p>,
      key: "1",
    },
  ];

  return (
    <>
      <div className="header__container">
        <div className="header__container-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtrrYWlslXjJkIMhqvT73sYB0MC3TTurFvdLMgXZiuG83_-tsmqDuYXVPcnY6HLRj7bc&usqp=CAU"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
        </div>

        <div className="header__container-searchBar">
          <Form form={form} className="searchBar">
            <Form.Item
              name="search"
              initialValue={""}
              className="searchBar-form"
            >
              <Input
                placeholder="Nhập từ khóa tìm kiếm"
                // onKeyUp={onKeyUp}
              />
            </Form.Item>
          </Form>

          <Space size={"large"} className="cart-management">
            <Badge>
              <ShoppingCartOutlined className="cart-icon" />
            </Badge>
          </Space>
        </div>

        <div className="header__container-account">
          <Dropdown menu={{ items }} trigger={["click"]} className="">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span>{username}</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;

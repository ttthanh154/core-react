import {
  DownOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { loading } from "@store/slice/globalSlice";
import { logout } from "@store/slice/userSlice";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Popover,
  Space,
  Tabs,
  TabsProps,
} from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import UserInfo from "../modules/AccountManagement/UserInfo";
import Password from "../modules/AccountManagement/Password";
const Header = () => {
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.user.user.fullName);
  const userRole = useAppSelector((state) => state.user.user.role);
  const userAvatar = useAppSelector((state) => state.user.user.avatar);
  const isLogin = useAppSelector((state) => state.user.isAuthenticated);
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.order.carts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(loading(true));
    try {
      dispatch(logout());
      navigate("/login");
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <p onClick={() => accountModal.showModal()}>Quản lý tài khoản</p>,
      key: "password",
    },
    {
      label: <Link to="/history">Lịch sử đặt hàng</Link>,
      key: "history",
    },
    {
      type: "divider",
    },
    {
      label: <p onClick={handleLogout}>Đăng xuất</p>,
      key: "logout",
    },
  ];

  userRole === "ADMIN"
    ? items.unshift({
        label: <Link to="/dashboard">Trang quản trị</Link>,
        key: "dashboard",
      })
    : null;

  const urlAvatar = `${
    import.meta.env.VITE_BACKEND_API
  }/images/avatar/${userAvatar}`;

  const handleClickImage = () => {
    navigate("/");
  };

  const handleCartButton = () => {
    const itemsPopover = carts.map((item) => {
      return (
        <div className="cart-item" key={item._id}>
          <img
            src={`${import.meta.env.VITE_BACKEND_API}/images/book/${
              item.detail.thumbnail
            }`}
            style={{ width: "38px", height: "38px" }}
          />
          <div>
            {item.detail.mainText}&nbsp;
            <span className="cart-item__price">
              {funcUtils.formattedCurrency(item.detail.price)}
            </span>
          </div>
        </div>
      );
    });

    const orderView = () => {
      const contentPopover = [...itemsPopover];
      contentPopover.push(
        <div
          key="cart-view__btn"
          className="cart-view__btn"
          onClick={() => navigate("/order")}
        >
          <Button className="view__btn">Xem giỏ hàng</Button>
        </div>
      );
      return contentPopover;
    };
    return orderView();
  };

  const accountModal = {
    showModal: () => {
      setIsModalOpen(true);
    },

    handleCancel: () => {
      setIsModalOpen(false);
    },
  };

  const modalTabs = () => {
    const onChange = (key: string) => {
      console.log(key);
    };

    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Thông tin người dùng",
        children: <UserInfo forceCancle={accountModal.handleCancel}/>,
      },
      {
        key: "2",
        label: "Đổi mật khẩu",
        children: <Password forceCancle={accountModal.handleCancel}/>,
      },
    ];

    return { onChange, items };
  };
  return (
    <>
      <div className="header__container">
        <div className="header__container-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtrrYWlslXjJkIMhqvT73sYB0MC3TTurFvdLMgXZiuG83_-tsmqDuYXVPcnY6HLRj7bc&usqp=CAU"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
            onClick={handleClickImage}
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
            <Popover
              placement="bottomRight"
              title="Giỏ hàng"
              content={
                isLogin === true ? (
                  handleCartButton
                ) : (
                  <div
                    key="cart-view__btn"
                    className="cart-view__btn"
                    onClick={() => navigate("/order")}
                  >
                    <Button className="view__btn">Xem giỏ hàng</Button>
                  </div>
                )
              }
              rootClassName="cart__popover"
            >
              <Badge
                showZero={true}
                overflowCount={99}
                count={isLogin === true ? carts?.length : 0}
                size="default"
              >
                <ShoppingCartOutlined className="cart-icon" />
              </Badge>
            </Popover>

            <div className="home-icon" onClick={() => navigate("/")}>
              <span>
                <HomeOutlined />
                Trang chủ
              </span>
            </div>
          </Space>
        </div>

        <div className="header__container-account">
          {username  ? (
            <Dropdown menu={{ items }} trigger={["click"]} className="">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={urlAvatar} />
                  <span>{username}</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Link to={"/login"}>
              <div className="header__container-account--btn">
                <SmileOutlined style={{ fontSize: "14px" }} />
                &nbsp;
                <span style={{ fontSize: "14px" }}>Tài khoản</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <Space>
        <Modal
          title="Quản lý tài khoản"
          open={isModalOpen}
          onCancel={accountModal.handleCancel}
          className="accountModal"
          footer={false}
        >
          <Tabs
            defaultActiveKey="1"
            items={modalTabs().items}
            onChange={modalTabs().onChange}
          />
        </Modal>
      </Space>
    </>
  );
};

export default Header;

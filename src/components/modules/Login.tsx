import { Button, Form, Input } from "antd";
import { ILoginFieldType } from "../../interface/register";
import AuthApi from "@api/Auth/AuthApi";
import { funcUtils, useAppDispatch } from "@utils/hook";
import { loading } from "@store/slice/globalSlice";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@store/slice/userSlice";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value: ILoginFieldType) => {
    dispatch(loading(true));
    try {
      const userData: ILoginFieldType = value;
      const { data } = await AuthApi.login(userData);
      console.log("LOGIN: ", data);
      if (data?.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("role", data.user.role);
        dispatch(login(data.user));
        const userRole = localStorage.getItem("role");
        userRole === "ADMIN" ? navigate("/admin") : navigate("/");

        funcUtils.notify("Đăng nhập tài khoản thành công", "success");
      }
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

  return (
    <>
      <div className="register">
        <div className="register__content">
          <div className="register__content-body">
            <h1>Đăng nhập</h1>
            <Form
              className="register__content-field"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item<ILoginFieldType>
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tài khoản" },
                ]}
                className="form-input"
              >
                <Input />
              </Form.Item>

              <Form.Item<ILoginFieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                className="form-input"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <b>Hoặc</b>
            <div>
              Chưa có tài khoản?
              <Link to={"/register"}>
                <span id="register__link">Đăng ký</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

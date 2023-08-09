import { Button, Form, Input } from "antd";
import { IRegisterFieldType } from "../../interface/register";
import Auth from "@api/Auth/Auth";
import { funcUtils, useAppDispatch } from "@utils/hook";
import { loading } from "@store/slice/globalSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value: IRegisterFieldType) => {
    dispatch(loading(true));
    try {
      const userData: IRegisterFieldType = value;
      const res = await Auth.register(userData);
      if (res?.data?._id) {
        funcUtils.notify("Đăng nhập tài khoản thành công", "success");
        dispatch(loading(false));
      }
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
              <Form.Item<IRegisterFieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                className="form-input"
              >
                <Input />
              </Form.Item>

              <Form.Item<IRegisterFieldType>
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
              Chưa có tài khoản?{" "}
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

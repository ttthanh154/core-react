import { Button, Form, Input } from "antd";
import { IRegisterFieldType } from "../../interface/register";
const Register = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="register">
        <div className="register__content">
          <div className="register__content-body">
            <h1>Đăng ký tài khoản</h1>
              <Form
                className="register__content-field"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<IRegisterFieldType>
                  label="Họ tên"
                  name="fullname"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                  className="form-input"
                >
                  <Input />
                </Form.Item>

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
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                  className="form-input"
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<IRegisterFieldType>
                  label="Số điện thoại"
                  name="phone"
                  className="form-input"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

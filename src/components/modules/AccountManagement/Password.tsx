import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { funcUtils, useAppSelector } from "@utils/hook";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
const Password = ({ forceCancle }: { forceCancle: () => void }) => {
  const { email } = useAppSelector((state) => state.user.user);
  const [form] = useForm();

  useEffect(() => {
    if (email) {
      form.setFieldValue("email", email);
    }
  }, [email]);

  const handleChangePassword = async () => {
    const formData = form.getFieldsValue();
    try {
      const dataRes = await UserManagementApi.changePassword(formData);
      console.log(">>>changePassword: ", dataRes);
      if (dataRes?.statusCode === 201) {
        funcUtils.notify("Đổi mật khẩu thành công", "success");
      }
    } catch (error) {
      console.log(error);
    }
    forceCancle();
    form.resetFields();
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      form.submit();
    }
  }
  return (
    <div className="password" onKeyDown={handleKeyDown}>
      <Form
        form={form}
        className="password__content-field"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="false"
        onFinish={handleChangePassword}
      >
        <Form.Item
          label={"Email"}
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input disabled={true} id="passwordEmail" />
        </Form.Item>
        <Form.Item
          label={"Mật khẩu hiện tại"}
          name="oldpass"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={"Mật khẩu mới"}
          name="newpass"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <div className="password__footer">
        <Button className="submit-button" onClick={form.submit}>
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default Password;

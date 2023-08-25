import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { FieldType } from "@interface/user";
import { Form, Input, Modal } from "antd";
import { useState } from "react";
const CustomModal = ({ isModalOpen, handleCancel }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = { ...values };
    setIsLoading(true);
    try {
      const dataReq = await UserManagementApi.createAUser(data);
      const dataRes = dataReq;
      console.log("Success:", dataRes);
      form.resetFields();
      setIsLoading(false);
      handleCancel();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          name="formAddUser"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Họ tên"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên đầy đủ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomModal;

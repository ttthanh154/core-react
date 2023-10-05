import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { IUserUpload } from "@interface/user";
import { updateInfo, uploadAvatar } from "@store/slice/userSlice";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import { Avatar, Button, Form, Input, Space, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useState, useEffect } from "react";

const UserInfo = ({ forceCancle }: any) => {
  const [form] = useForm();
  const { id, phone, fullName, avatar, email } = useAppSelector(
    (state) => state.user.user
  );
  const userAvatar = useAppSelector((state) => state.user.user.avatar);
  const urlAvatar = `${
    import.meta.env.VITE_BACKEND_API
  }/images/avatar/${avatar}`;

  const [image, setImage] = useState<string>("");
  const dataFields = { _id: id, phone, fullName, avatar, email };
  const dispatch = useAppDispatch();
  // Try to write a customRequest to solve logic of upload image by calling an API in Postman

  useEffect(() => {
    if (dataFields) {
      form.setFieldsValue(dataFields);
    }
  }, []);

  const handleUploadAvatar = async ({ file, onSuccess, onError }: any) => {
    // console.log(file, onSuccess, onError);
    const imageRes = await UserManagementApi.uploadAvatar(file);
    setImage(imageRes.data.fileUploaded);
    dispatch(uploadAvatar(imageRes.data.fileUploaded));
  };

  const handleSubmit = async () => {
    const data = form.getFieldsValue();
    const dataReq: IUserUpload = { ...data, avatar: image.length > 0 ? image : userAvatar };

    const dataRes = await UserManagementApi.updateInfo(dataReq);

    if (dataRes?.statusCode === 200) {
      dispatch(updateInfo(dataReq));
      funcUtils.notify("Cập nhật thông tin tài khoản thành công", "success");
      localStorage.removeItem('access_token');
    } else {
      funcUtils.notify("Cập nhật thông tin thất bại", "error");
    }
    forceCancle();
  };

  const propsUpload: UploadProps = {
    name: "avatar",
    listType: "picture",
    multiple: false,
    maxCount: 1,
    className: "avatar-uploader",
    showUploadList: false,
    onChange(info: UploadChangeParam<UploadFile>) {
      if (info.file.status !== "uploading") {
        console.log(info.file);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file: RcFile) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    customRequest: handleUploadAvatar,
  };

  return (
    <div className="profile">
      <div className="avatar">
        <Space direction="vertical" size={16}>
          <Avatar size={128} icon={<UserOutlined />} src={urlAvatar} />
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Space>
      </div>
      <div className="info">
        <Form
          className="info-content__field"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="false"
          onFinish={handleSubmit}
        >
          <Form.Item label={"ID"} hidden={true} name="_id">
            <Input />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input disabled={true} id="infoEmail" />
          </Form.Item>
          <Form.Item
            label={"Tên hiển thị"}
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Số điện thoại"}
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div className="info-content__footer-button">
          <Button onClick={() => form.submit()} className="submit-button">
            Cập nhật
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

import { InboxOutlined } from "@ant-design/icons";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { FieldType } from "@interface/user";
import { reload } from "@store/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import { Form, Input, Modal, UploadProps, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import * as XLSX from "xlsx";
const CustomModal = ({ isModalOpen, handleCancel, type }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const toggle = useAppSelector((state) => state.global.reload);
  const [excelData, setExcelData] = useState<any>();

  const handleFinishAddModal = async (values: any) => {
    const data = { ...values };
    setIsLoading(true);
    try {
      const dataReq = await UserManagementApi.createAUser(data);
      const dataRes = dataReq;
      console.log("Success:", dataRes);
      form.resetFields();
      setIsLoading(false);
      dispatch(reload(!toggle));
      handleCancel();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleFinishUploadModal = async () => {
    console.log("Upload");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("Ok");
    }, 1000);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: dummyRequest,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info: any) {
      console.log(">>>info: ", info);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          console.log(">>>check file: ", file);
          reader.readAsArrayBuffer(file);
          reader.onload = (e: any) => {
            const data = new Uint8Array(reader.result as ArrayBufferLike);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            const jsonData = XLSX.utils.sheet_to_json(sheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });

            if (jsonData && jsonData.length > 0) {
              console.log(jsonData);
              setExcelData(jsonData);
            }
          };
        }

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const renderModalComponent = () => {
    switch (type) {
      case "addNew":
        return (
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
              onFinish={handleFinishAddModal}
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
        );
      case "upload":
        return (
          <Modal
            title="Thêm mới người dùng"
            open={isModalOpen}
            onOk={() => handleFinishUploadModal()}
            onCancel={handleCancel}
            okText={"Tạo mới"}
            cancelText={"Hủy"}
            confirmLoading={isLoading}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Modal>
        );
      default:
        break;
    }
  };
  return <>{renderModalComponent()}</>;
};

export default CustomModal;

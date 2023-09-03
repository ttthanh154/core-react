import { InboxOutlined } from "@ant-design/icons";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { IUserFieldType, IUserDataType } from "@interface/user";
import { reload } from "@store/slice/globalSlice";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import { Form, Input, Modal, Table, UploadProps, message } from "antd";
import { ColumnsType } from "antd/es/table";
import Dragger from "antd/es/upload/Dragger";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import templateSample from "./Mẫu dữ liệu.xlsx?url";
const CustomModal = ({
  isModalOpen,
  handleCancel,
  type,
  detailData,
  columns,
}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const toggle = useAppSelector((state) => state.global.reload);
  const [excelData, setExcelData] = useState<any>([]);

  // console.log("Modal::: ", type);

  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData);
    }
  }, [type]);

  // const columns: ColumnsType<IUserDataType> = [
  //   {
  //     title: "Tên hiển thị",
  //     dataIndex: "fullName",
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //   },
  //   {
  //     title: "Số điện thoại",
  //     dataIndex: "phone",
  //   },
  // ];

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //For handle adding a single user
  const handleFinishAddModal = async (values: IUserFieldType) => {
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
      setIsLoading(false);
    }
  };

  const handleFinishEditModal = async (values: IUserFieldType) => {
    setIsLoading(true);
    try {
      const res = await UserManagementApi.updateAUser(values);
      console.log("???: ", res);
      setIsLoading(false);
      form.resetFields();
      funcUtils.notify(`Cập nhật thành công!`, "success");
      dispatch(reload(!toggle));
      handleCancel();
    } catch (error) {
      setIsLoading(false);
    }
  };
  //For the import feature
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
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (e: any) => {
            const data = new Uint8Array(reader.result as ArrayBufferLike);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            const jsonData: IUserFieldType[] = XLSX.utils.sheet_to_json(sheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            console.log(">>>check jsonData: ", jsonData);

            if (jsonData?.length > 0) {
              const result = jsonData.map((item: IUserFieldType) => ({
                ...item,
                password: "123456",
              }));
              setExcelData(result);
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

  const handleFinishUploadModal = async () => {
    setIsLoading(true);
    try {
      const res = await UserManagementApi.createAUserList(excelData);
      console.log("check res::: ", res);
      funcUtils.notify(
        `Thành công: ${res.data.countSuccess}  Thất bại: ${res.data.countError}`,
        res.data.countError > 0 ? "warning" : "success"
      );
      setExcelData([]);
      handleCancel();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderModalComponent = () => {
    switch (type) {
      case "addNew":
        return (
          <Modal
            title="Thêm mới người dùng"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => {
              form.resetFields();
              handleCancel();
            }}
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
              <Form.Item<IUserFieldType>
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên đầy đủ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IUserFieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<IUserFieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IUserFieldType>
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
      case "edit":
        return (
          <Modal
            title="Cập nhật người dùng"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => {
              form.resetFields();
              handleCancel();
            }}
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
              onFinish={handleFinishEditModal}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<IUserFieldType> label="ID" name="_id" hidden={true}>
                <Input />
              </Form.Item>
              <Form.Item<IUserFieldType>
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên đầy đủ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IUserFieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item<IUserFieldType>
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
        const filteredColumns = columns.filter((column:any) => column.key !== 'action');
        return (
          <Modal
            title="Thêm file"
            open={isModalOpen}
            onOk={() => handleFinishUploadModal()}
            onCancel={() => {
              setExcelData([]);
              handleCancel();
            }}
            okText={"Tạo mới"}
            cancelText={"Hủy"}
            confirmLoading={isLoading}
            maskClosable={false}
            okButtonProps={{
              disabled: excelData?.length < 1,
              loading: isLoading,
            }}
          >
            <div style={{ overflow: "auto" }}>
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
                  <a
                    href={templateSample}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i>&nbsp; Tải bản mẫu</i>
                  </a>
                </p>
              </Dragger>
              <Table
                columns={filteredColumns}
                dataSource={excelData}
                pagination={false}
                rowKey={(record) => record.email}
                loading={isLoading}
              />
            </div>
          </Modal>
        );

      default:
        break;
    }
  };
  return <>{renderModalComponent()}</>;
};

export default CustomModal;

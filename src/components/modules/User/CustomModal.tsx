import {
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { IUserFieldType } from "@interface/user";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Upload,
  UploadProps,
  message,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import templateSample from "./Mẫu dữ liệu.xlsx?url";
import { ICustomSearchBox } from "@interface/tableCustomize";
import { reload } from "@store/slice/globalSlice";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import { IBookFields } from "@interface/book";
import { v4 as uuidv4 } from "uuid";
const CustomModal = ({
  isModalOpen,
  handleCancel,
  type,
  detailData,
  columns,
  modalFields,
  modalApi,
  options,
}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSlider, setLoadingSlider] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [excelData, setExcelData] = useState<any>([]);

  const [dataThumbnail, setDataThumbnail] = useState<any>([]);
  const [dataSlider, setDataSlider] = useState<any>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const detailEditData = detailData;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileThumbnailList, setFileThumbnailList] = useState<UploadFile[]>([]);

  const dispatch = useAppDispatch();
  const toggle = useAppSelector((state) => state.global.reload);
  const [selectedValue, setSelectedValue] = useState(null);


  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData);
      setDataThumbnail([...detailData.thumbnail]);
      setDataSlider([...detailData.slider]);
    }
  }, [type]);

  useEffect(() => {
    if (detailEditData) {
      //Thumbnail is the first image of slider
      let imgThumbnail: any = {};
      let imgSlider: any[] = [];

      if (detailEditData?.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: detailEditData.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_API}/images/book/${
            detailEditData.thumbnail
          }`,
        };
      }

      if (detailEditData?.slider?.length > 0) {
        detailData.slider.map((item: any) => {
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_API}/images/book/${item}`,
          });
        });
      }
      setFileThumbnailList([imgThumbnail]);
      setFileList(imgSlider);
    }
  }, [detailEditData]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSelectOption = (value: any) => {
    setSelectedValue(value);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  //Handle upload image
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const Base64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadThumbnailFile = async ({
    file,
    onSuccess,
    onError,
  }: any) => {
    const res = await BookManagementApi.uploadImage(file);
    console.log(">>> res book upload: ", res);
    if (res?.data) {
      setDataThumbnail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("Upload file thành công");
    } else {
      onError(`Đã có lỗi khi upload file!`);
    }
  };

  const handleUploadSliderFile = async ({ file, onSuccess, onError }: any) => {
    const res = await BookManagementApi.uploadImage(file);
    console.log(">>> res slider: ", res);
    if (res?.data) {
      setDataSlider((dataSlider: any) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("Upload file thành công");
    } else {
      onError(`Đã có lỗi khi upload file`);
    }
  };

  const handleRemoveFile = (file: any, type: string) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }

    if (type === "slider") {
      const newSlider = dataSlider.filter((item: any) => item.uid != file.uid);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await Base64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange: any = (
    info: UploadChangeParam<UploadFile>,
    type: string
  ) => {
    console.log("type:::", type);
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadSliderButton = (
    <div>
      {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
      const res = await UserManagementApi.createList(excelData);
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

  const handleFinishAddModal = async (values: any, addApi: any) => {
    const data = { ...values };
    console.log(">>> check values: ", data);
    console.log(">>> check data thumbnail: ", dataThumbnail);
    console.log(">>> check data slider: ", dataSlider);
    const modifySlider = dataSlider.map((item: any) => {
      return item.name;
    });
    data.slider = modifySlider;
    data.thumbnail = dataThumbnail[0]?.name;
    // return;
    setIsLoading(true);
    try {
      const dataReq = await addApi(data);
      const dataRes = dataReq;
      console.log("Success:", dataRes);
      setDataThumbnail([]);
      setDataSlider([]);
      setFileList([]);
      setFileThumbnailList([]);
      form.resetFields();
      setIsLoading(false);
      dispatch(reload(!toggle));
      handleCancel();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleFinishEditModal = async (values: any, editApi: any) => {
    const data = { ...values };
    // if (Array.isArray(dataThumbnail)) {
    //   setDataThumbnail(dataThumbnail.join(""));
    // }
    // // console.log(">>> check data slider: ", dataSlider);
    
    // const modifySlider = dataSlider.map((item: any) => {
    //   return item.name;
    // });
    // data.slider = modifySlider;
    
    console.log(">>> check data thumbnail: ", dataThumbnail);
    data.thumbnail = dataThumbnail[0]?.name;
    console.log(">>> check values: ", data);
    // return;
    setIsLoading(true);
    try {
      const res = await editApi(data);
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

  const renderModalComponent = () => {
    const renderFormItems = (fields: ICustomSearchBox[]) => {
      return fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field?.rules}
          hidden={field?.hidden}
        >
          {field?.inputType === "password" ? (
            <Input.Password />
          ) : field?.inputType === "price" ? (
            <InputNumber
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              suffix={"VNĐ"}
              style={{ width: "100%" }}
            />
          ) : field?.inputType === "select" ? (
            <Select
              options={options}
              onChange={handleSelectOption}
              // defaultValue={null}
              value={selectedValue}
              showSearch
              allowClear
            />
          ) : field?.inputType === "upload" ? (
            <div style={{ overflow: "auto" }}>
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={{ showRemoveIcon: false }}
                maxCount={1}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                customRequest={handleUploadThumbnailFile}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                defaultFileList={fileThumbnailList}
                // fileList={fileThumbnailList}
                onPreview={handlePreview}
              >
                {uploadButton}
              </Upload>
            </div>
          ) : field?.inputType === "uploadSlider" ? (
            <div style={{ overflow: "auto" }}>
              <Upload
                multiple
                name="slider"
                listType="picture-card"
                className="avatar-uploader"
                customRequest={handleUploadSliderFile}
                beforeUpload={beforeUpload}
                defaultFileList={fileList}
                onChange={(info) => handleChange(info, "slider")}
                onRemove={(file) => handleRemoveFile(file, "slider")}
                onPreview={handlePreview}
              >
                {uploadSliderButton}
              </Upload>
            </div>
          ) : field?.inputType === "number" ? (
            <InputNumber min={1} style={{ width: "100%" }} />
          ) : (
            <Input />
          )}
        </Form.Item>
      ));
    };

    switch (type) {
      case "addNew":
        return (
          <Modal
            title={`Thêm mới ${modalFields[0].title}`}
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => {
              handleCancel();
              setDataThumbnail([]);
              setDataSlider([]);
              setFileList([]);
              setFileThumbnailList([]);
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
              onFinish={(values) =>
                handleFinishAddModal(values, modalApi.create)
              }
              // onFinish={(values) => console.log(values)}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {renderFormItems(modalFields[0].field)}
            </Form>
          </Modal>
        );
      case "edit":
        return (
          <Modal
            title={`Chỉnh sửa ${modalFields[0].title}`}
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => {
              handleCancel();
              setDataThumbnail([]);
              setDataSlider([]);
              setFileList([]);
              setFileThumbnailList([]);
            }}
            okText={"Chỉnh sửa"}
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
              // onFinish={(values) => console.log(values)}
              onFinish={(values) =>
                handleFinishEditModal(values, modalApi.update)
              }
              autoComplete="off"
            >
              {renderFormItems(modalFields[0].field)}
            </Form>
          </Modal>
        );
      case "upload":
        const filteredColumns = columns.filter(
          (column: any) => column.key !== "action"
        );
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
            <div style={{ overflow: "auto", width: "50%" }}>
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
  return (
    <>
      {renderModalComponent()}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CustomModal;

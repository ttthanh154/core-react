import { Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import { useState, useEffect } from "react";
import { useAppSelector } from "@utils/hook";
import moment from "moment";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { v4 as uuidv4 } from "uuid";
interface ICustomDrawer {
  columns?: any;
  data?: any;
  onToggleDrawer: () => void;
}

const CustomDrawer = ({ columns, data, onToggleDrawer }: ICustomDrawer) => {
  const toggle = useAppSelector((state) => state.global.active);
  const detailViewData = data;
  // console.log(detailViewData?.thumbnail);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (detailViewData) {
      //Thumbnail is the first image of slider
        let imgThumbnail = {};
        let imgSlider: any[] = [];
      
      if (detailViewData?.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: detailViewData.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_API}/images/book/${
            detailViewData.thumbnail
          }`,
        };
      }
      if (detailViewData?.slider?.length > 0) {
        detailViewData.slider.map((item: any) => {
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_API}/images/book/${item}`,
          });
        });
      }
      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [detailViewData]);

  const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
    setFileList(newFileList);
  };

  const toggleDrawer = () => {
    onToggleDrawer();
  };

  const handleCancel = () => setPreviewOpen(false);

  const renderDrawer = () => {
    if (data) {
      const filteredColumns = columns?.filter(
        (column: any) => column.key !== "action"
      );

      return (
        <Drawer
          title="Xem chi tiết"
          placement="right"
          onClose={toggleDrawer}
          open={toggle}
        >
          <Descriptions title="Thông tin chi tiết" layout="vertical">
            {filteredColumns.map((column: any) => {
              const { dataIndex, title } = column;
              const value = data[dataIndex];
              const formattedValue =
                typeof value === "string" && moment(value).isValid()
                  ? moment(value).format("DD-MM-YYYY hh:mm:ss")
                  : value;
              return (
                <Descriptions.Item key={dataIndex} label={title}>
                  {formattedValue}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
          <Divider orientation="left"> Ảnh </Divider>
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            showUploadList={{ showRemoveIcon: false }}
          ></Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Drawer>
      );
    } else {
      return null;
    }
  };

  return <>{renderDrawer()}</>;
};

export default CustomDrawer;

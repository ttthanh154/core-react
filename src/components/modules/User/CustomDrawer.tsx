import { Descriptions, Drawer } from "antd";
import { IUser } from "@interface/user";
import { useAppSelector } from "@utils/hook";
import moment from "moment";
interface ICustomDrawer {
  data?: IUser;
  onToggleDrawer: () => void;
}
const CustomDrawer = ({ data, onToggleDrawer }: ICustomDrawer) => {
  const toggleDrawer = () => {
    onToggleDrawer();
  };

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={toggleDrawer}
        open={useAppSelector((state) => state.global.active)}
      >
        {/* <Descriptions title="User Info" items={data} />; */}
        <Descriptions title="User Info" layout="vertical">
          <Descriptions.Item label="Fullname">
            {data?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{data?.phone}</Descriptions.Item>
          <Descriptions.Item label="Role">
            {data?.role}
            <Descriptions.Item label="Active">
              {data?.isActive}
            </Descriptions.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(data?.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {moment(data?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default CustomDrawer;

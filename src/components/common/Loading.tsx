import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;
  return (
    <>
      <div className="spin__container">
        <Spin indicator={antIcon} className="spin__container-loading"></Spin>
      </div>
    </>
  );
};

export default Loading;

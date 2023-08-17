import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Notfound = () => (
  <Result
    status="403"
    title={<h2>403</h2>}
    subTitle={
      <>
        <h3>Bạn không có quyền truy cập vào trang này.</h3>
      </>
    }
    extra={
      <Link to={"/"} type="">
        <Button className="backward-btn">Về trang chủ</Button>
      </Link>
    }
  />
);

export default Notfound;

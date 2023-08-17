import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Notfound = () => (
  <Result
    status='404'
    title={<h2>404</h2>}
    subTitle={
      <>
        <h3>Xin lỗi trang bạn tìm không tồn tại hoặc đang bảo trì.</h3>
        <h3>Vui lòng quay lại sau!.</h3>
      </>
    }
    extra={
      <Link to={'/'} type=''>
        <Button className='backward-btn'>Về trang chủ</Button>
      </Link>
    }
  />
);

export default Notfound;

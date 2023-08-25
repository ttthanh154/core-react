import { Button, Form, Input } from "antd";
import { resetPage } from "@store/slice/globalSlice";
import { useAppDispatch } from "@utils/hook";

const SearchBox = ({ searchData }: any) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    searchData(values);
    dispatch(resetPage());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetTable = () => {
    return dispatch(resetPage());
  };
  return (
    <>
      <div className="searchBox">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="searchBox__field">
            <Form.Item label="Tên hiển thị" name="fullName">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Vui lòng chỉ nhập số",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="btnHandle">
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
              <Button type="default" htmlType="reset" onClick={resetTable}>
                Đặt lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SearchBox;

import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
} from "antd";
import { useState, useEffect } from "react";
import { IBook, IOptions } from "@interface/book";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import { IMetaResponse } from "@interface/tableCustomize";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import CustomPagination from "./User/CustomPagination";
import { IRatingRate } from "@interface/home";
import { loading } from "@store/slice/globalSlice";
const Home = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState<IBook[]>([]);
  const [dataSearch, setDataSearch] = useState<IBook>();
  const [options, setOptions] = useState<IOptions[]>([]);
  const [sort, setSort] = useState('-sold') 
  const dispatch = useAppDispatch();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const page = useAppSelector((state) => state.global.page);

  const params = `current=${page.current}&pageSize=${page.pageSize}&category=${
    dataSearch?.category || ""
  }&sort=${sort}`;

  const getBooks = async () => {
    dispatch(loading(true));
    try {
      const res = await BookManagementApi.getWithPaginate(params);
      const dataRes = res.data;
      // return
      const { meta, result } = dataRes;
      const dataSource = result.map((item: IBook, index: any) => ({
        _id: item._id, // Storing the actual _id separately
        mainText: item.mainText,
        category: item.category,
        author: item.author,
        price: item.price,
        thumbnail: `${import.meta.env.VITE_BACKEND_API}/images/book/${
          item.thumbnail
        }`,
        sold: item.sold,
        updatedAt: moment(item.updatedAt).format("DD-MM-YYYY HH:MM:SS"),
      }));

      setData(dataSource);
      setMeta(meta);
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

  const getCategory = async () => {
    const res = await BookManagementApi.getCategory();
    console.log("res::: ", res.data);
    const dataSelection = res.data.map((item: any) => ({
      value: item,
      label: item,
    }));
    setOptions(dataSelection);
  };

  const [form] = Form.useForm();
  const handleChangeFilter = (changedValues: any, values: any) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values: any) => {};

  const onChange = (key: any) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  const ratings: IRatingRate[] = [
    { value: 5, text: "" },
    { value: 4, text: "trở lên" },
    { value: 3, text: "trở lên" },
    { value: 2, text: "trở lên" },
    { value: 1, text: "trở lên" },
  ];

  useEffect(() => {
    getBooks();
    console.log(data);
  }, [page, dataSearch]);

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div
      className="homepage-container"
      style={{ maxWidth: 1440, margin: "0 auto" }}
    >
      <Row gutter={[20, 20]}>
        <Col md={4} sm={0} xs={0} className="left-col">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {" "}
              <FilterTwoTone /> Bộ lọc tìm kiếm
            </span>
            <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
          </div>
          <Form
            onFinish={onFinish}
            form={form}
            onValuesChange={(changedValues, values) =>
              handleChangeFilter(changedValues, values)
            }
          >
            <Form.Item
              name="category"
              label="Danh mục sản phẩm"
              labelCol={{ span: 24 }}
            >
              <Checkbox.Group>
                <Row>
                  {options?.map((item: IOptions) => (
                    <Col span={24} key={uuidv4()}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Divider />
            <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Form.Item name={["range", "from"]}>
                  <InputNumber
                    name="from"
                    min={0}
                    placeholder="đ TỪ"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item name={["range", "to"]}>
                  <InputNumber
                    name="to"
                    min={0}
                    placeholder="đ ĐẾN"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <Button
                  onClick={() => form.submit()}
                  style={{ width: "100%" }}
                  type="primary"
                >
                  Áp dụng
                </Button>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
              {ratings?.map((item: IRatingRate) => (
                <Rate
                key={item.value}
                  value={item.value}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
              ))}
            </Form.Item>
          </Form>
        </Col>
        <Col md={20} xs={24} className="right-col">
          <Row>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Row>
          <Row className="customize-row">
            {data?.map((item: IBook) => (
              <div className="column" key={item._id}>
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src={item.thumbnail} alt="thumbnail book" />
                  </div>
                  <div className="text">{item.mainText}</div>
                  <div className="price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </div>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 10 }}
                    />
                    <span>Đã bán {item.sold}</span>
                  </div>
                </div>
              </div>
            ))}
          </Row>
          <Divider />
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {/* <Pagination defaultCurrent={meta?.current} total={meta?.total} responsive /> */}
            <CustomPagination meta={meta} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

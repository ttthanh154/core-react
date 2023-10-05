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
} from "antd";
import { useState, useEffect } from "react";
import { IBook, IBookFields, IOptions } from "@interface/book";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import { IMetaResponse } from "@interface/tableCustomize";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import CustomPagination from "./User/CustomPagination";
import { IRatingRate } from "@interface/home";
import { loading } from "@store/slice/globalSlice";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [meta, setMeta] = useState<IMetaResponse>();
  const [data, setData] = useState<IBook[]>([]);
  const [options, setOptions] = useState<IOptions[]>([]);
  const [sort, setSort] = useState("-sold");
  const [filter, setFilter] = useState([]);
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.global.page);
  const navigate = useNavigate();
  const params = `current=${page.current}&pageSize=${page.pageSize}&category=${
    filter || ""
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
    console.log(">>> ", changedValues, values);
    if (changedValues?.category) {
      const array = values.category;
      array?.length > 0 ?? array.join();
      setFilter(array);
    }
  };

  const onFinish = (values: any) => {
    console.log(values?.range);

      let p = `&price>=${values?.range.from}&price<=${values?.range.to}`;
  
      if (values?.category) {
        let array = values.category;
        array?.length > 0 ?? array.join();
        array += p;
        setFilter(array);
    }
  };

  const onChange = (key: any) => {
    console.log(key);
    setSort(key);
  };

  const items = [
    {
      key: "-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "-price",
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

  const nonAccentVietnamese = (str:string) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

const convertSlug = (str:string) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

const handleRedirectBook = (book:IBook) => {
  console.log(book)
  const slug = convertSlug(book.mainText);
  navigate(`/detail-book/${slug}?id=${book._id}`)
}

  useEffect(() => {
    getBooks();
    console.log(data);
  }, [page, sort, filter]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div
      className="homepage-container"
      style={{ maxWidth: 1440, margin: "0 auto" }}
    >
      <Row gutter={[20, 20]}>
        {/* Left Column */}
        <Col md={4} sm={0} xs={0} className="left-col">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <FilterTwoTone /> Bộ lọc tìm kiếm
            </span>
            <ReloadOutlined
              title="Reset"
              onClick={() => {
                form.resetFields();
                setSort("-sold");
                setFilter([]);
              }}
            />
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
            <Form.Item label="Đánh giá" labelCol={{ span: 8 }}>
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
        {/* Right Column */}
        <Col  className="right-col" >
          <Row>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Row>
          <Row className="customize-row" >
            {data?.map((item: IBook) => (
              <div className="column" key={item._id} onClick={() => handleRedirectBook(item)
              }>
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
            <CustomPagination meta={meta} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

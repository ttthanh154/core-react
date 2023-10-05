import {
  Button,
  Empty,
  Form,
  Input,
  InputNumber,
  Radio,
  Result,
  Space,
  Steps,
} from "antd";
import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { funcUtils, useAppDispatch, useAppSelector } from "@utils/hook";
import { CartItem, changeQuantity, finishOrder } from "@store/slice/orderSlice";
import { useMemo, useState } from "react";
import { IOderUserInfo } from "@interface/order";
import { RadioChangeEvent } from "antd/es/radio";
import { reload } from "@store/slice/globalSlice";
import UserManagementApi from "@api/Admin/UserManagement/UserManagementApi";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.order.carts);
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [value, setValue] = useState("COD");
  const [form] = Form.useForm();
  
  const handleChangeInput = (e: any, _id: string) => {
    if (!_id) return;
    const dispatchData = {
      number: e,
      id: _id,
    };
    dispatch(changeQuantity(dispatchData));
  };

  const renderCartsItems = () => {
    if (carts.length !== 0) {
      const items = carts.map((item: CartItem) => {
        return (
          <div className="order-row" key={item._id}>
            <Space className="order-row__item">
              <img
                src={`${import.meta.env.VITE_BACKEND_API}/images/book/${
                  item.detail.thumbnail
                }`}
                style={{ width: "90px", height: "90px" }}
              />
              <div className="main-text">{item.detail.mainText}</div>
              <div className="number-data">
                <div className="price">
                  {funcUtils.formattedCurrency(item.detail.price)}
                </div>
                <InputNumber
                  min={1}
                  max={item.detail.quantity}
                  value={item.quantity}
                  onChange={(e) => handleChangeInput(e, item._id)}
                />
                <div className="total-price">
                  Tổng:&nbsp;
                  <span>
                    {funcUtils.formattedCurrency(
                      handleCalculating.calculateTotalPrice(
                        item.detail.price,
                        item.quantity
                      )
                    )}
                  </span>
                </div>
              </div>
              <DeleteOutlined className="remove" />
            </Space>
          </div>
        );
      });
      return items;
    } else {
      return <Empty description={"Không có sản phẩm trong giỏ hàng"} />;
    }
  };

  const renderOrderInfo = () => {
    switch (phase) {
      case 1:
        const handleDisabledButton = () => {
          return carts.length === 0 ? true : false
        }
        return (
          <>
            <div className="order-row">
              <div className="title">Tạm tính</div>
              <div className="temporary-total">
                {funcUtils.formattedCurrency(
                  handleCalculating.calculateTemporaryTotal()
                )}
              </div>
            </div>
            <div className="order-row">
              <div className="title">Tổng tiền</div>
              <div className="final-total">
                {
                funcUtils.formattedCurrency(
                  handleCalculating.finalTotalPrice()
                )}
              </div>
            </div>
            <div className="buy-btn" onClick={() => handlePurchase()}>
              <Button className="button" disabled={handleDisabledButton()}>Mua hàng ({carts.length})</Button>
            </div>
          </>
        );
        break;
      case 2:
        const onChange = (e: RadioChangeEvent) => {
          console.log("radio checked", e.target.value);
          setValue(e.target.value);
        };

        const onFinish = async (values: any) => {
          dispatch(reload(true));
          try {
            const formValues = form.getFieldsValue(); // Get all field values
            form.validateFields();

            const modifiedDetailData = carts.map((item: CartItem) => ({
              bookName: item.detail.mainText,
              quantity: item.quantity,
              _id: item._id,
            }));

            const modifiedData = {
              ...formValues,
              totalPrice: price,
              detail: modifiedDetailData,
            };

            const dataReq = await UserManagementApi.order(modifiedData);
            setPhase((prev) => prev + 1);
            dispatch(finishOrder());
            funcUtils.notify('Đặt hàng thành công', 'success');
          } catch (error) {
            dispatch(reload(false));
          }
        };

        const onFinishFailed = (errorInfo: any) => {
          console.log("Failed:", errorInfo);
        };
        return (
          <>
            <div className="order-row-phase2">
              <Form
                form={form}
                name="order-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<IOderUserInfo>
                  className="order__form_bloc"
                  label="Tên người nhận"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input required />
                </Form.Item>
                <Form.Item<IOderUserInfo>
                  className="order__form_bloc"
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input required />
                </Form.Item>
                <Form.Item<IOderUserInfo>
                  className="order__form_bloc"
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input.TextArea rows={4} required />
                </Form.Item>
                <Form.Item className="order__form_bloc" name="payment">
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="radio-row"
                  >
                    <Radio value={value}>Thanh toán khi nhận hàng</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </div>
            <div className="buy-btn" onClick={() => handlePurchase()}>
              <Button className="button">Đặt hàng ({carts.length})</Button>
            </div>
          </>
        );
        break;
      default:
        break;
    }
  };

  const handleCalculating = {
    calculateTotalPrice: (price: number, quantity: number) => {
      const totalPrice = price * quantity;
      return totalPrice;
    },

    calculateTemporaryTotal: () => {
      let totalPrice = 0;
      carts.forEach((item: CartItem) => {
        totalPrice =
          totalPrice +
          handleCalculating.calculateTotalPrice(
            item.detail.price,
            item.quantity
          );
      });
      return totalPrice;
    },

    finalTotalPrice: () => {
      let totalPrice = 0;
      totalPrice = handleCalculating.calculateTemporaryTotal();
      return totalPrice;
    },
  };

  const handlePurchase = () => {
    if (phase === 2) {
      form.submit();
    }
    if (phase === 1) {
      setPhase((prev) => prev + 1);
    }
  };

  const price = useMemo(() => handleCalculating.finalTotalPrice(), [carts]);

  return (
    <>
      <div className="order">
        <div className="order__header">
          <Steps
            size="small"
            current={phase}
            items={[
              {
                title: "Đơn hàng",
              },
              {
                title: "Đặt hàng",
              },
              {
                title: "Thanh toán",
              },
            ]}
          />
        </div>
        {phase !== 3 && (
          <div className="order__body">
            <div className="order-left-col">{renderCartsItems()}</div>
            <div className="order-right-col">{renderOrderInfo()}</div>
          </div>
        )}
        {phase === 3 && (
          <Result
            icon={<SmileOutlined />}
            title="Đơn hàng đã được đặt thành công!"
            extra={<Button type="primary" onClick={() => navigate('/history')}>Xem lịch sử</Button>}
          />
        )}
      </div>
    </>
  );
};

export default Order;

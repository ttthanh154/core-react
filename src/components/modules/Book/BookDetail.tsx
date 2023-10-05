import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomImageGallery from "../CustomImageGallery";
import BookSkeleton from "./BookSkeleton";
import BookManagementApi from "@api/Admin/BookManagement/BookManagement";
import { IBook } from "@interface/book";
import { Rate, InputNumber } from "antd";
import { useAppDispatch, funcUtils, useAppSelector } from "@utils/hook";
import { loading } from "@store/slice/globalSlice";
import { addBook } from "@store/slice/orderSlice";

const BookDetail = () => {
  const [bookData, setBookData] = useState<IBook>();
  const [images, setImages] = useState<any>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const params = searchParams.get("id");
  const isLogin = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const getDetailBook = async () => {
    let imgThumbnail = {};
    let imgSlider: any[] = [];
    dispatch(loading(true));
    try {
      const res = await BookManagementApi.getOne(params);
      if (res?.data?.thumbnail) {
        imgThumbnail = res?.data?.thumbnail;
      }
      if (res?.data?.slider) {
        imgSlider.push(res?.data?.slider);
      }

      setBookData(res.data);
      setImages([imgThumbnail, ...imgSlider]);
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

  const calculation = {
    handleDecrement: () => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    },
    handleIncrement: () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    },
  };

  const handleChangeInput = (e: any) => {
    setQuantity(e);
  };

  const handleAddToCart = (quantity: number, bookData: IBook) => {
    if (isLogin === false) {
      navigate("/login");
    } else {
      const modifyBookData = {
        _id: bookData._id,
        quantity: quantity,
        detail: bookData,
      };
      dispatch(addBook(modifyBookData));
      funcUtils.notify("Đã thêm vào giỏ hàng", "success");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getDetailBook();
    }, 500);
  }, []);

  return (
    <>
      <div className="detail-book">
        {bookData ? (
          <>
            <div className="detail-book__images">
              <CustomImageGallery data={images} />
            </div>
            <div className="detail-book__content">
              <div className="book__author">
                Tác giả: <span id="author">{bookData.author}</span>
              </div>
              <div className="book__mainText">{bookData.mainText}</div>
              <div className="book__rating">
                <Rate
                  key={5}
                  value={5}
                  disabled
                  style={{ color: "#ffce3d", fontSize: 15 }}
                />
                <span style={{ color: "#787878" }}>
                  Đã bán: {bookData.sold}
                </span>
              </div>
              <div className="book__price">
                <span>{funcUtils.formattedCurrency(bookData.price)}</span>
              </div>
              <div className="book__delivery">
                Vận chuyển: <span>Miễn phí vận chuyển</span>
              </div>
              <div className="book__quantity">
                Số lượng:
                <div className="qtt_btn">
                  <button onClick={calculation.handleDecrement}>-</button>
                  <InputNumber
                    size="small"
                    onChange={(e) => handleChangeInput(e)}
                    value={quantity}
                    max={bookData.quantity}
                  ></InputNumber>
                  <button onClick={calculation.handleIncrement}>+</button>
                </div>
              </div>
              <div className="book__order-btn">
                <button
                  className="order-btn-1"
                  // onClick={() => {
                  //   console.log("Mua ngay: ",quantity);
                  // }}
                >
                  Mua ngay
                </button>
                <button
                  className="order-btn-2"
                  onClick={() => handleAddToCart(quantity, bookData)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </>
        ) : (
          <BookSkeleton />
        )}
      </div>
    </>
  );
};

export default BookDetail;

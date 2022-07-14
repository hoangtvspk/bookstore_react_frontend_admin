import {
  CheckOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../models/cartItem";
import { GetOrder } from "../../models/getOrder";
import { adminRoutes } from "../../routes/routes";
interface OrderProps {
  order: GetOrder;
}

function OrderItems({ order }: OrderProps) {
  useEffect(() => {}, [order.id]);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const navigate = useNavigate();
  return (
    <>
      {order.orderItems?.length > 0 &&
        order.orderItems.map((item: CartItem) => (
          <>
            <div className="d-flex bg-white pl-5 pb-2">
              <img
                className="item-image"
                src={item.book.bookImages[0].image}
                onClick={() => {
                  navigate(
                    adminRoutes.bookEdit.replace(":id", item.book.id.toString())
                  );
                }}
                style={{ cursor: "pointer" }}
              ></img>
              <div className="item-name">
                <p
                  onClick={() => {
                    navigate(
                      adminRoutes.bookEdit.replace(
                        ":id",
                        item.book.id.toString()
                      )
                    );
                  }}
                  style={{ marginBottom: "0px", cursor: "pointer" }}
                >
                  {item.book.nameBook}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Thể loại: {item.book.category.nameCategory}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginBottom: 0,
                  }}
                >
                  Tác giả: {item.book.author}
                </p>
                <p style={{ fontSize: "12px", paddingTop: "0px" }}>
                  Còn: {item.book.quantity}
                </p>
              </div>

              {item.book.bookForEvents?.length < 1 && (
                <>
                  <div className="item-totalquantity">
                    <p style={{ marginBottom: "0px" }}>
                      {stringPrice(
                        item.book.price -
                          (item.book.price * item.book.discount) / 100
                      )}{" "}
                      ₫
                    </p>
                    {item.book.discount > 0 && (
                      <>
                        <p
                          style={{
                            color: "rgb(128, 128, 137) ",
                            marginTop: "8px",
                            fontSize: "15px",
                            textDecoration: "line-through",
                            paddingLeft: "8px",
                            marginBottom: "0px",
                          }}
                        >
                          {stringPrice(item.book.price)} ₫
                        </p>
                        <p className="discountt">-{item.book.discount}%</p>
                      </>
                    )}
                  </div>
                </>
              )}
              {item.book.bookForEvents?.length > 0 && (
                <>
                  {item.book.bookForEvents[0].discountPercentValue && (
                    <>
                      <div className="item-totalquantity">
                        <p style={{ marginBottom: "0px" }}>
                          {stringPrice(
                            item.book.price -
                              (item.book.price *
                                item.book.bookForEvents[0]
                                  .discountPercentValue) /
                                100
                          )}{" "}
                          ₫
                        </p>

                        <p
                          style={{
                            color: "rgb(128, 128, 137) ",
                            marginTop: "8px",
                            fontSize: "15px",
                            textDecoration: "line-through",
                            paddingLeft: "8px",
                            marginBottom: "0px",
                          }}
                        >
                          {stringPrice(item.book.price)} ₫
                        </p>
                        <p className="discountt">
                          -{item.book.bookForEvents[0].discountPercentValue}%
                        </p>
                      </div>
                    </>
                  )}
                  {item.book.bookForEvents[0].discountValue && (
                    <>
                      <div className="item-totalquantity">
                        <p style={{ marginBottom: "0px" }}>
                          {stringPrice(
                            item.book.price -
                              item.book.bookForEvents[0].discountValue
                          )}{" "}
                          ₫
                        </p>

                        <p
                          style={{
                            color: "rgb(128, 128, 137) ",
                            marginTop: "8px",
                            fontSize: "15px",
                            textDecoration: "line-through",
                            paddingLeft: "8px",
                            marginBottom: "0px",
                          }}
                        >
                          {stringPrice(item.book.price)} ₫
                        </p>
                        <p className="discountt">
                          -{item.book.bookForEvents[0].discountValue}%
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="item-quantity">
                <p style={{ marginBottom: "0px" }}>x{item.quantity}</p>
              </div>
              {item.book.bookForEvents?.length < 1 && (
                <>
                  <div className="item-totalprice">
                    {stringPrice(
                      item.quantity *
                        (item.book.price -
                          (item.book.price * item.book.discount) / 100)
                    )}{" "}
                    ₫
                  </div>
                </>
              )}
              {item.book.bookForEvents?.length > 0 && (
                <>
                  {item.book.bookForEvents[0].discountPercentValue && (
                    <div className="item-totalprice">
                      {stringPrice(
                        item.quantity *
                          (item.book.price -
                            (item.book.price *
                              item.book.bookForEvents[0].discountPercentValue) /
                              100)
                      )}{" "}
                      ₫
                    </div>
                  )}
                  {item.book.bookForEvents[0].discountValue && (
                    <div className="item-totalprice">
                      {stringPrice(
                        item.quantity *
                          (item.book.price -
                            item.book.bookForEvents[0].discountValue)
                      )}{" "}
                      ₫
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ))}
    </>
  );
}

export default OrderItems;

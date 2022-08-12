import { faBook, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NothingImg from "../../Image/bubbleNothing.jpg";
import { GetOrder } from "../../models/getOrder";
import { adminRoutes } from "../../routes/routes";

interface OrderProps {
  orderArray: GetOrder[];
}

function OrderReportList({ orderArray }: OrderProps) {
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  useEffect(() => {
    setCheckedOrders([]);
    console.log(checkedOrders);

    //loadPage();
  }, [orderArray]);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };

  const navigate = useNavigate();
  const [checkedOrders, setCheckedOrders] = useState<number[]>([]);

  return (
    <>
      <div>
        {orderArray.length > 0 && (
          <div
            className="min-vh"
            style={{
              minHeight: "calc(100vh - 200px)",
              backgroundColor: "#F5F5F5",
            }}
          >
            {orderArray
              .slice(0)
              .reverse()
              .map((purchaseItem: GetOrder) => (
                <div
                  className="bg-white "
                  style={{
                    paddingLeft: "100px",
                    paddingRight: "100px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderTop: "1px solid rgba(0,0,0,.125)",
                  }}
                >
                  <div className="purchase-order-info">
                    <div className="d-flex">
                      <p
                        style={{
                          fontSize: "14px",
                          paddingTop: "0px",
                          marginBottom: 0,

                          color: "	#555555",
                        }}
                      >
                        Mã đơn hàng: {purchaseItem.id} - Ngày:{" "}
                        {formatDate(purchaseItem.date.slice(0, 10))} - Giờ:{" "}
                        {purchaseItem.date.slice(11, 21)}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        paddingTop: "0px",
                        marginBottom: 0,
                        color: "#3366CC",
                      }}
                    >
                      {purchaseItem.status}
                    </p>
                  </div>
                  <div className="purchase-item-title">
                    <div className="item-image-header"></div>
                    <div className="item-name"></div>

                    <div
                      className="item-totalquantity"
                      style={{ borderLeft: "lightsteelblue solid 0.3px" }}
                    >
                      Đơn Giá
                    </div>
                    <div
                      className="item-quantity"
                      style={{ borderLeft: "lightsteelblue solid 0.3px" }}
                    >
                      Số lượng
                    </div>
                    <div
                      className="item-totalprice"
                      style={{ borderLeft: "lightsteelblue solid 0.3px" }}
                    >
                      Thành Tiền
                    </div>
                  </div>
                  <div
                    className="purchase-item "
                    onClick={() => {
                      navigate(
                        adminRoutes.orderDetail.replace(
                          ":id",
                          purchaseItem.id.toString()
                        )
                      );
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      alt="itemimage"
                      className="item-image"
                      src={purchaseItem.orderItems[0].book.bookImages[0].image}
                    ></img>
                    <div className="item-name">
                      <p style={{ marginBottom: "0px" }}>
                        {purchaseItem.orderItems[0].book.nameBook}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          paddingTop: "0px",
                          marginBottom: 0,
                        }}
                      >
                        Thể loại:{" "}
                        {purchaseItem.orderItems[0].book.category.nameCategory}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          paddingTop: "0px",
                          marginBottom: 0,
                        }}
                      >
                        Tác giả: {purchaseItem.orderItems[0].book.author}
                      </p>
                      <p style={{ fontSize: "12px", paddingTop: "0px" }}>
                        Còn: {purchaseItem.orderItems[0].book.quantity}
                      </p>
                    </div>

                    {purchaseItem.orderItems[0].book.bookForEvents?.length <
                      1 && (
                      <>
                        <div className="item-totalquantity">
                          <p style={{ marginBottom: "0px" }}>
                            {stringPrice(
                              purchaseItem.orderItems[0].book.price -
                                (purchaseItem.orderItems[0].book.price *
                                  purchaseItem.orderItems[0].book.discount) /
                                  100
                            )}{" "}
                            ₫
                          </p>
                          {purchaseItem.orderItems[0].book.discount > 0 && (
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
                                {stringPrice(
                                  purchaseItem.orderItems[0].book.price
                                )}{" "}
                                ₫
                              </p>
                              <p className="discountt">
                                -{purchaseItem.orderItems[0].book.discount}%
                              </p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {purchaseItem.orderItems[0].book.bookForEvents?.length >
                      0 && (
                      <>
                        {purchaseItem.orderItems[0].book.bookForEvents[0]
                          .discountPercentValue && (
                          <>
                            <div className="item-totalquantity">
                              <p style={{ marginBottom: "0px" }}>
                                {stringPrice(
                                  purchaseItem.orderItems[0].book.price -
                                    (purchaseItem.orderItems[0].book.price *
                                      purchaseItem.orderItems[0].book
                                        .bookForEvents[0]
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
                                {stringPrice(
                                  purchaseItem.orderItems[0].book.price
                                )}{" "}
                                ₫
                              </p>
                              <p className="discountt">
                                -
                                {
                                  purchaseItem.orderItems[0].book
                                    .bookForEvents[0].discountPercentValue
                                }
                                %
                              </p>
                            </div>
                          </>
                        )}
                        {purchaseItem.orderItems[0].book.bookForEvents[0]
                          .discountValue && (
                          <>
                            <div className="item-totalquantity">
                              <p style={{ marginBottom: "0px" }}>
                                {stringPrice(
                                  purchaseItem.orderItems[0].book.price -
                                    purchaseItem.orderItems[0].book
                                      .bookForEvents[0].discountValue
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
                                {stringPrice(
                                  purchaseItem.orderItems[0].book.price
                                )}{" "}
                                ₫
                              </p>
                              <p className="discountt">
                                -
                                {
                                  purchaseItem.orderItems[0].book
                                    .bookForEvents[0].discountValue
                                }
                                %
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <div className="item-quantity">
                      <p style={{ marginBottom: "0px" }}>
                        {purchaseItem.orderItems[0].quantity}
                      </p>
                    </div>
                    {purchaseItem.orderItems[0].book.bookForEvents?.length <
                      1 && (
                      <>
                        <div className="item-totalprice">
                          {stringPrice(
                            purchaseItem.orderItems[0].quantity *
                              (purchaseItem.orderItems[0].book.price -
                                (purchaseItem.orderItems[0].book.price *
                                  purchaseItem.orderItems[0].book.discount) /
                                  100)
                          )}{" "}
                          ₫
                        </div>
                      </>
                    )}
                    {purchaseItem.orderItems[0].book.bookForEvents?.length >
                      0 && (
                      <>
                        {purchaseItem.orderItems[0].book.bookForEvents[0]
                          .discountPercentValue && (
                          <div className="item-totalprice">
                            {stringPrice(
                              purchaseItem.orderItems[0].quantity *
                                (purchaseItem.orderItems[0].book.price -
                                  (purchaseItem.orderItems[0].book.price *
                                    purchaseItem.orderItems[0].book
                                      .bookForEvents[0].discountPercentValue) /
                                    100)
                            )}{" "}
                            ₫
                          </div>
                        )}
                        {purchaseItem.orderItems[0].book.bookForEvents[0]
                          .discountValue && (
                          <div className="item-totalprice">
                            {stringPrice(
                              purchaseItem.orderItems[0].quantity *
                                (purchaseItem.orderItems[0].book.price -
                                  purchaseItem.orderItems[0].book
                                    .bookForEvents[0].discountValue)
                            )}{" "}
                            ₫
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "13px",
                      paddingTop: "0px",
                      marginBottom: 0,
                    }}
                  >
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={faBook}
                      color="#3366FF"
                    ></FontAwesomeIcon>
                    {purchaseItem.orderItems.length} sản phẩm
                  </p>
                  <div className="d-flex justify-content-between pt-1">
                    <div style={{ zIndex: 1000, cursor: "grab" }}></div>
                    <div className="purchase-order-total-layout">
                      <div className="purchase-order-total-layout-border">
                        <p className="purchase-order-total-title">
                          <FontAwesomeIcon
                            className="mr-2"
                            style={{ color: "red" }}
                            icon={faDollarSign}
                          />
                          Tổng Đơn Hàng:{" "}
                        </p>
                        <p className="purchase-order-total">
                          {stringPrice(purchaseItem.totalPrice)} ₫
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {orderArray?.length === 0 && (
        <div
          className="bg-white p-4 orderDetail-background-height d-flex justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <div>
            <img alt="nothing" src={NothingImg} height="200" width="300" />
            <span
              className="d-flex justify-content-center"
              style={{ fontFamily: "Helvetica", fontSize: "18px" }}
            >
              Không có đơn hàng nào!
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderReportList;

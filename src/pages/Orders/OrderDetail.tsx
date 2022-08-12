import {
  faBan,
  faCheck,
  faDollarSign,
  faRemoveFormat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Spin, Steps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { GetOrder } from "../../models/getOrder";
import OrderItems from "./OrderItems";
import OrderStatus from "./OrderStatus";
import "./Orders.css";
import OrderAction from "./OrderActions";
function OrderDetail() {
  const [submitting, setSubmitting] = useState(false);
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({} as GetOrder);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const loadPage = () => {
    console.log(orderId);
    if (orderId) {
      httpClient()
        .get(APP_API.getOrderId.replace(":id", orderId))
        .then((res) => {
          console.log(res);
          setOrder(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  useEffect(() => {
    setSubmitting(true);
    loadPage();
  }, [orderId]);

  return (
    <Spin spinning={submitting}>
      <div
        className="bg-white p-4"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <OrderStatus order={order}></OrderStatus>
        <p
          style={{
            fontSize: "14px",
            paddingTop: "20px",
            marginBottom: 0,
            color: "	#555555",
          }}
        >
          Mã đơn hàng: {order.id}
        </p>
        <p
          style={{
            fontSize: "14px",
            paddingTop: "0px",
            marginBottom: 0,
            color: "	#555555",
          }}
        >
          Người nhận: {order.firstName}
        </p>
        <p
          style={{
            fontSize: "14px",
            paddingTop: "0px",
            marginBottom: 0,
            color: "	#555555",
          }}
        >
          Ngày: {formatDate(order?.date?.slice(0, 10) || "")} - Giờ:{" "}
          {order?.date?.slice(11, 21) || ""}
        </p>
        <p
          style={{
            fontSize: "14px",
            paddingTop: "0px",
            marginBottom: 0,
            color: "	#555555",
          }}
        >
          Địa Chỉ: {order.address}
        </p>
        <p
          style={{
            fontSize: "14px",
            paddingTop: "0px",
            marginBottom: 20,
            color: "	#555555",
          }}
        >
          {order.orderItems?.length} sản phẩm:
        </p>
        <OrderItems order={order}></OrderItems>
        <div className="d-flex justify-content-end">
          <div>
            <p
              style={{
                fontSize: "14px",
                paddingTop: "0px",
                marginBottom: 0,
                color: "	#555555",
              }}
            >
              Phí Vận Chuyển: 0đ
            </p>
            {order.coupon?.discountPercentValue && (
              <p
                style={{
                  fontSize: "14px",
                  paddingTop: "0px",
                  marginBottom: 0,
                  color: "	#555555",
                }}
              >
                Voucher: -{order.coupon.discountPercentValue}%
              </p>
            )}
            {order.coupon?.discountValue && (
              <p
                style={{
                  fontSize: "14px",
                  paddingTop: "0px",
                  marginBottom: 0,
                  color: "	#555555",
                }}
              >
                Voucher: -{order.coupon.discountValue}đ
              </p>
            )}
          </div>
        </div>
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
              {order.totalPrice &&
                order.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              ₫
            </p>
          </div>
        </div>

        <OrderAction loadPage={loadPage} order={order}></OrderAction>
      </div>
    </Spin>
  );
}

export default OrderDetail;

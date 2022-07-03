import {
  BookOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  RotateRightOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  faBan,
  faBook,
  faCheck,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, message, Popconfirm, Steps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { GetOrder } from "../../models/getOrder";
import { adminRoutes } from "../../routes/routes";
import OrderAction from "./OrderActions";
interface OrderProps {
  purchaseItem: GetOrder;
  loadPage: () => void;
}

function ListOrderItems({ purchaseItem, loadPage }: OrderProps) {
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  useEffect(() => {});

  return (
    <>
      <div
        className="order-array-item "
        style={{ paddingLeft: "100px", paddingRight: "100px" }}
      >
        <div className="purchase-order-info">
          <div className="d-flex">
            <Checkbox
              checked={checked}
              onChange={onChange}
              key={purchaseItem.id}
            ></Checkbox>
            <p
              style={{
                fontSize: "14px",
                paddingTop: "0px",
                marginBottom: 0,
                marginLeft: 20,
                color: "	#555555",
              }}
            >
              {purchaseItem.date}
            </p>
          </div>
          <p
            style={{
              fontSize: "16px",
              paddingTop: "0px",
              marginBottom: 0,
              color: "	#990000",
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
              adminRoutes.orderDetail.replace(":id", purchaseItem.id.toString())
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
              Thể loại: {purchaseItem.orderItems[0].book.category.nameCategory}
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
                  {stringPrice(purchaseItem.orderItems[0].book.price)} ₫
                </p>
                <p className="discountt">
                  -{purchaseItem.orderItems[0].book.discount}%
                </p>
              </>
            )}
          </div>

          <div className="item-quantity">
            <p style={{ marginBottom: "0px" }}>
              {purchaseItem.orderItems[0].quantity}
            </p>
          </div>
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
          <div style={{ zIndex: 1000, cursor: "grab" }}>
            <OrderAction order={purchaseItem} loadPage={loadPage}></OrderAction>
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
                {stringPrice(purchaseItem.totalPrice)} ₫
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListOrderItems;

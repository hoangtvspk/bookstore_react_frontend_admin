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
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, Popconfirm, Steps } from "antd";
import { useEffect, useState } from "react";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { GetOrder } from "../../models/getOrder";
interface OrderProps {
  order: GetOrder;
  loadPage: () => void;
}

function OrderAction({ order, loadPage }: OrderProps) {
  const [orderId, setOrderId] = useState(order.id);
  const onCancel = (id: number) => {
    if (id) {
      httpClient()
        .get(APP_API.cancelOrder.replace(":id", id.toString()))
        .then((res) => {
          console.log(res);
          message.success("Hủy Đơn Hàng Thành Công!");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Hủy Đơn Hàng Thất Bại!");
        })
        .finally();
    }
  };
  const onConfirm = () => {
    if (orderId) {
      httpClient()
        .post(APP_API.confirmOrder, [orderId])
        .then((res) => {
          console.log(res);
          message.success("Duyệt đơn hàng thành công");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Duyệt đơn hàng thất bại");
        })
        .finally();
    }
  };
  const onShip = () => {
    if (orderId) {
      httpClient()
        .post(APP_API.shipOrder, [orderId])
        .then((res) => {
          console.log(res);
          message.success("Xác nhận giao đơn hàng!");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Không thể giao đơn hàng này!");
        })
        .finally();
    }
  };
  const onFinishOrder = () => {
    if (orderId) {
      httpClient()
        .post(APP_API.finishOrder, [orderId])
        .then((res) => {
          console.log(res);
          message.success("Đơn hàng thành công!");
          loadPage();
        })
        .catch((err) => {
          console.log(err);
          message.error("Không thể xác nhận!");
        })
        .finally();
    }
  };
  useEffect(() => {
    setOrderId(order.id);
  }, [order.id]);
  const { Step } = Steps;
  return (
    <>
      <div className="d-flex justify-content-end">
        {order.status === "Chờ duyệt" && (
          <>
            <Popconfirm
              title="Duyệt đơn hàng này"
              onConfirm={() => {
                onConfirm();
              }}
              okText="Duyệt"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-accept mr-3">
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Duyệt Đơn
              </Button>
            </Popconfirm>
          </>
        )}
        {order.status === "Đang chuẩn bị" && (
          <>
            <Popconfirm
              title="Giao đơn hàng này"
              onConfirm={() => {
                onShip();
              }}
              okText="Giao"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-accept mr-3">
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Giao Hàng
              </Button>
            </Popconfirm>
          </>
        )}
        {(order.status == "Đang giao" || order.status == "Đã nhận") && (
          <>
            <Popconfirm
              title="Hoàn thành đơn hàng này"
              onConfirm={() => {
                onFinishOrder();
              }}
              okText="Hoàn thành"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-accept mr-3">
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Hoàn thành
              </Button>
            </Popconfirm>
          </>
        )}

        {order.status !== "Thành công" && order.status !== "Đã hủy" && (
          <>
            <Popconfirm
              title="Hủy đơn hàng này"
              onConfirm={() => {
                onCancel(order.id);
              }}
              okText="Hủy"
              cancelText="Không"
            >
              <Button htmlType="submit" className="btn-cancel">
                <FontAwesomeIcon className="mr-2" icon={faBan} />
                Huỷ Đơn
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </>
  );
}

export default OrderAction;

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
  id: number[];
  status: string;
  loadPage: () => void;
  disable: boolean;
}

function ListOrderAction({ id, status, loadPage, disable }: OrderProps) {
  const onCancel = (id: number[]) => {
    if (id) {
      id.map((idDel: number) => {
        httpClient()
          .get(APP_API.cancelOrder.replace(":id", idDel.toString()))
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
      });
    }
  };
  const onConfirm = () => {
    if (id) {
      httpClient()
        .post(APP_API.confirmOrder, id)
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
    if (id) {
      httpClient()
        .post(APP_API.shipOrder, id)
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
    if (id) {
      httpClient()
        .post(APP_API.finishOrder, id)
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
  useEffect(() => {}, id);
  const { Step } = Steps;
  return (
    <>
      <div className="d-flex justify-content-end">
        {status === "Chờ duyệt" && (
          <>
            <Popconfirm
              title="Duyệt đơn hàng này"
              onConfirm={() => {
                onConfirm();
              }}
              okText="Duyệt"
              cancelText="Không"
            >
              <Button
                htmlType="submit"
                className="btn-accept mr-3"
                disabled={disable}
              >
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Duyệt Đơn
              </Button>
            </Popconfirm>
          </>
        )}
        {status === "Đang chuẩn bị" && (
          <>
            <Popconfirm
              title="Giao đơn hàng này"
              onConfirm={() => {
                onShip();
              }}
              okText="Giao"
              cancelText="Không"
            >
              <Button
                htmlType="submit"
                className="btn-accept mr-3"
                disabled={disable}
              >
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Giao Hàng
              </Button>
            </Popconfirm>
          </>
        )}
        {(status == "Đang giao" || status == "Đã nhận") && (
          <>
            <Popconfirm
              title="Hoàn thành đơn hàng này"
              onConfirm={() => {
                onFinishOrder();
              }}
              okText="Hoàn thành"
              cancelText="Không"
            >
              <Button
                htmlType="submit"
                className="btn-accept mr-3"
                disabled={disable}
              >
                <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Hoàn thành
              </Button>
            </Popconfirm>
          </>
        )}

        {status !== "Thành công" && status !== "Đã hủy" && (
          <>
            <Popconfirm
              title="Hủy đơn hàng này"
              onConfirm={() => {
                onCancel(id);
              }}
              okText="Hủy"
              cancelText="Không"
            >
              <Button
                htmlType="submit"
                className="btn-cancel"
                disabled={disable}
              >
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

export default ListOrderAction;

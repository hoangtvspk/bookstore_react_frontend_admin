import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory-pie";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { adminRoutes } from "../../routes/routes";

function OrderStatus() {
  const [order, setOrder] = useState(0);
  const [cancelOrder, setCancelOrder] = useState(0);
  const [confirmOrder, setConfirmOrder] = useState(0);
  const [preparingOrder, setPreparingOrder] = useState(0);
  const [shippingOrder, setShippingOrder] = useState(0);
  const [receivedOrder, setReceivedOrder] = useState(0);
  const [successfulOrder, setSuccessfulOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const getOrder = () => {
    httpClient()
      .get(APP_API.getOrder)
      .then((res) => {
        setOrder(res.data.length);
      })
      .catch((err) => {});
  };
  const getCanceledOrder = () => {
    httpClient()
      .get(APP_API.getCanceledOrder)
      .then((res) => {
        setCancelOrder(res.data.length);
      })
      .catch((err) => {});
  };
  const getConfirmOrder = () => {
    httpClient()
      .get(APP_API.getConfirmOrder)
      .then((res) => {
        setConfirmOrder(res.data.length);
      })
      .catch((err) => {});
  };
  const getPreparingOrder = () => {
    httpClient()
      .get(APP_API.getPreparingOrder)
      .then((res) => {
        setPreparingOrder(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getShippingOrder = () => {
    httpClient()
      .get(APP_API.getShippingOrder)
      .then((res) => {
        setShippingOrder(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReceivedOrder = () => {
    httpClient()
      .get(APP_API.getReceivedOrder)
      .then((res) => {
        setReceivedOrder(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSuccessfulOrder = () => {
    setLoading(true);
    httpClient()
      .get(APP_API.getSuccessfulOrder)
      .then((res) => {
        setSuccessfulOrder(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  const myData = [
    { x: "Hoàn Thành", y: successfulOrder },
    {
      x: "Tiến Hành",
      y: preparingOrder + confirmOrder + shippingOrder + receivedOrder,
    },
    {
      x: "Đã Hủy",
      y: cancelOrder,
    },
  ];
  useEffect(() => {
    getCanceledOrder();
    getConfirmOrder();
    getPreparingOrder();
    getReceivedOrder();
    getShippingOrder();
    getSuccessfulOrder();
  }, []);

  return (
    <Spin spinning={loading}>
      <div
        className="bg-white  rounded-3 p-4"
        style={{
          width: "440px",
          border: "1px solid rgba(0,0,0,.125)",
        }}
      >
        <div className="d-flex align-items-center">
          <p style={{ margin: "0 10px" }}>
            <FontAwesomeIcon color="#FFCC33" className="mr-2" icon={faBook} />
            Hoàn Thành:
          </p>
          <p style={{ margin: "0 0", color: "blue" }}>{successfulOrder}</p>
          <p style={{ margin: "0 10px", paddingLeft: "10px" }}>
            <FontAwesomeIcon color="#FFCC66" className="mr-2" icon={faBook} />
            Tiến Hành:
          </p>
          <p style={{ margin: "0 0", color: "blue" }}>
            {preparingOrder + confirmOrder + shippingOrder + receivedOrder}
          </p>
          <p style={{ margin: "0 10px", paddingLeft: "10px" }}>
            <FontAwesomeIcon color="#FFCC99" className="mr-2" icon={faBook} />
            Đã Hủy:
          </p>
          <p style={{ margin: "0 0", color: "blue" }}>{cancelOrder}</p>
        </div>
        <div
          style={{
            borderBottom: "0.5px solid rgba(0,0,0,.125)",
          }}
        >
          <div className="d-flex justify-content-center">
            <div
              style={{
                width: "380px",
                height: "220px",
              }}
            >
              <VictoryPie
                padAngle={10}
                innerRadius={80}
                data={myData}
                height={380}
                colorScale={["#FFCC33", "#FFCC66", "#FFCC99"]}
                style={{
                  labels: {
                    fontSize: 20,

                    fontFamily: "Helvetica",
                  },
                }}
              />
            </div>
          </div>
          <p className="d-flex justify-content-center">
            Biểu Đồ Tình Trạng Đơn Hàng
          </p>
        </div>
        <div className="mt-1 d-flex justify-content-between mb-0">
          <Link className="mb-0" to={adminRoutes.order}>
            Quản Lý Đơn Hàng
          </Link>
          <p className="mb-0">
            Tổng Đơn Hàng:{" "}
            {preparingOrder +
              confirmOrder +
              shippingOrder +
              receivedOrder +
              successfulOrder +
              cancelOrder}{" "}
          </p>
        </div>
      </div>
    </Spin>
  );
}

export default OrderStatus;

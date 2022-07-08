import { Collapse, message, Select, Spin, Tabs } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddressOrder } from "../../models/addressOrder";
import { GetOrder } from "../../models/getOrder";
import OrderList from "./OrderList";
import "./Orders.css";

const { Panel } = Collapse;

const DEFAULT_PAGE_SIZE = 30;

function Orders() {
  const [submitting, setSubmitting] = useState(false);
  const [orderArray, setOrderArray] = useState<GetOrder[]>([]);
  const [confirmOrderArray, setConfirmOrderArray] = useState<GetOrder[]>([]);
  const [prepareOrderArray, setPrepareOrderArray] = useState<GetOrder[]>([]);
  const [shippingOrderArray, setShippingOrderArray] = useState<GetOrder[]>([]);
  const [receivedOrderArray, setReceivedOrderArray] = useState<GetOrder[]>([]);
  const [successfulOrderArray, setSuccessfulOrderArray] = useState<GetOrder[]>(
    []
  );
  const [canceledOrderArray, setCanceledOrderArray] = useState<GetOrder[]>([]);

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const getOrder = () => {
    httpClient()
      .get(APP_API.getOrder)
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getCanceledOrder = () => {
    httpClient()
      .get(APP_API.getCanceledOrder)
      .then((res) => {
        console.log(res);
        setCanceledOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getConfirmOrder = () => {
    httpClient()
      .get(APP_API.getConfirmOrder)
      .then((res) => {
        console.log(res);
        setConfirmOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getPreparingOrder = () => {
    httpClient()
      .get(APP_API.getPreparingOrder)
      .then((res) => {
        console.log(res);
        setPrepareOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getShippingOrder = () => {
    httpClient()
      .get(APP_API.getShippingOrder)
      .then((res) => {
        console.log(res);
        setShippingOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getReceivedOrder = () => {
    httpClient()
      .get(APP_API.getReceivedOrder)
      .then((res) => {
        console.log(res);
        setReceivedOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };
  const getSuccessfulOrder = () => {
    httpClient()
      .get(APP_API.getSuccessfulOrder)
      .then((res) => {
        console.log(res);
        setSuccessfulOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };

  const { TabPane } = Tabs;
  const loadPage = () => {
    getOrder();
    getConfirmOrder();
    getPreparingOrder();
    getShippingOrder();
    getSuccessfulOrder();
    getReceivedOrder();
    getCanceledOrder();
  };
  useEffect(() => {
    setSubmitting(true);
    loadPage();
  }, []);

  return (
    <Spin spinning={submitting}>
      <Tabs defaultActiveKey="1" className="bg-white">
        <TabPane tab="Tất Cả" key="1">
          <OrderList
            orderArray={orderArray}
            loadPage={loadPage}
            status="Thành công"
          />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chờ Xác Nhận&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          key="2"
        >
          <OrderList
            orderArray={confirmOrderArray}
            loadPage={loadPage}
            status="Chờ duyệt"
          />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đang Chuẩn Bị&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          key="3"
        >
          <OrderList
            orderArray={prepareOrderArray}
            loadPage={loadPage}
            status="Đang chuẩn bị"
          />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đang Giao&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          key="4"
        >
          <OrderList
            orderArray={shippingOrderArray}
            loadPage={loadPage}
            status="Đang giao"
          />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đã Nhận&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          key="5"
        >
          <OrderList
            orderArray={receivedOrderArray}
            loadPage={loadPage}
            status="Đã nhận"
          />
        </TabPane>
        <TabPane
          tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hoàn Thành&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          key="6"
        >
          <OrderList
            orderArray={successfulOrderArray}
            loadPage={loadPage}
            status="Thành công"
          />
        </TabPane>
        <TabPane tab="Đã Hủy" key="7">
          <OrderList
            orderArray={canceledOrderArray}
            loadPage={loadPage}
            status="Thất Bại"
          />
        </TabPane>
      </Tabs>
    </Spin>
  );
}

export default Orders;

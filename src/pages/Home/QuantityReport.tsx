import { faSellcast } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faCoins,
  faFileInvoiceDollar,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isFulfilled } from "@reduxjs/toolkit";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { BestSelling } from "../../models/bestSelling";
import { ReportResponse } from "../../models/reportRes";
import { adminRoutes } from "../../routes/routes";

function QuantityReport() {
  const [totalQuantityBooks, setTotalQuantityBooks] = useState(0);
  const [totalSaled, setTotalSaled] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const stringPrice = (number: number) => {
    if (number > 0) {
      const newNumber = number.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return newNumber;
    }
    return number;
  };
  const onLoadReport = () => {
    httpClient()
      .get(APP_API.reportByEveryYear)
      .then((res) => {
        const reportData = res.data as ReportResponse;
        console.log(reportData);

        setTotalQuantityBooks(reportData.sumQuantity);
        setTotalSaled(reportData.sumSaled);
      });
  };
  const onLoadUsers = () => {
    httpClient()
      .get(APP_API.users)
      .then((res) => {
        setTotalUsers(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onLoadBooks = () => {
    httpClient()
      .get("/books")
      .then((res) => {
        setTotalBooks(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    onLoadUsers();
    onLoadBooks();
    onLoadReport();
  });
  const { Step } = Steps;
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div
          className="bg-white rounded-3"
          style={{
            border: "0.5px solid #339933",
            width: "280px",
            height: "120px",
            padding: "20px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.125)" }}
          >
            <FontAwesomeIcon
              color="#339933"
              size="4x"
              icon={faUser}
            ></FontAwesomeIcon>
            <div>
              <p
                className="d-flex justify-content-end"
                style={{ color: "#9a9a9a", margin: 0, padding: 0 }}
              >
                Số Người Dùng
              </p>
              <p
                className="d-flex justify-content-end"
                style={{ fontSize: "25px", margin: 0, padding: 0 }}
              >
                {totalUsers}
              </p>
            </div>
          </div>
          <div className="mt-1">
            <Link to={adminRoutes.users}>Quản lý người dùng</Link>
          </div>
        </div>
        <div
          className="bg-white rounded-3"
          style={{
            border: "0.5px solid #FF9900",
            width: "280px",
            height: "120px",
            padding: "20px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.125)" }}
          >
            <FontAwesomeIcon
              color="#FF9900"
              size="4x"
              icon={faBook}
            ></FontAwesomeIcon>
            <div>
              <p
                className="d-flex justify-content-end"
                style={{ color: "#9a9a9a", margin: 0, padding: 0 }}
              >
                Tổng Đầu Sách
              </p>
              <p
                className="d-flex justify-content-end"
                style={{ fontSize: "25px", margin: 0, padding: 0 }}
              >
                {totalBooks}
              </p>
            </div>
          </div>
          <div className="mt-1">
            <Link to={adminRoutes.books}>Quản lý sản phẩm</Link>
          </div>
        </div>
        <div
          className="bg-white rounded-3"
          style={{
            border: "0.5px solid #CC00FF",
            width: "280px",
            height: "120px",
            padding: "20px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.125)" }}
          >
            <FontAwesomeIcon
              color="#CC00FF"
              size="4x"
              icon={faFileInvoiceDollar}
            ></FontAwesomeIcon>
            <div>
              <p
                className="d-flex justify-content-end"
                style={{ color: "#9a9a9a", margin: 0, padding: 0 }}
              >
                Số Lượng Đã Bán
              </p>
              <p
                className="d-flex justify-content-end"
                style={{ fontSize: "25px", margin: 0, padding: 0 }}
              >
                {totalQuantityBooks}
              </p>
            </div>
          </div>
          <div className="mt-1">
            <Link to={adminRoutes.books}>Quản lý sản phẩm</Link>
          </div>
        </div>
        <div
          className="bg-white rounded-3"
          style={{
            border: "0.5px solid #0099FF",
            width: "280px",
            height: "120px",
            padding: "20px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.125)" }}
          >
            <FontAwesomeIcon
              color="#0099FF"
              size="4x"
              icon={faCoins}
            ></FontAwesomeIcon>
            <div>
              <p
                className="d-flex justify-content-end"
                style={{ color: "#9a9a9a", margin: 0, padding: 0 }}
              >
                Tổng Doanh Thu
              </p>
              <p
                className="d-flex justify-content-end"
                style={{ fontSize: "25px", margin: 0, padding: 0 }}
              >
                {stringPrice(totalSaled)} VNĐ
              </p>
            </div>
          </div>
          <div className="mt-1">
            <Link to={adminRoutes.order}>Quản lý đơn hàng</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuantityReport;

import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import BestSellingTable from "./BestSellingTable";
import "./Home.css";
import MonthlyReport from "./MonthlyReport";
import QuantityReport from "./QuantityReport";
import BestSellerIcon from "../../Image/topSeller.jpg";
import OrderStatus from "./OrderStatus";

const Home: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <QuantityReport></QuantityReport>
      <div className="d-flex mb-3 justify-content-between">
        <MonthlyReport></MonthlyReport>
        <OrderStatus></OrderStatus>
      </div>

      <div
        className="bg-white rounded-3 mt-3 p-4"
        style={{ border: "1px solid rgba(0,0,0,.125)" }}
      >
        <h3>
          <img
            src={BestSellerIcon}
            width={30}
            height={30}
            style={{
              objectFit: "cover",
              marginRight: "10px",
            }}
          ></img>
          Top 20 Sản Phẩm Bán Chạy
        </h3>
        <BestSellingTable />
      </div>
    </>
  );
};

export default Home;

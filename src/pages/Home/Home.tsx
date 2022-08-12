import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import BestSellingTable from "./BestSellingTable";
import "./Home.css";
import MonthlyReport from "./MonthlyReport";
import QuantityReport from "./QuantityReport";
import BestSellerIcon from "../../Image/topSeller.jpg";
import OrderStatus from "./OrderStatus";
import OutOfStock from "./OutOfStock";
import Inventory from "./Inventory";

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
        <BestSellingTable />
      </div>
      <div
        className="bg-white rounded-3 mt-3 p-4"
        style={{ border: "1px solid rgba(0,0,0,.125)" }}
      >
        <OutOfStock />
      </div>
      <div
        className="bg-white rounded-3 mt-3 p-4"
        style={{ border: "1px solid rgba(0,0,0,.125)" }}
      >
        <Inventory />
      </div>
    </>
  );
};

export default Home;

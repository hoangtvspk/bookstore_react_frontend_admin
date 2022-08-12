import { faBook, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, message, Select, Spin, Tabs } from "antd";
import { SelectValue } from "antd/lib/select";
import React, { useEffect, useRef, useState } from "react";
import {
  HorizontalGridLines,
  LabelSeries,
  LineMarkSeries,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Report } from "../../models/report";
import { ReportResponse } from "../../models/reportRes";
import "./Home.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import { GetOrder } from "../../models/getOrder";
import OrderReportList from "./OrderList";
import { useReactToPrint } from "react-to-print";

const OrderReport: React.FC = () => {
  const [reportArray, setReportArray] = useState<any[]>([]);
  const [XreportArray, setXReportArray] = useState("Ngày");
  const [labelData, setLabelData] = useState<any[]>([]);
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(1);
  const BarSeries = VerticalBarSeries;
  const { Option } = Select;

  const yearArray = [2019, 2020, 2021, 2022, 2023, 2024];
  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [yearReport, setYearReport] = useState(false);
  const [everyYearReport, setEveryYearReport] = useState(false);
  const months = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const [chartTitle, setchartTitle] = useState(
    "Doanh Thu Tháng " +
      (new Date().getMonth() + 1).toString() +
      "-" +
      new Date().getFullYear()
  );
  const componentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
    documentTitle: chartTitle,
  });
  const stringPrice = (number: number) => {
    if (number > 0) {
      const newNumber = number.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return newNumber + " (đ)";
    }
    return number;
  };
  const [sumSaled, setSumSaled] = useState(0);
  const [sumQuantity, setSumquantity] = useState(0);
  const [orderArray, setOrderArray] = useState<GetOrder[]>([]);
  const getOrderByMonth = (month: number, year: number) => {
    httpClient()
      .get(
        APP_API.getOrderByMonth
          .replace(":year", year.toString())
          .replace(":month", month.toString())
      )
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => {});
  };
  const getOrderByYear = (yeah: number) => {
    httpClient()
      .get(APP_API.getOrderByYear.replace(":year", year.toString()))
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => {});
  };
  const getOrderByEveryYear = () => {
    httpClient()
      .get(APP_API.getOrderByEveryYear)
      .then((res) => {
        console.log(res);
        setOrderArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => {});
  };
  const onLoadReportMonth = (yearr: number, monthh: number) => {
    httpClient()
      .get(
        APP_API.reportByMonth
          .replace(":year", yearr?.toString())
          .replace(":month", monthh?.toString())
      )
      .then((res) => {
        const reportData = res.data as ReportResponse;
        console.log(reportData);
        setReportArray([
          ...reportData.chartReportResponses.map((report: Report) => ({
            x: report.time,
            y: report.saled,
          })),
        ]);
        setSumSaled(reportData.sumSaled);
        setSumquantity(reportData.sumQuantity);
        setLabelData([
          ...reportData.chartReportResponses
            .map((report: Report) => ({
              x: report.time,
              y: stringPrice(report.saled),
            }))
            .map((d, idx) => ({
              x: d.x,
              y: reportData.chartReportResponses[idx].saled,
              label: d.y,
            })),
        ]);
      });
  };

  const onLoadReportYear = (yearr: number) => {
    httpClient()
      .get(APP_API.reportByYear.replace(":year", yearr?.toString()))
      .then((res) => {
        const reportData = res.data as ReportResponse;
        console.log(reportData);
        setReportArray([
          ...reportData.chartReportResponses.map((report: Report) => ({
            x: report.time,
            y: report.saled,
          })),
        ]);
        setSumSaled(reportData.sumSaled);
        setSumquantity(reportData.sumQuantity);
        setLabelData([
          ...reportData.chartReportResponses
            .map((report: Report) => ({
              x: report.time,
              y: stringPrice(report.saled),
            }))
            .map((d, idx) => ({
              x: d.x,
              y: reportData.chartReportResponses[idx].saled,
              label: d.y,
            })),
        ]);
        console.log(month);
        console.log(year);
      });
  };

  const onLoadReportEveryYear = () => {
    httpClient()
      .get(APP_API.reportByEveryYear)
      .then((res) => {
        const reportData = res.data as ReportResponse;
        console.log(reportData);
        setReportArray([
          ...reportData.chartReportResponses.map((report: Report) => ({
            x: report.time,
            y: report.saled,
          })),
        ]);
        setSumSaled(reportData.sumSaled);
        setSumquantity(reportData.sumQuantity);
        setLabelData([
          ...reportData.chartReportResponses
            .map((report: Report) => ({
              x: report.time,
              y: report.saled,
            }))
            .map((d, idx) => ({
              x: d.x,
              y: reportData.chartReportResponses[idx].saled,
              label: d.y,
            })),
        ]);
        console.log(month);
        console.log(year);
      });
  };

  useEffect(() => {
    onLoadReportMonth(new Date().getFullYear(), new Date().getMonth() + 1);
    getOrderByMonth(new Date().getMonth() + 1, new Date().getFullYear());
  }, []);

  const onYearChange = (event: SelectValue): void => {
    if (event && event == "all") {
      setchartTitle("Doanh Thu Hàng Năm");
      onLoadReportEveryYear();
      getOrderByEveryYear();
      setEveryYearReport(true);
      setXReportArray("Năm");
    }
    if (event && event != "all" && yearReport) {
      setchartTitle("Doanh Thu Từng Tháng Năm " + parseInt(event.toString()));
      setEveryYearReport(false);
      onLoadReportYear(parseInt(event.toString()) || 2022);
      getOrderByYear(parseInt(event.toString()) || 2022);
      setXReportArray("Tháng");
    }
    if (event && event != "all" && !yearReport) {
      setchartTitle(
        "Doanh Thu Tháng " + months[month] + "-" + parseInt(event.toString())
      );
      setXReportArray("Ngày");
      setEveryYearReport(false);
      setYear(parseInt(event.toString()) || 2022);
      onLoadReportMonth(parseInt(event.toString()) || 2022, month);
      getOrderByMonth(month, parseInt(event.toString()) || 2022);
    }
  };
  const onMonthChange = (event: SelectValue): void => {
    if (event) {
      setMonth(parseInt(event.toString()) || 2022);
    }
    if (event == "all" && !everyYearReport) {
      setYearReport(true);
      getOrderByYear(year);
      onLoadReportYear(year);
      setchartTitle("Doanh Thu Từng Tháng Năm " + year);
      setXReportArray("Tháng");
    }
    if (event && event != "all" && !everyYearReport) {
      setYearReport(false);
      onLoadReportMonth(year, parseInt(event.toString()) || 1);
      getOrderByMonth(parseInt(event.toString()) || 1, year);
      setchartTitle(
        "Doanh Thu Tháng " + months[parseInt(event.toString())] + "-" + year
      );
      setXReportArray("Ngày");
    }
  };

  if (reportArray.length == 0) return <Spin spinning={true}></Spin>;

  return (
    <div
      className="bg-white rounded-3"
      style={{ border: "1px solid rgba(0,0,0,.125)" }}
    >
      <div
        className="d-flex pt-3  justify-content-end"
        style={{ paddingRight: "80px" }}
      >
        <Button
          style={{ backgroundColor: "#0099FF", color: "white" }}
          onClick={() => handlePrint()}
        >
          Xuất Báo Cáo
        </Button>
      </div>
      <div ref={componentRef}>
        <PageTitle>Biểu Đồ Thống Kê Doanh Thu</PageTitle>
        <div className="d-flex justify-content-between">
          <div className="d-flex  p-lg-4  align-items-center">
            <p style={{ margin: "0 10px", paddingLeft: "50px" }}>Năm:</p>
            <Select
              allowClear
              onChange={(e) => {
                onYearChange(e);
              }}
              defaultValue={new Date().getFullYear()}
              style={{ width: "100px" }}
            >
              <Option value="all">Tất Cả</Option>
              {yearArray.length > 0 &&
                yearArray.map((year: any) => (
                  <Option value={year}>
                    <p style={{ marginBottom: "0" }}>{year}</p>
                  </Option>
                ))}
            </Select>
            <p style={{ margin: "0 10px", paddingLeft: "30px" }}>Tháng:</p>
            <Select
              allowClear
              onChange={(e) => {
                onMonthChange(e);
              }}
              defaultValue={new Date().getMonth() + 1}
              style={{ width: "100px" }}
            >
              <Option value="all">Cả Năm</Option>
              {monthArray.length > 0 &&
                monthArray.map((month: any) => (
                  <Option value={month}>
                    <p style={{ marginBottom: "0" }}>{month}</p>
                  </Option>
                ))}
            </Select>
          </div>

          <div
            className="d-flex align-items-center"
            style={{ paddingRight: "80px" }}
          >
            <p style={{ margin: "0 10px", paddingLeft: "200px" }}>
              <FontAwesomeIcon
                color="#0099FF"
                className="mr-2"
                icon={faMoneyBillAlt}
              />
              Tổng Doanh Thu:
            </p>
            <p style={{ margin: "0 0", color: "blue", fontSize: "18px" }}>
              {sumSaled.toLocaleString()}đ
            </p>

            <p style={{ margin: "0 10px", paddingLeft: "30px" }}>
              <FontAwesomeIcon color="#FF9900" className="mr-2" icon={faBook} />
              Đã Bán:
            </p>
            <p style={{ margin: "0 0", color: "blue", fontSize: "18px" }}>
              {sumQuantity} cuốn sách
            </p>
          </div>
        </div>
        <XYPlot
          animation
          xType="ordinal"
          width={1100}
          height={400}
          color="#0099FF"
          stroke="#0099FF"
          style={{ marginLeft: "50px", fontSize: "12px" }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title={XreportArray} />
          <YAxis title="Doanh Thu (đ)" width={90} left={-25} />
          <LineMarkSeries
            // barWidth={0.8}
            className="vertical-bar-series-example"
            data={reportArray}
          />
          <LabelSeries data={labelData} />
        </XYPlot>{" "}
        <div className="d-flex align-items-center justify-content-center">
          <p>{chartTitle}</p>
        </div>
        <div style={{ paddingRight: "100px", paddingLeft: "100px" }}>
          <Divider></Divider>
        </div>
        <PageTitle>{orderArray.length} Đơn Hàng</PageTitle>
        <OrderReportList orderArray={orderArray} />
      </div>
    </div>
  );
};

export default OrderReport;

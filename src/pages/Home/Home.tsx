import { Select, Spin } from "antd";
import { SelectValue } from "antd/lib/select";
import { report } from "process";
import React, { useEffect, useState } from "react";
import {
  HorizontalGridLines,
  LabelSeries,
  LineMarkSeries,
  LineSeries,
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
import BestSellingTable from "./BestSellingTable";
import { Tabs } from "antd";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faDollarSign,
  faMoneyBill,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";

const { TabPane } = Tabs;

const Home: React.FC = () => {
  const [reportArray, setReportArray] = useState<any[]>([]);
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [chartTitle, setchartTitle] = useState(
    "Daily Saled Report Of " + months[month] + "-" + year
  );
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
        setSumSaled(reportData.sumQuantity);
        setSumquantity(reportData.sumSaled);
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
    onLoadReportMonth(2022, 1);
  }, []);

  const onYearChange = (event: SelectValue): void => {
    if (event && event == "all") {
      setchartTitle("Annual Saled Report");
      onLoadReportEveryYear();
      setEveryYearReport(true);
    }
    if (event && event != "all" && yearReport) {
      setchartTitle("Monthly Saled Report Of " + parseInt(event.toString()));
      setEveryYearReport(false);
      onLoadReportYear(parseInt(event.toString()) || 2022);
    }
    if (event && event != "all" && !yearReport) {
      setchartTitle(
        "Daily Saled Report Of " +
          months[month] +
          "-" +
          parseInt(event.toString())
      );
      setEveryYearReport(false);
      setYear(parseInt(event.toString()) || 2022);
      onLoadReportMonth(parseInt(event.toString()) || 2022, month);
    }
  };
  const onMonthChange = (event: SelectValue): void => {
    if (event) {
      setMonth(parseInt(event.toString()) || 2022);
    }
    if (event == "all" && !everyYearReport) {
      setYearReport(true);
      onLoadReportYear(year);
      setchartTitle("Monthly Saled Report Of " + year);
    }
    if (event && event != "all" && !everyYearReport) {
      setYearReport(false);
      onLoadReportMonth(year, parseInt(event.toString()) || 1);
      setchartTitle(
        "Daily Saled Report Of " +
          months[parseInt(event.toString())] +
          "-" +
          year
      );
    }
  };

  if (reportArray.length == 0) return <Spin spinning={true}></Spin>;
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Saled Report" key="1">
          <div className="d-flex p-lg-4 align-items-center">
            <p style={{ margin: "0 10px", paddingLeft: "100px" }}>Year:</p>
            <Select
              allowClear
              onChange={(e) => {
                onYearChange(e);
              }}
              defaultValue={2022}
            >
              <Option value="all">All</Option>
              {yearArray.length > 0 &&
                yearArray.map((year: any) => (
                  <Option value={year}>
                    <p style={{ marginBottom: "0" }}>{year}</p>
                  </Option>
                ))}
            </Select>
            <p style={{ margin: "0 10px", paddingLeft: "100px" }}>Month:</p>
            <Select
              allowClear
              onChange={(e) => {
                onMonthChange(e);
              }}
              defaultValue={1}
            >
              <Option value="all">All</Option>
              {monthArray.length > 0 &&
                monthArray.map((month: any) => (
                  <Option value={month}>
                    <p style={{ marginBottom: "0" }}>{month}</p>
                  </Option>
                ))}
            </Select>

            <p style={{ margin: "0 10px", paddingLeft: "300px" }}>
              <FontAwesomeIcon className="mr-2" icon={faMoneyBillAlt} />
              Total Saled:
            </p>
            <p style={{ margin: "0 0", color: "blue", fontSize: "18px" }}>
              {sumSaled.toLocaleString()}đ
            </p>

            <p style={{ margin: "0 10px", paddingLeft: "30px" }}>
              <FontAwesomeIcon className="mr-2" icon={faBook} />
              Total Quantity:
            </p>
            <p style={{ margin: "0 0", color: "blue", fontSize: "18px" }}>
              {sumQuantity}
            </p>
          </div>
          <XYPlot
            animation
            xType="ordinal"
            width={1100}
            height={400}
            // color="red"
            // stroke="red"
            style={{ marginLeft: "50px" }}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Date " />
            <YAxis title="Saled (đ)" width={90} left={-35} />
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
        </TabPane>
        <TabPane tab="Best Selling" key="2">
          <BestSellingTable />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Home;

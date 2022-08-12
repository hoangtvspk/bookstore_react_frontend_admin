import { faBook, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HorizontalGridLines,
  LabelSeries,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Report } from "../../models/report";
import { ReportResponse } from "../../models/reportRes";
import { adminRoutes } from "../../routes/routes";
import "./Home.css";

const MonthlyReport = () => {
  const [reportArray, setReportArray] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [labelData, setLabelData] = useState<any[]>([]);

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

  const onLoadReportYear = (yearr: number) => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    onLoadReportYear(new Date().getFullYear());
  }, []);

  return (
    <Spin spinning={loading}>
      <div
        className="bg-white rounded-3 p-4"
        style={{ border: "1px solid rgba(0,0,0,.125)" }}
      >
        <div
          style={{
            borderBottom: "0.5px solid rgba(0,0,0,.125)",
          }}
        >
          <div
            className="d-flex align-items-center"
            style={{ paddingRight: "80px" }}
          >
            <p style={{ margin: "0 10px" }}>
              <FontAwesomeIcon
                color="#0099FF"
                className="mr-2"
                icon={faMoneyBillAlt}
              />
              Tổng Doanh Thu:
            </p>
            <p style={{ margin: "0 0", color: "blue" }}>
              {sumSaled.toLocaleString()} VNĐ
            </p>

            <p style={{ margin: "0 10px", paddingLeft: "30px" }}>
              <FontAwesomeIcon color="#FF9900" className="mr-2" icon={faBook} />
              Đã Bán:
            </p>
            <p style={{ margin: "0 0", color: "blue" }}>
              {sumQuantity} cuốn sách
            </p>
          </div>
          <XYPlot
            animation
            xType="ordinal"
            width={700}
            height={200}
            size={2}
            color="#0099FF"
            stroke="#0099FF"
            style={{ marginTop: "20px", fontSize: "12px" }}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Tháng" />
            <YAxis title="Doanh Thu (đ)" width={90} left={-25} />
            <LineMarkSeries
              // barWidth={0.8}
              // className="vertical-bar-series-example"
              data={reportArray}
            />
            <LabelSeries data={labelData} />
          </XYPlot>{" "}
          <div className="d-flex align-items-center justify-content-center">
            <p>Biểu Đồ Doanh Thu Năm {new Date().getFullYear()}</p>
          </div>
        </div>
        <div className="mt-1">
          <Link to={adminRoutes.orderReport}>Chi Tiết Biểu Đồ Doanh Thu</Link>
        </div>
      </div>
    </Spin>
  );
};

export default MonthlyReport;

import { Report } from "./report";

export interface ReportResponse{
    sumSaled: number,
    sumQuantity: number,
    chartReportResponses: [
        Report
    ]
}
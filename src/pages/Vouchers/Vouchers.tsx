import { Image, message, Popconfirm, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Voucher } from "../../models/voucher";
import { adminRoutes } from "../../routes/routes";
import "./Voucher.css";

function VoucherList() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onEdit = (id: string) => {
    navigate(adminRoutes.editVoucher.replace(":id", id));
  };
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteVoucher.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Xóa Thành Công");

        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  interface DataType {
    couponCode: number;
    minimumOrderValue: number;
    discountValue: number;
    discountPercentValue: number;
    dayStart: string;
    dayEnd: string;
    isUse: boolean;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Voucher",
      dataIndex: "couponCode",
      key: "couponCode",
      align: "center",
    },
    {
      title: "Đơn Tối Thiểu",
      dataIndex: "minimumOrderValue",
      key: "minimumOrderValue",
      align: "center",
    },
    {
      title: "Giảm giá",
      dataIndex: "discountValue",
      key: "discountValue",
      align: "center",
      render: (_, { discountValue, discountPercentValue }) => (
        <div>
          {discountValue && <>-{stringPrice(discountValue)} VNĐ</>}{" "}
          {discountPercentValue && <>-{discountPercentValue}%</>}{" "}
        </div>
      ),
    },

    {
      title: "Bắt Đầu",
      dataIndex: "dayStart",
      align: "center",
      key: "minimumOrderValue",
      render: (text) => formatDate(text),
    },
    {
      title: "Hết Hạn",
      dataIndex: "dayEnd",
      key: "discountValue",
      align: "center",
      render: (text) => formatDate(text),
    },

    {
      title: "Sửa/Xóa",
      align: "center",
      key: "action",
      render: (_, { couponCode }) => (
        <div className="d-flex ">
          <u
            className="book-action-item"
            onClick={() => {
              onEdit(couponCode.toString());
            }}
          >
            Sửa
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Xóa Voucher Này?"
            onConfirm={() => {
              onDelete(couponCode.toString());
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <u className="book-action-item">Xóa</u>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    setData([]);
    setSubmitting(true);
    httpClient()
      .get(APP_API.getVoucher)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          res.data.map((voucher: Voucher) => {
            setData((state) => [
              ...state,
              {
                couponCode: voucher.couponCode,
                minimumOrderValue: voucher.minimumOrderValue,
                discountValue: voucher.discountValue,
                discountPercentValue: voucher.discountPercentValue,
                dayStart: voucher.dayStart,
                dayEnd: voucher.dayEnd,
                isUse: voucher.isUse,
              },
            ]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="bg-white ">
        <PageTitle>Voucher</PageTitle>
        <div className="d-flex justify-content-center align-content-center ">
          <Table
            style={{
              width: "1000px",
              border: "1px solid rgba(0,0,0,.1)",
              marginBottom: "20px",
            }}
            columns={columns}
            dataSource={data}
            pagination={{ position: ["bottomCenter"] }}
          />
        </div>
      </div>
    </Spin>
  );
}

export default VoucherList;

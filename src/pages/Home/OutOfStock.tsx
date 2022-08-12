import { Button, message, Popconfirm, Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { BestSelling } from "../../models/bestSelling";
import OutOfStockIcon from "../../Image/outofstock.png";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "../../routes/routes";
import { Book } from "../../models/book";

const OutOfStock = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  const onEdit = (id: string) => {
    navigate(adminRoutes.bookEdit.replace(":id", id));
  };
  const navigate = useNavigate();
  const onDelete = (id: string) => {
    httpClient()
      .delete(APP_API.deleteBook.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Xóa Thành Công");
        navigate(adminRoutes.books);
        loadData();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  interface DataType {
    stt: number;
    id: number;
    name: string;
    category: string;
    author: string;
    price: number[];
    quantity: number;
    image: string;
    review: number[];
  }
  const loadData = () => {
    setDataSource([]);
    setLoading(true);
    httpClient()
      .get(APP_API.outOfStock)
      .then((res) => {
        const reportData = res.data as Book[];
        console.log(res.data);
        reportData.map((book: Book, index) => {
          if (index < 20) {
            setDataSource((state) => [
              ...state,
              {
                stt: index + 1,
                id: book.id,
                name: book.nameBook,
                category: book.category.nameCategory,
                author: book.author,
                quantity: book.quantity,
                price: [
                  book.price,
                  book.discount,
                  book.bookForEvents[0]?.discountPercentValue,
                  book.bookForEvents[0]?.discountValue,
                ],

                image: book.bookImages[0].image,
                review: [book.rating, book.reviews.length],
              },
            ]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    loadData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text) => <div style={{ width: "30px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Hình",
      dataIndex: "image",
      key: "image",
      render: (text) => <img className="order-item-image" src={text}></img>,
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Thể Loại",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, { price }) => (
        <div
          className="d-flex justify-content-center"
          style={{ width: "130px" }}
        >
          {!price[2] && !price[3] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - (price[0] * price[1]) / 100)} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[1]}%)</p>
                </>
              )}
            </>
          )}
          {price[2] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - (price[0] * price[2]) / 100)} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[2]}%)</p>
                </>
              )}
            </>
          )}
          {price[3] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - price[3])} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[3]}đ)</p>
                </>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      title: "Còn",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div style={{ width: "30px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Đánh Giá",
      dataIndex: "review",
      key: "review",
      render: (_, { review }) => (
        <div className="d-flex align-items-center" style={{ width: "130px" }}>
          <p style={{ marginBottom: "0px" }}>{stringPrice(review[0])}</p>
          <p className="mb-0">&nbsp;({review[1]} lượt đánh giá)</p>
        </div>
      ),
      align: "center",
    },
    {
      title: "Sửa/Xóa",
      key: "action",
      render: (_, { id }) => (
        <div className="d-flex ">
          <u
            className="book-action-item pl-0 ml-0"
            onClick={() => {
              onEdit(id.toString());
            }}
          >
            Sửa
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Bạn Muốn Xóa Sản Phẩm Này?"
            onConfirm={() => {
              onDelete(id.toString());
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <u className="book-action-item">Xóa</u>
          </Popconfirm>
        </div>
      ),
      align: "center",
    },
  ];
  return (
    <Spin spinning={loading}>
      <h4>
        <img
          src={OutOfStockIcon}
          width={30}
          height={30}
          style={{
            objectFit: "cover",
            marginRight: "10px",
          }}
        ></img>
        Đã/Sắp Hết Hàng
      </h4>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",

          border: "1px solid rgba(0,0,0,.125)",
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ x: true, y: 430 }}
        />
      </div>
    </Spin>
  );
};

export default OutOfStock;

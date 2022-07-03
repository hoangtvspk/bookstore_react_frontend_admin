import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { BestSelling } from "../../models/bestSelling";

const BestSellingTable = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  useEffect(() => {
    httpClient()
      .get(APP_API.reportBestSelling)
      .then((res) => {
        const reportData = res.data as BestSelling[];
        console.log(res.data);
        reportData.map((book: BestSelling, index) => {
          if (index < 20) {
            setDataSource((state) => [
              ...state,
              {
                id: index + 1,
                name: book.bookResponse.nameBook,
                category: book.bookResponse.category.nameCategory,
                author: book.bookResponse.author,
                price: book.bookResponse.price,
                sold: book.sumQuantity,
                image: book.bookResponse.bookImages[0].image,
              },
            ]);
          }
        });
      });
  }, []);

  const columns: ColumnsType<BestSelling> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình",
      dataIndex: "image",
      key: "image",
      render: (text) => <img className="order-item-image" src={text}></img>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thể Loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Đã Bán",
      dataIndex: "sold",
      key: "sold",
    },
  ];
  return (
    <>
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
        />
      </div>
    </>
  );
};

export default BestSellingTable;

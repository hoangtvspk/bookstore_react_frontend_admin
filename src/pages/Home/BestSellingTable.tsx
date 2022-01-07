import { Table } from "antd";
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

        setDataSource([
          ...reportData.map((book: BestSelling) => ({
            id: book.bookResponse.id,
            name: book.bookResponse.nameBook,
            category: book.bookResponse.category.nameCategory,
            author: book.bookResponse.author,
            price: book.bookResponse.price,
            sold: book.sumQuantity,
          })),
        ]);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
  ];
  return (
    <>
      {console.log(dataSource)}
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default BestSellingTable;

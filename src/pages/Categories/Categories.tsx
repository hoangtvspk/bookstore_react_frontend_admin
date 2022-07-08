import { Image, message, Popconfirm, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { User } from "../../models/getUser";
import { adminRoutes } from "../../routes/routes";
import "./Categories.css";

function Categories() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [catesArray, setCatesArray] = useState<Category[]>([]);

  const onEdit = (id: string) => {
    navigate(adminRoutes.editCategories.replace(":id", id));
  };

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteCategory.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Xóa Thành Công!");
        navigate(adminRoutes.categories);
        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  interface DataType {
    image: string;
    nameCategory: string;
    id: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // render: text => <a>{text}</a>,
    },
    {
      title: "Tên Thể Loại",
      dataIndex: "nameCategory",
      key: "nameCategory",
    },
    {
      title: "Hình",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} height={100} width={60}></Image>,
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
            title="Bạn Muốn Xóa Danh Mục Này?"
            onConfirm={() => {
              onDelete(id.toString());
            }}
            okText="Yes"
            cancelText="No"
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
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          res.data.map((category: Category) => {
            setData((state) => [
              ...state,
              {
                id: category.id,
                nameCategory: category.nameCategory,
                image: category.image,
              },
            ]);
          });
        }
        console.log(catesArray);
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
        <PageTitle>Danh Mục</PageTitle>
        <div className="d-flex justify-content-center align-content-center ">
          <Table
            style={{
              width: "600px",
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

export default Categories;

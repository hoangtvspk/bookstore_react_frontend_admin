import { message, Popconfirm, Spin } from "antd";
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

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    httpClient()
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        setCatesArray([...res.data]);
        console.log(catesArray);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteCategory.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Delete Successfully");
        navigate(adminRoutes.categories);
        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <PageTitle>Categories</PageTitle>
      <div className="d-flex justify-content-center">
        <div>
          <div className="user-item">
            <div className="user-propertive-title-category">Id</div>
            <div className="user-propertive-title-category">Categories</div>
            <div className="user-propertive-title-category">Action</div>
          </div>
          {catesArray.length > 0 &&
            catesArray.map((category: Category) => (
              <div className="book-item">
                <div className="user-propertive-category">{category.id}</div>
                <div className="user-propertive-category">
                  {category.nameCategory}
                </div>

                <div className="user-propertive-category">
                  <div className="d-flex">
                    <u
                      className="book-action-item"
                      onClick={() => {
                        onEdit(category.id.toString());
                      }}
                    >
                      Edit
                    </u>
                    <p className="action-item-slice"> | </p>
                    <Popconfirm
                      title="Are you sure to delete this category?"
                      onConfirm={() => {
                        onDelete(category.id.toString());
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <u className="book-action-item">Delete</u>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Spin>
  );
}

export default Categories;

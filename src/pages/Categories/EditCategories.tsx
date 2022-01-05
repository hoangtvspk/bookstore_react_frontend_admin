import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Category } from "../../models/book";
import { EditUser } from "../../models/editUser";
import { adminRoutes } from "../../routes/routes";
import "./Categories.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const EditCategories = () => {
  const [cateForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      httpClient()
        .get(APP_API.getCategory.replace(":id", id))
        .then((res) => {
          console.log(res);
          cateForm.setFieldsValue(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onFinish = (values: Category) => {
    setSubmitting(true);
    httpClient()
      .post(APP_API.editCategory, values)
      .then((res) => {
        navigate(adminRoutes.categories);
        message.success("Edit Category Successfully!");
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed To Edit Category!");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Edit Categories</PageTitle>
        <div className="site-layout-background d-flex align-items-center justify-content-center ">
          <Form
            {...layout}
            name="nest-messages"
            form={cateForm}
            onFinish={onFinish}
          >
            <Form.Item name="id" label="ID" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="nameCategory"
              label="Category"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Update Category
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Link to={adminRoutes.users}>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Turn Back
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default EditCategories;

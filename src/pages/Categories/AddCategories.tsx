import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";
import "./Categories";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const AddCategories = () => {
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values: any) => {
    console.log(values);
    setSubmitting(true);
    httpClient()
      .post(APP_API.addCategory, values)
      .then((res) => {
        console.log(res);
        message.success("Add Successfully");
      })
      .catch((err) => {
        console.error(err);
        message.error("Can't Add New Category");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background">
        <PageTitle>Add Categories</PageTitle>
        <div className="site-layout-background d-flex align-items-center justify-content-center ">
          <Form {...layout} name="nest-messages" onFinish={onFinish}>
            <Form.Item
              label="Category"
              name="nameCategory"
              rules={[
                { required: true, message: "Please input your category name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save New Category
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default AddCategories;

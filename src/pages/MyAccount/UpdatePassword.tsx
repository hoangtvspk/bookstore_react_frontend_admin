import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { UpdatePasswordForm } from "../../models/updatePassword";
import { adminRoutes } from "../../routes/routes";
import "./MyAccount.css";

const UpdatePassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { code } = useParams();

  const [updatePassForm] = useForm();
  const onFinish = (values: UpdatePasswordForm) => {
    console.log(values);
    setSubmitting(true);
    httpClient()
      .put(APP_API.editPassword, values)
      .then((res) => {
        console.log(res);
        navigate(adminRoutes.myAccount);
        message.success("Update Successfully");
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    if (code) {
      httpClient()
        .get(APP_API.userInfo)
        .then((res) => {
          console.log(res);
          updatePassForm.setFieldsValue({ email: res.data.email });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <Spin spinning={submitting}>
      <div className="profile-background">
        <PageTitle>Edit Password</PageTitle>
        <div
          className="site-layout-background d-flex align-items-center justify-content-center"
          // style={{ background: "red" }}
        >
          <div></div>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="menu-background"
            form={updatePassForm}
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input className="w-100" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input className="w-100" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="newPassword2"
              rules={[
                { required: true, message: "Please input confirm password!" },
              ]}
            >
              <Input className="w-100" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Reset your password
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Link to={adminRoutes.myAccount}>
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

export default UpdatePassword;

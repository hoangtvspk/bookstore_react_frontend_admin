import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { LoginForm, UserInfo } from "../../models/user";
import { userLogIn } from "../../redux/slices/authSlice";
import { adminRoutes } from "../../routes/routes";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    setSubmitting(true);
    httpClient()
      .post(APP_API.login, values)
      .then((res) => {
        const userInfo: UserInfo = res.data as UserInfo;
        dispatch(userLogIn(userInfo));
        navigate(adminRoutes.home);
        message.success("Đăng Nhập Thành Công");
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="backgroundlogin">
        <div>
          <div
            className="site-layout-background  site-layout-background-login"
            // style={{ background: "red" }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <h4 className="mb-5">Đăng Nhập Trang Quản Lý DoubH</h4>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Nhập email!" }]}
              >
                <Input className="w-100" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Nhập password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;

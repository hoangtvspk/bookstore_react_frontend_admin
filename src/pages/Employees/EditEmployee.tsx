import { Button, Form, Input, message, Image, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";

import "./User.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const EditEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const firstNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
  };
  const lastNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };

  const emailInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const phoneNumberInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPhoneNumber(event.target.value);
  };
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([] as ImageListType);
  const [currentedImage, setCurrentedImages] = useState([] as ImageListType);
  const maxNumber = 1;
  const navigate = useNavigate();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);

    setImages(imageList);
    // setFile1(imageList[0].file);
  };

  const onFinish = (values: any) => {
    const formData: FormData = new FormData();
    formData.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            currentedImage: currentedImage[0].dataURL,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (images.length > 0)
      for (let i = 0; i < images.length; i++) {
        console.log(images[i]);
        formData.append("file", images[i].file as string | Blob);
      }

    console.log(values);
    setSubmitting(true);
    httpClient()
      .post(APP_API.editEmployees, formData)
      .then((res) => {
        console.log(res);
        message.success("Cập Nhật Người Dùng Thành Công");
        navigate(adminRoutes.employees);
        window.scroll(0, 0);
      })
      .catch((err) => {
        console.error(err);
        message.error("Cập Nhật Người Dùng Thất Bại");
      })
      .finally(() => setSubmitting(false));
  };
  const [userForm] = useForm();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      httpClient()
        .get(APP_API.getEmployee.replace(":id", id))
        .then((res) => {
          console.log(res);
          userForm.setFieldsValue(res.data);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setPhoneNumber(res.data.phoneNumber);
          setImages([{ dataURL: res.data.image }]);
          setCurrentedImages([{ dataURL: res.data.image }]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Spin spinning={submitting}>
      <div className="address-background bg-white rounded-3">
        <PageTitle>Thêm Người Dùng</PageTitle>

        <Form
          {...layout}
          form={userForm}
          name="nest-messages"
          onFinish={onFinish}
        >
          <div className="site-layout-background d-flex align-items-center ">
            <div style={{ marginLeft: "200px" }}>
              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Họ:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="lastName"
                rules={[{ required: true, message: "Nhập Tên" }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    lastNameInputChange(e);
                  }}
                />
              </Form.Item>
              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Tên:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="firstName"
                rules={[{ required: true, message: "Nhập Tên" }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    firstNameInputChange(e);
                  }}
                />
              </Form.Item>
              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Email:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="email"
                rules={[{ required: true, message: "Nhập Tên" }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    emailInputChange(e);
                  }}
                />
              </Form.Item>
              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Số Điện Thoại:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="phoneNumber"
                rules={[{ required: true, message: "Nhập Mật Khẩu" }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    phoneNumberInputChange(e);
                  }}
                />
              </Form.Item>
              <span
                style={{
                  fontSize: 16,

                  color: "#555555",
                }}
              >
                Hình Đại Diện:
              </span>
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <div style={{ marginBottom: "10px" }}>
                      <Button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Thêm Hình
                      </Button>
                      &nbsp;
                      <Button onClick={onImageRemoveAll}>Xóa Toàn Bộ</Button>
                    </div>

                    <div
                      className="d-flex"
                      style={{
                        minHeight: "120px",
                        border: "1px solid rgba(0,0,0,.1)",
                        padding: "10px",
                      }}
                    >
                      {imageList.map((image, index) => (
                        <div key={index} className=" pr-3">
                          <Image
                            src={image.dataURL}
                            alt=""
                            width={100}
                            height={100}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="">
                            <Button onClick={() => onImageUpdate(index)}>
                              Đổi
                            </Button>
                            <Button onClick={() => onImageRemove(index)}>
                              Gỡ
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>

              <div
                className="d-flex justify-content-end mt-3"
                style={{ width: "800px" }}
              >
                <Form.Item className="form-item ">
                  <Button
                    style={{ width: "100px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default EditEmployee;

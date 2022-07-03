import {
  Button,
  Form,
  Input,
  message,
  Select,
  Spin,
  Image,
  DatePicker,
  DatePickerProps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { SelectValue } from "antd/lib/select";
import { ChangeEvent, useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";

import TextArea from "antd/lib/input/TextArea";
import "./Events.css";
import moment from "moment";
import { Event } from "../../models/event";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const EditEvents = () => {
  const [eventForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const { Option } = Select;
  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  const formatDateRequest = (date: string) => {
    return date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
  };
  const nameInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    setDetail(event.target.value);
  };
  const { id } = useParams();
  const { RangePicker } = DatePicker;
  const [images, setImages] = useState([] as ImageListType);
  const [currentedImage, setCurrentedImages] = useState<string[]>([]);

  const maxNumber = 69;
  const imageList2 = [];

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setCurrentedImages([]);
    console.log(imageList, addUpdateIndex);
    for (let i = 0; i < imageList.length; i++) {
      imageList2.push(imageList[i].file);
    }
    setImages(imageList);
    // setFile1(imageList[0].file);
  };
  const [event, setEvent] = useState({} as Event);
  useEffect(() => {
    setSubmitting(true);
    console.log(id);
    httpClient()
      .get(APP_API.getEvents)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          res.data.map((event: Event, index: number) => {
            if (id == event.id.toString()) {
              console.log(event.dayStart.slice(0, 10));
              eventForm.setFieldsValue(event);
              setDetail(event.detail);
              setDayStart(event.dayStart);
              setDayEnd(event.dayEnd);
              setImages([{ dataURL: event.image }]);
              setCurrentedImages([event.image]);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  }, [id]);

  const onFinish = (values: AddBookForm) => {
    const formData: FormData = new FormData();
    formData.append(
      "eventRequest",
      new Blob(
        [
          JSON.stringify({
            id,
            dayStart,
            dayEnd,
            detail,
            currentedImage: currentedImage[0],
          }),
        ],
        { type: "application/json" }
      )
    );
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append("file", images[i].file as string | Blob);
    }

    setSubmitting(true);
    httpClient()
      .put(APP_API.editEvents, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        message.success("Cập Nhật Sự Kiện Thành Công!");
        navigate(adminRoutes.eventBooks.replace(":id", id || ""));
      })
      .catch((err) => {
        message.error("Cập Nhật Sự Kiện Thất Bại!");
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background bg-white rounded-3">
        <PageTitle>Cập Nhật Sự Kiện</PageTitle>

        <Form
          {...layout}
          name="nest-messages"
          form={eventForm}
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
                  Sự Kiện:
                </span>
              </div>
              <Form.Item
                className="form-item "
                name="detail"
                rules={[{ required: true, message: "Nhập Sự Kiện" }]}
              >
                <Input
                  style={{ width: "800px" }}
                  onChange={(e) => {
                    nameInputChange(e);
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
                  Thời Gian Diễn Ra Sự Kiện:
                </span>
              </div>
              {dayEnd != "" && (
                <>
                  <RangePicker
                    format="DD-MM-YYYY"
                    style={{ width: "800px" }}
                    picker="week"
                    defaultValue={[
                      moment(formatDate(dayStart), "DD-MM-YYYY"),
                      moment(formatDate(dayEnd), "DD-MM-YYYY"),
                    ]}
                    onChange={(value, formatString) => {
                      console.log(formatDateRequest(formatString[0]));

                      setDayStart(
                        formatDateRequest(formatString[0]) + "T00:00:00.000Z"
                      );
                      setDayEnd(
                        formatDateRequest(formatString[1]) + "T23:59:59.000Z"
                      );
                    }}
                  />
                </>
              )}

              <div className="mt-3">
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Hình Ảnh Sự Kiện:
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
                              width={500}
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
              </div>
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

export default EditEvents;

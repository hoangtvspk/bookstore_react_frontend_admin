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
  Radio,
  Space,
  RadioChangeEvent,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { SelectValue } from "antd/lib/select";
import { ChangeEvent, useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { AddBookForm } from "../../models/addBook";
import { Category } from "../../models/book";
import { adminRoutes } from "../../routes/routes";

import TextArea from "antd/lib/input/TextArea";
import "./Voucher.css";
import moment from "moment";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */

const AddVoucher = () => {
  const [bookForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const { Option } = Select;
  const [couponCode, setCouponCode] = useState("");
  const [minimumOrderValue, setMinimumOrderValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");

  const onCouponCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCouponCode(event.target.value);
    setDataRequestValue(discountType);
  };
  const onMinimumOrderValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setMinimumOrderValue(event.target.value);
    setDataRequestValue(discountType);
  };
  const onDiscountValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setDiscountValue(event.target.value);
    setDataRequestValue(discountType);
  };
  const onDetailChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDetail(event.target.value);
    setDataRequestValue(discountType);
  };

  const { RangePicker } = DatePicker;
  const [images, setImages] = useState([] as ImageListType);
  const maxNumber = 69;
  const imageList2 = [];

  useEffect(() => {
    setDataRequest({
      couponCode,
      minimumOrderValue,
      discountPercentValue: discountValue,
      dayStart,
      dayEnd,

      detail,
    });
  }, []);
  const [unit, setUnit] = useState("%");

  const [discountType, setDisCountType] = useState("percent");
  const setDataRequestValue = (type: string) => {
    if (type == "percent") {
      setUnit("%");
      setDataRequest({
        couponCode,
        minimumOrderValue,
        discountPercentValue: discountValue,
        dayStart,
        dayEnd,

        detail,
      });
    } else if (type == "number") {
      setUnit("VNĐ");
      setDataRequest({
        couponCode,
        minimumOrderValue,
        discountValue: discountValue,
        dayStart,
        dayEnd,

        detail,
      });
    }
  };
  const onSelectDiscountTypeChange = (e: RadioChangeEvent) => {
    setDisCountType(e.target.value);
    setDataRequestValue(e.target.value);
  };
  const formatDateRequest = (date: string) => {
    return date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
  };
  const [dataRequest, setDataRequest] = useState({});
  const onFinish = (values: AddBookForm) => {
    let data = {};
    if (discountType == "percent") {
      data = {
        couponCode,
        minimumOrderValue,
        discountPercentValue: discountValue,
        dayStart,
        dayEnd,

        detail,
      };
    } else if (discountType == "number") {
      data = {
        couponCode,
        minimumOrderValue,
        discountValue: discountValue,
        dayStart,
        dayEnd,

        detail,
      };
    }
    setSubmitting(true);
    httpClient()
      .post(APP_API.addVoucher, data)
      .then((res) => {
        message.success("Thêm Voucher Thành Công!");
      })
      .catch((err) => {
        message.error("Thêm Voucher Thất Bại!");
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={submitting}>
      <div className="address-background bg-white rounded-3">
        <PageTitle>Tạo Voucher</PageTitle>

        <Form
          {...layout}
          name="nest-messages"
          form={bookForm}
          onFinish={onFinish}
        >
          <div className="site-layout-background d-flex align-items-center ">
            <div style={{ marginLeft: "200px" }}>
              <div
                className="d-flex justify-content-between"
                style={{ width: "800px" }}
              >
                <div>
                  {" "}
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Mã Giảm Giá:
                  </span>
                  <Form.Item
                    className="form-item "
                    name="couponCode"
                    rules={[{ required: true, message: "Nhập Mã Giảm Giá" }]}
                  >
                    <Input
                      style={{ width: "180px" }}
                      onChange={(e) => {
                        onCouponCodeChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  {" "}
                  <span
                    style={{
                      fontSize: 16,

                      color: "#555555",
                    }}
                  >
                    Đơn Tối Thiểu: (VNĐ)
                  </span>
                  <Form.Item
                    className="form-item "
                    name="minimumOrderValue"
                    rules={[{ required: true, message: "Nhập Mã Giảm Giá" }]}
                  >
                    <Input
                      style={{ width: "180px" }}
                      onChange={(e) => {
                        onMinimumOrderValueChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <div className="d-flex ">
                    <Radio.Group
                      className=""
                      key="price"
                      onChange={onSelectDiscountTypeChange}
                      value={discountType}
                    >
                      <Space
                        direction="horizontal"
                        style={{
                          gap: "0px",
                        }}
                      >
                        <Radio value="percent" className="font-cate">
                          <p
                            style={{
                              color: "#555555",
                              fontSize: "16px",

                              marginBottom: 0,
                            }}
                          >
                            Theo %
                          </p>
                        </Radio>
                        <Radio value="number" className="font-cate">
                          <p
                            style={{
                              color: "#555555",
                              fontSize: "16px",

                              marginBottom: 0,
                            }}
                          >
                            Theo số tiền
                          </p>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <Form.Item
                    className="form-item "
                    name="voucherValue"
                    rules={[{ required: true, message: "Nhập Tác Giả" }]}
                  >
                    <Input
                      type="number"
                      style={{ width: "380px" }}
                      onChange={(e) => {
                        onDiscountValueChange(e);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div style={{ width: "800px" }}>
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Thời Gian Hiệu Lực:
                </span>
              </div>
              <RangePicker
                format="DD-MM-YYYY"
                style={{ width: "800px" }}
                picker="week"
                onChange={(value, formatString) => {
                  console.log(value?.[0]);
                  console.log(formatString[0] + "T00:00:00.000Z");
                  setDayStart(
                    formatDateRequest(formatString[0]) + "T00:00:00.000Z"
                  );
                  setDayEnd(
                    formatDateRequest(formatString[1]) + "T23:59:59.000Z"
                  );
                  setDataRequestValue(discountType);
                }}
              />
              <div className="pt-2">
                <span
                  style={{
                    fontSize: 16,

                    color: "#555555",
                  }}
                >
                  Nội Dung Voucher:
                </span>
                <Form.Item
                  className="form-item "
                  name="voucherdetail"
                  rules={[{ required: true, message: "Nhập Mô Tả" }]}
                >
                  <TextArea
                    style={{ width: "800px" }}
                    rows={4}
                    onChange={(e) => {
                      onDetailChange(e);
                    }}
                  />
                </Form.Item>
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

export default AddVoucher;
function formatString(arg0: string, formatString: any) {
  throw new Error("Function not implemented.");
}

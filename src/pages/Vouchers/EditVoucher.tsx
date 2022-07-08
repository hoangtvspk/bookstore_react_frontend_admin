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
import { useNavigate, useParams } from "react-router-dom";
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

const EditVoucher = () => {
  const [bookForm] = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const { Option } = Select;
  const [couponCode, setCouponCode] = useState("");
  const [minimumOrderValue, setMinimumOrderValue] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");

  const onCouponCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCouponCode(event.target.value);
  };
  const onMinimumOrderValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setMinimumOrderValue(event.target.value);
    console.log(dataRequest);
  };
  const onDiscountValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setDiscountValue(parseInt(event.target.value.toString()));
    console.log(dataRequest);
  };
  const onDetailChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDetail(event.target.value);
  };

  const { RangePicker } = DatePicker;
  const [voucherForm] = useForm();
  const { id } = useParams();
  const [formDiscountName, setFormDiscountName] = useState(
    "discountPercentValue"
  );
  useEffect(() => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .get(APP_API.VoucherDetail.replace(":id", id))
        .then((res) => {
          voucherForm.setFieldsValue(res.data);
          setCouponCode(res.data.couponCode);
          setMinimumOrderValue(res.data.minimumOrderValue);
          setDayStart(res.data.dayStart);
          setDayEnd(res.data.dayEnd);
          setDetail(res.data.detail);
          if (res.data.discountPercentValue) {
            setFormDiscountName("discountPercentValue");
            setDiscountValue(res.data.discountPercentValue);
            setDisCountType("percent");
          }
          if (res.data.discountValue) {
            setFormDiscountName("discountValue");
            setDiscountValue(res.data.discountValue);
            setDisCountType("number");
          }
        })
        .catch((err) => {
          message.error("Cập Nhật Voucher Thất Bại!");
          console.error(err);
        })
        .finally(() => setSubmitting(false));
    }
  }, [id]);
  const [unit, setUnit] = useState("%");

  const [discountType, setDisCountType] = useState("percent");

  const onSelectDiscountTypeChange = (e: RadioChangeEvent) => {
    setDisCountType(e.target.value);
  };
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
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
      .put(APP_API.editVoucher, data)
      .then((res) => {
        message.success("Cập Nhật Voucher Thành Công!");
        navigate(adminRoutes.voucher);
      })
      .catch((err) => {
        message.error("Cập Nhật Voucher  Thất Bại!");
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
          form={voucherForm}
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
                      disabled
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
                    name={formDiscountName}
                    rules={[{ required: true, message: "Nhập Tác Giả" }]}
                  >
                    <Input
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
              {dayEnd != "" && (
                <RangePicker
                  format="DD-MM-YYYY"
                  style={{ width: "800px" }}
                  picker="week"
                  defaultValue={[
                    moment(formatDate(dayStart), "DD-MM-YYYY"),
                    moment(formatDate(dayEnd), "DD-MM-YYYY"),
                  ]}
                  onChange={(value, formatString) => {
                    console.log(value?.[0]);
                    console.log(formatString[0] + "T00:00:00.511Z");
                    setDayStart(
                      formatDateRequest(formatString[0]) + "T00:00:00.000Z"
                    );
                    setDayEnd(
                      formatDateRequest(formatString[1]) + "T23:59:59.000Z"
                    );
                  }}
                />
              )}
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
                  name="detail"
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
                    htmlType="submit"
                    style={{ width: "100px" }}
                    type="primary"
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

export default EditVoucher;
function formatString(arg0: string, formatString: any) {
  throw new Error("Function not implemented.");
}

import { ConsoleSqlOutlined } from "@ant-design/icons";
import {
  faBookmark,
  faBookOpen,
  faCheck,
  faEdit,
  faMoneyCheck,
  faPlus,
  faSort,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  message,
  Popconfirm,
  Image,
  Spin,
  Input,
  Modal,
  Form,
  RadioChangeEvent,
  Radio,
  Space,
} from "antd";
import { SelectValue } from "antd/lib/select";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { Event } from "../../models/event";
import { EventBooksModel } from "../../models/EventBooks";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { adminRoutes } from "../../routes/routes";
import "./Events.css";
import EventIcon from "../../Image/event.png";

function EventBooks() {
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  const formatDateRequest = (date: string) => {
    return date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
  };
  const onEdit = (id: string) => {
    navigate(adminRoutes.bookEdit.replace(":id", id));
  };
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  const onLoad = () => {
    if (id) {
      httpClient()
        .get(APP_API.getEventBooks.replace(":id", id.toString() || ""))
        .then((res) => {
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };

  const onConfirm = () => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteEvents.replace(":id", id || ""))
      .then((res) => {
        message.success("Hủy Sự Kiện Thành Công!");
        navigate(adminRoutes.events);
        console.log(res);
      })
      .catch((err) => {
        message.success("Hủy Sự Kiện Thất Bại!");
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };

  const onDelete = (bookId: string) => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .delete(
          APP_API.deleteEventBooks
            .replace(":eventId", id)
            .replace(":bookId", bookId)
        )
        .then((res) => {
          console.log(res);
          message.success("Xóa Thành Công!");

          onLoad();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  interface DataType {
    bookImages: string;
    nameBook: string[];

    price: number[];
    id: number;

    discountValue: number[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Hình",
      dataIndex: "bookImages",
      key: "bookImages",
      render: (text) => <img className="order-item-image" src={text}></img>,
    },
    {
      title: "Tên Sách",
      dataIndex: "nameBook",
      key: "nameBook",
      render: (_, { nameBook }) => (
        <div>
          <div style={{ fontWeight: "400", fontSize: "18px" }}>
            {nameBook[0]}
          </div>
          <div>Thể Loại: {nameBook[1]}</div>
          <div>Tác Giả: {nameBook[2]}</div>
          <div>Còn: {nameBook[3]} cuốn</div>
        </div>
      ),
    },

    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => <div>{stringPrice(price[0])} VNĐ</div>,
    },

    {
      title: "Giá Theo Sự Kiện",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (_, { discountValue }) => (
        <div>
          {discountValue[0] && (
            <>
              {stringPrice(discountValue[2] - discountValue[0])} VNĐ (-
              {stringPrice(discountValue[0])} VNĐ)
            </>
          )}{" "}
          {discountValue[1] && (
            <>
              {stringPrice(
                discountValue[2] - discountValue[2] * (discountValue[1] / 100)
              )}{" "}
              VNĐ (-{discountValue[1]}%)
            </>
          )}{" "}
        </div>
      ),
    },
    {
      title: "Sửa/Xóa",
      key: "action",
      render: (_, { id, price }) => (
        <div className="d-flex ">
          <u
            className="book-action-item pl-0 ml-0"
            onClick={() => {
              showModal(id, price[0]);
            }}
          >
            Sửa
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Bạn Muốn Xóa Sản Phẩm Này Khỏi Sự Kiện?"
            onConfirm={() => {
              onDelete(id.toString());
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <u className="book-action-item">Xóa</u>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const setBooksData = (eventBooksList: EventBooksModel[]) => {
    setSubmitting(true);
    if (eventBooksList.length > 0) {
      setData([]);
      eventBooksList.map((eventBooks: EventBooksModel) => {
        setData((state) => [
          ...state,
          {
            bookImages: eventBooks.book.bookImages[0]?.image,

            id: eventBooks.book.id,
            nameBook: [
              eventBooks.book.nameBook,
              eventBooks.book.category?.nameCategory,
              eventBooks.book.author,
              eventBooks.book.quantity.toString(),
            ],
            price: [eventBooks.book.price, eventBooks.book.discount],

            discountValue: [
              eventBooks.discountValue,
              eventBooks.discountPercentValue,
              eventBooks.book.price,
            ],
          },
        ]);
      });
    }
  };
  const [bookId, setBookId] = useState(0);
  const [discountValue, setDiscountPercentValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bookPrice, setBookPrice] = useState(0);
  const [unit, setUnit] = useState("%");
  const showModal = (bookId: number, price: number) => {
    setBookId(bookId);
    setBookPrice(price);
    setBookId(bookId);
    if (id) {
      httpClient()
        .get(APP_API.getEventBooks.replace(":id", id.toString() || ""))
        .then((res) => {
          if (res.data.length > 0) {
            res.data.map((eventBook: EventBooksModel) => {
              if (eventBook.book.id == bookId) {
                setDiscountPercentValue(eventBook.discountPercentValue);
              }
            });
          }
          setVisible(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  const [discountType, setDisCountType] = useState("percent");
  const setDataRequestValue = (type: string, discountValue: number) => {
    if (id) {
      if (type == "percent") {
        setUnit("%");
        setDataRequest({
          eventId: parseInt(id),
          bookId: bookId,
          discountPercentValue: discountValue,
        });
      } else if (type == "number") {
        setUnit("VNĐ");
        setDataRequest({
          eventId: parseInt(id),
          bookId: bookId,
          discountValue: discountValue,
        });
      } else if (type == "newPrice") {
        setUnit("VNĐ");
        setDataRequest({
          eventId: parseInt(id),
          bookId: bookId,
          discountValue: bookPrice - discountValue,
        });
      }
    }
  };
  const onSelectDiscountTypeChange = (e: RadioChangeEvent) => {
    setDisCountType(e.target.value);
    setDataRequestValue(e.target.value, discountValue);
  };
  const [dataRequest, setDataRequest] = useState({});
  const handleOk = () => {
    if (id && discountValue > 0) {
      httpClient()
        .put(APP_API.editEventBooks, dataRequest)
        .then((res) => {
          message.success("Thêm vào sự kiện thành công!");
          console.log(res);
          getEvent();
          getEventBooks();
          setSubmitting(true);
          handleCancel();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("Ưu Đãi Phải Lớn Hơn 0!");
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const [eventImage, setEventImage] = useState("");
  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const getEventBooks = () => {
    setSubmitting(true);
    if (id) {
      httpClient()
        .get(APP_API.getEventBooks.replace(":id", id.toString() || ""))
        .then((res) => {
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };

  const getEvent = () => {
    httpClient()
      .get(APP_API.getEvents)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          res.data.map((event: Event, index: number) => {
            if (id == event.id.toString()) {
              setDetail(event.detail);
              setDayStart(event.dayStart);
              setDayEnd(event.dayEnd);
              setEventImage(event.image);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getEvent();
    getEventBooks();
    setSubmitting(true);
  }, [id]);
  return (
    <Spin spinning={submitting}>
      <div className="bg-white pl-4 pr-4 pt-4" style={{ width: "1220px" }}>
        <h3 style={{ color: "	#FF6666", fontFamily: "Helvetica" }}>
          {
            <img
              src={EventIcon}
              height={30}
              width={30}
              style={{ objectFit: "cover" }}
            ></img>
          }
          &nbsp;{detail} ({formatDate(dayStart)} tới {formatDate(dayEnd)})
        </h3>
        <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
          <Image height={300} src={eventImage}></Image>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Button
            htmlType="submit"
            className=" mr-3 rounded-3"
            style={{
              height: "40px",
              backgroundColor: "#FF9966",
              color: "white",
            }}
            onClick={() =>
              navigate(adminRoutes.addBookToEvent.replace(":id", id || ""))
            }
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Thêm Sách Vào Sự Kiện
          </Button>
          <Button
            htmlType="submit"
            className=" mr-3 rounded-3"
            style={{
              height: "40px",
              backgroundColor: "	#CC9999",
              color: "white",
            }}
            onClick={() =>
              navigate(adminRoutes.editEvents.replace(":id", id || ""))
            }
          >
            <FontAwesomeIcon className="mr-2" icon={faEdit} />
            Cập Nhật Sự Kiện
          </Button>
          <Popconfirm
            title="Hủy Sự Kiện Này?"
            onConfirm={() => {
              onConfirm();
            }}
            okText="Hủy"
            cancelText="Không"
          >
            <Button
              htmlType="submit"
              className=" rounded-3"
              style={{
                height: "40px",
                backgroundColor: "	#FF3333",
                color: "white",
              }}
            >
              <FontAwesomeIcon className="mr-2" icon={faStop} />
              Hủy Sự Kiện
            </Button>
          </Popconfirm>
        </div>
        <div className="bg-white">
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true, y: 430 }}
            pagination={{ position: ["bottomCenter"] }}
          />
        </div>
      </div>
      {eventImage != "" && (
        <Modal
          visible={visible}
          title="Chỉnh sửa ưu đãi"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="d-flex justify-content-end">
              ,
              <div style={{ marginLeft: "40%" }}>
                <Button key="back" onClick={handleCancel}>
                  Hủy
                </Button>
                ,
                <Button key="submit" type="primary" onClick={handleOk}>
                  Lưu
                </Button>
              </div>
              ,
            </div>,
          ]}
        >
          <div className="d-flex justify-content-center">
            <Radio.Group
              className="mt-3 mb-3"
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
                      color: "#111111",
                      fontSize: "14px",

                      marginBottom: 0,
                    }}
                  >
                    Theo %
                  </p>
                </Radio>
                <Radio value="number" className="font-cate">
                  <p
                    style={{
                      color: "#111111",
                      fontSize: "14px",

                      marginBottom: 0,
                    }}
                  >
                    Theo số tiền
                  </p>
                </Radio>
                <Radio value="newPrice" className="font-cate">
                  <p
                    style={{
                      color: "#111111",
                      fontSize: "14px",

                      marginBottom: 0,
                    }}
                  >
                    Giá Cụ Thể
                  </p>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="d-flex justify-content-center">
            <Form>
              <Form.Item
                name="discountPercentValue"
                style={{ fontSize: "16px", width: "140px" }}
                rules={[{ required: true, message: "Nhập Ưu Đãi!" }]}
              >
                <div className="d-flex pb-0 align-items-center">
                  <Input
                    className="mr-1"
                    type="number"
                    defaultValue={discountValue}
                    style={{}}
                    onChange={(e) => {
                      setDiscountPercentValue(parseInt(e.target.value));
                      setDataRequestValue(
                        discountType,
                        parseInt(e.target.value)
                      );
                    }}
                    value={discountValue}
                  />{" "}
                  ({unit})
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </Spin>
  );
}

export default EventBooks;

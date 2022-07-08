import {
  faBookOpen,
  faMoneyCheck,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Spin,
} from "antd";
import Search from "antd/lib/input/Search";
import { SelectValue } from "antd/lib/select";
import Table, { ColumnsType } from "antd/lib/table";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import EventIcon from "../../Image/event.png";
import { Book, Category } from "../../models/book";
import { Event } from "../../models/event";
import { updateAddEventKeySearch } from "../../redux/slices/keySearchSlice";
import { adminRoutes } from "../../routes/routes";
import "./Events.css";

function AddBooksToEvent() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };

  const [value, setValue] = useState(0 as SelectValue);

  const { Option } = Select;
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);

  const [keyWordSearch, setKeyWordSearch] = useState("");
  const [maxPriceSearch, setMaxPriceSearch] = useState(10000000);
  const [minPriceSearch, setMinPriceSearch] = useState(0);
  const booksAddEventSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksAddEventSearch;
  });

  interface DataType {
    bookImages: string;
    nameBook: string;
    category: string;
    author: string;
    quantity: number;
    price: number[];
    id: number;
    review: number[];
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
      // render: text => <a>{text}</a>,
    },
    {
      title: "Thể Loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Kho",
      key: "quantity",
      dataIndex: "quantity",
      render: (_, { quantity }) => (
        <div style={{ width: "40px" }}>{quantity}</div>
      ),
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <div className="d-flex align-items-center">
          <p style={{ marginBottom: "0px" }}>
            {stringPrice(price[0] - (price[0] * price[1]) / 100)} ₫
          </p>

          {price[1] > 0 && (
            <>
              <p className="mb-0">&nbsp;(-{price[1]}%)</p>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Đánh Giá",
      dataIndex: "review",
      key: "review",
      render: (_, { review }) => (
        <div className="d-flex align-items-center">
          <p style={{ marginBottom: "0px" }}>{stringPrice(review[0])}</p>
          <p className="mb-0">&nbsp;({review[1]} lượt đánh giá)</p>
        </div>
      ),
    },
    {
      title: "Tùy Chọn",
      key: "action",
      render: (_, { id, price }) => (
        <div className="d-flex ">
          <u
            className="book-action-item pl-0 ml-0"
            onClick={() => {
              showModal(id, price[0]);
            }}
          >
            Đưa Vào Sự Kiện
          </u>
        </div>
      ),
    },
  ];
  const setBooksData = (bookList: Book[]) => {
    setData([]);
    setSubmitting(true);
    if (bookList.length > 0) {
      setData([]);
      bookList.map((book: Book) => {
        setData((state) => [
          ...state,
          {
            bookImages: book.bookImages[0]?.image,
            author: book.author,
            category: book.category?.nameCategory,
            id: book.id,
            nameBook: book.nameBook,
            price: [book.price, book.discount],
            quantity: book.quantity,
            review: [book.rating, book.reviews.length],
          },
        ]);
      });
    }
  };

  const dispatch = useDispatch();
  const [data, setData] = useState<DataType[]>([]);
  const onChange = (e: SelectValue) => {
    if (booksAddEventSearch.keyWord != null) {
      if (e === "all") {
        dispatch(
          updateAddEventKeySearch({
            idCategory: null,
            keyWord: booksAddEventSearch.keyWord,
            minPrice: 0,
            maxPrice: 100000000,
            idEvent: id,
            order: sort,
          })
        );
      } else {
        setValue(e);
        dispatch(
          updateAddEventKeySearch({
            idCategory: e,
            keyWord: booksAddEventSearch.keyWord,
            minPrice: 0,
            maxPrice: 100000000,
            idEvent: id,
            order: sort,
          })
        );
      }
    }
  };
  const [sort, setSort] = useState("Đánh giá cao");
  const onSortChange = (e: SelectValue) => {
    console.log(e);

    if (id && booksAddEventSearch.keyWord != null) {
      const setBookSearch = (order: string) => {
        dispatch(
          updateAddEventKeySearch({
            idCategory: booksAddEventSearch.idCategory,
            keyWord: booksAddEventSearch.keyWord,
            minPrice: minPriceSearch,
            maxPrice: maxPriceSearch,
            idEvent: id,
            order: order,
          })
        );
      };
      if (e === "vote") {
        setSort("Đánh giá cao");
        setBookSearch("Đánh giá cao");
      } else if (e === "new") {
        setSort("Mới nhất");
        setBookSearch("Mới nhất");
      } else {
        setSort("Bán chạy");
        setBookSearch("Bán chạy");
      }
    }
  };
  const onPriceChange = (e: SelectValue) => {
    if (booksAddEventSearch.keyWord != null) {
      let bookSearch = {};
      console.log(booksAddEventSearch.idCategory);
      console.log(value);
      const priceSearch = (min: number, max: number) => {
        setMinPriceSearch(min);
        setMaxPriceSearch(max);
        dispatch(
          updateAddEventKeySearch({
            idCategory: booksAddEventSearch.idCategory,
            keyWord: booksAddEventSearch.keyWord,
            minPrice: min,
            maxPrice: max,
            idEvent: id,
            order: sort,
          })
        );
      };

      if (e === "all") {
        priceSearch(0, 10000000);
      } else if (e === "40") {
        priceSearch(0, 40000);
      } else if (e === "4070") {
        priceSearch(40000, 70000);
      } else if (e === "70100") {
        priceSearch(70000, 100000);
      } else if (e === "100150") {
        priceSearch(100000, 150000);
      } else if (e === "150") {
        priceSearch(150000, 10000000);
      }
      console.log(bookSearch);
    }
  };
  const onSearch = () => {
    setSubmitting(true);

    if (id && booksAddEventSearch.keyWord != null) {
      let bookSearch = {};
      bookSearch = {
        idCategory: booksAddEventSearch.idCategory,
        keyWord: booksAddEventSearch.keyWord,
        minPrice: minPriceSearch,
        maxPrice: maxPriceSearch,
        idEvent: id,
        order: sort,
      };

      httpClient()
        .post(APP_API.searchAddEventBooks, bookSearch)
        .then((res) => {
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (booksAddEventSearch.keyWord != null) {
      setKeyWordSearch(e.target.value);
      console.log(booksAddEventSearch);
      dispatch(
        updateAddEventKeySearch({
          idCategory: booksAddEventSearch.idCategory,
          keyWord: e.target.value,
          minPrice: 0,
          maxPrice: 100000000,
          idEvent: id,
          order: sort,
        })
      );
    }
  };
  const [bookId, setBookId] = useState(0);
  const { id } = useParams();
  const [discountValue, setDiscountPercentValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bookPrice, setBookPrice] = useState(0);
  const [unit, setUnit] = useState("%");
  const showModal = (bookId: number, price: number) => {
    setBookId(bookId);
    setBookPrice(price);
    console.log(price);
    setVisible(true);
    if (id) {
      setDataRequest({
        eventId: parseInt(id),
        bookId: bookId,
        discountPercentValue: discountValue,
      });
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
    const data = {};
    if (id && discountValue != 0) {
      httpClient()
        .post(APP_API.addEventBooks, dataRequest)
        .then((res) => {
          message.success("Thêm vào sự kiện thành công!");
          console.log(res);
          onSearch();
          handleCancel();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("Ưu Đãi Phải Lớn Hơn 0");
    }
  };
  const [eventImage, setEventImage] = useState("");
  const [status, setStatus] = useState("Đang diễn ra");
  const [detail, setDetail] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
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
              setStatus(event.status);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    getEvent();
    onSearch();
    setSubmitting(true);
    console.log(keyWordSearch);
    httpClient()
      .get(APP_API.categoryBooks)
      .then((res) => {
        console.log(res);
        setCategoryArray([...res.data]);
        console.log(categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booksAddEventSearch]);
  return (
    <>
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
          &nbsp;Thêm Sản Phẩm Vào {detail} ({formatDate(dayStart)} tới{" "}
          {formatDate(dayEnd)})
        </h3>
        <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
          <Image height={300} src={eventImage}></Image>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex mb-3">
            <div className="mr-2 ">
              <p className="font-cate-title mb-1">
                {" "}
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faBookOpen}
                  color="#009933"
                />
                Thể Loại:
              </p>
              <Select
                style={{ width: "200px" }}
                allowClear
                onChange={(e) => {
                  onChange(e);
                }}
                defaultValue={"all"}
              >
                <Option value="all">
                  <p style={{ marginBottom: "0" }}>Tất Cả</p>
                </Option>
                {categoryArray.length > 0 &&
                  categoryArray.map((category: Category) => (
                    <Option value={category.id}>
                      <p style={{ marginBottom: "0" }}>
                        {category.nameCategory}
                      </p>
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="mr-2">
              <p className="font-cate-title  mb-1">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faMoneyCheck}
                  color="#FF6600"
                />
                Giá:
              </p>
              <Select
                style={{ width: "200px" }}
                allowClear
                onChange={(e) => {
                  onPriceChange(e);
                }}
                defaultValue={"all"}
              >
                <Option value="all">
                  <p style={{ marginBottom: "0" }}>Tất Cả</p>
                </Option>

                <Option value="40" className="font-cate">
                  <p style={{ marginBottom: "0" }}>Không quá 40.000đ</p>
                </Option>
                <Option value="4070" className="font-cate">
                  <p style={{ marginBottom: "0" }}>40.000đ tới 70.000đ</p>
                </Option>
                <Option value="70100" className="font-cate">
                  <p style={{ marginBottom: "0" }}>70.000đ tới 100.000đ</p>
                </Option>
                <Option value="100150" className="font-cate">
                  <p style={{ marginBottom: "0" }}> 100.000đ tới 150.000đ</p>
                </Option>
                <Option value="150" className="font-cate">
                  <p style={{ marginBottom: "0" }}> Từ 150.000đ</p>
                </Option>
              </Select>
            </div>
            <div className="mr-2">
              <p className="font-cate-title  mb-1">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faSearch}
                  color="#0099CC"
                />
                Tìm Kiếm:
              </p>
              <div style={{ minWidth: "300px" }}>
                <Search placeholder="Tìm sách..." onChange={onKeyChange} />
              </div>
            </div>
          </div>{" "}
          <div className="mr-2">
            <p className="font-cate-title  mb-1">
              <FontAwesomeIcon className="mr-2" icon={faSort} color="	#3399FF" />
              Sắp Xếp:
            </p>
            <Select
              style={{ width: "200px" }}
              allowClear
              onChange={(e) => {
                onSortChange(e);
              }}
              defaultValue={"vote"}
            >
              <Option value="vote">
                <p style={{ marginBottom: "0" }}>Đánh Giá Cao</p>
              </Option>

              <Option value="new" className="font-cate">
                <p style={{ marginBottom: "0" }}>Mới Nhất</p>
              </Option>
              <Option value="sell" className="font-cate">
                <p style={{ marginBottom: "0" }}>Bán Chạy</p>
              </Option>
            </Select>
          </div>
        </div>
        <Spin spinning={submitting}>
          <div
            className="bg-white"
            style={{ border: "1px solid rgba(0,0,0,.125)" }}
          >
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: true, y: 430 }}
              pagination={{ position: ["bottomCenter"] }}
            />
          </div>
        </Spin>
      </div>
      <Modal
        visible={visible}
        title="Đưa vào sự kiện"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="d-flex justify-content-between">
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
                    setDataRequestValue(discountType, parseInt(e.target.value));
                  }}
                  value={discountValue}
                />{" "}
                ({unit})
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AddBooksToEvent;

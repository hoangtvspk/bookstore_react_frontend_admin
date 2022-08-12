import {
  faBook,
  faBookmark,
  faBookOpen,
  faMoneyCheck,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Popconfirm, Select, Spin } from "antd";
import { SelectValue } from "antd/lib/select";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { adminRoutes } from "../../routes/routes";
import "./Books.css";

function Books() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  const onEdit = (id: string) => {
    navigate(adminRoutes.bookEdit.replace(":id", id));
  };

  const onLoad = () => {
    httpClient()
      .get("/books")
      .then((res) => {
        console.log(res);
        setBookArray(res.data);
        console.log(bookArrray);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };

  const [bookArrray, setBookArray] = useState<Book[]>([]);
  const [value, setValue] = useState(0);
  const [priceValue, setPriceValue] = useState("all");
  const { Option } = Select;
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState(0);
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const [maxPriceSearch, setMaxPriceSearch] = useState(10000000);
  const [minPriceSearch, setMinPriceSearch] = useState(0);
  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });

  const onDelete = (id: string) => {
    httpClient()
      .delete(APP_API.deleteBook.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Xóa Thành Công");
        navigate(adminRoutes.books);
        onSearch();
      })
      .catch((err) => {
        console.error(err);
      });
  };
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
      align: "center",
    },
    {
      title: "Tên Sách",
      dataIndex: "nameBook",
      key: "nameBook",
      // render: text => <a>{text}</a>,
      align: "center",
    },
    {
      title: "Thể Loại",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
      align: "center",
    },
    {
      title: "Kho",
      key: "quantity",
      dataIndex: "quantity",
      render: (_, { quantity }) => (
        <div style={{ width: "40px" }}>{quantity}</div>
      ),
      align: "center",
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <div
          className="d-flex justify-content-center"
          style={{ width: "130px" }}
        >
          {!price[2] && !price[3] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - (price[0] * price[1]) / 100)} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[1]}%)</p>
                </>
              )}
            </>
          )}
          {price[2] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - (price[0] * price[2]) / 100)} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[2]}%)</p>
                </>
              )}
            </>
          )}
          {price[3] && (
            <>
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(price[0] - price[3])} ₫
              </p>

              {price[1] > 0 && (
                <>
                  <p className="mb-0">&nbsp;(-{price[3]}đ)</p>
                </>
              )}
            </>
          )}
        </div>
      ),
      align: "center",
    },
    {
      title: "Đánh Giá",
      dataIndex: "review",
      key: "review",
      render: (_, { review }) => (
        <div className="d-flex align-items-center" style={{ width: "130px" }}>
          <p style={{ marginBottom: "0px" }}>{stringPrice(review[0])}</p>
          <p className="mb-0">&nbsp;({review[1]} lượt đánh giá)</p>
        </div>
      ),
      align: "center",
    },
    {
      title: "Sửa/Xóa",
      key: "action",
      render: (_, { id }) => (
        <div className="d-flex ">
          <u
            className="book-action-item pl-0 ml-0"
            onClick={() => {
              onEdit(id.toString());
            }}
          >
            Sửa
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Bạn Muốn Xóa Sản Phẩm Này?"
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
      align: "center",
    },
  ];
  const setBooksData = (bookList: Book[]) => {
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
            price: [
              book.price,
              book.discount,
              book.bookForEvents[0]?.discountPercentValue,
              book.bookForEvents[0]?.discountValue,
            ],
            quantity: book.quantity,
            review: [book.rating, book.reviews.length],
          },
        ]);
      });
    }
  };
  const getFavouriteBook = () => {
    setSubmitting(true);
    httpClient()
      .get("books")
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const getNewBook = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.newBook)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const getBestSellingBook = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.bestSellingBook)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const getBestDiscountBook = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.bestDiscountBook)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const dispatch = useDispatch();
  const [data, setData] = useState<DataType[]>([]);
  const onChange = (e: SelectValue) => {
    setSubmitting(true);
    if (booksSearch.keyWord != null) {
      dispatch(
        updateKeySearch({
          idCategory: e,
          keyWord: booksSearch.keyWord,
          minPrice: 0,
          maxPrice: 100000000,
        })
      );
      setValue(booksSearch.idCategory);
      console.log(booksSearch.keyWord);
      let bookSearch = {};
      // setCategorySearch(e?.toString);
      if (e === "all") {
        dispatch(
          updateKeySearch({
            idCategory: null,
            keyWord: booksSearch.keyWord,
            minPrice: 0,
            maxPrice: 100000000,
          })
        );
        bookSearch = {
          idCategory: null,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else {
        bookSearch = {
          idCategory: e,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      }
      console.log(bookSearch);
      // setValue(e.target.value);
      httpClient()
        .post(APP_API.booksSearch, bookSearch)
        .then((res) => {
          console.log(res);
          setBookArray([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
    // if (e.target.value == 0) {
    //   onLoadBook();
    // } else {
  };
  const onSortChange = (e: SelectValue) => {
    console.log(e);
    if (e === "vote") getFavouriteBook();
    else if (e === "new") getNewBook();
    else if (e === "sell") getBestSellingBook();
    else if (e === "discount") getBestDiscountBook();
  };
  const onPriceChange = (e: SelectValue) => {
    setSubmitting(true);
    if (booksSearch.keyWord != null) {
      let bookSearch = {};

      const priceSearch = (
        min: number,
        max: number,
        id: number,
        key: string
      ) => {
        setMinPriceSearch(min);
        setMaxPriceSearch(max);

        if (value === 0) {
          bookSearch = {
            idCategory: null,
            keyWord: booksSearch.keyWord,
            minPrice: min,
            maxPrice: max,
          };
        } else {
          bookSearch = {
            idCategory: id,
            keyWord: booksSearch.keyWord,
            minPrice: min,
            maxPrice: max,
          };
        }
      };

      if (e === "all") {
        priceSearch(0, 10000000, categorySearch, "");
      } else if (e === "40") {
        priceSearch(0, 40000, categorySearch, "");
      } else if (e === "4070") {
        priceSearch(40000, 70000, categorySearch, "");
      } else if (e === "70100") {
        priceSearch(70000, 100000, categorySearch, "");
      } else if (e === "100150") {
        priceSearch(100000, 150000, categorySearch, "");
      } else if (e === "150") {
        priceSearch(150000, 10000000, categorySearch, "");
      }
      console.log(bookSearch);

      httpClient()
        .post(APP_API.booksSearch, bookSearch)
        .then((res) => {
          console.log(res);
          setBookArray([...res.data]);
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  const onSearch = () => {
    setSubmitting(true);

    if (booksSearch.keyWord != null) {
      console.log(booksSearch);
      if (booksSearch.idCategory == null) setValue(0);
      else {
        setValue(booksSearch.idCategory);
      }
      //setValue(booksSearch.idCategory);
      setCategorySearch(booksSearch.idCategory);
      let bookSearch = {};
      if (value == 0 && booksSearch.idCategory != null) {
        bookSearch = {
          idCategory: booksSearch.idCategory,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else if (value == 0 && booksSearch.idCategory == null) {
        bookSearch = {
          idCategory: null,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      } else {
        bookSearch = {
          idCategory: booksSearch.idCategory,
          keyWord: booksSearch.keyWord,
          minPrice: minPriceSearch,
          maxPrice: maxPriceSearch,
        };
      }

      httpClient()
        .post(APP_API.booksSearch, bookSearch)
        .then((res) => {
          setBookArray([...res.data]);
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setSubmitting(false));
    }
  };
  useEffect(() => {
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
  }, [booksSearch]);
  return (
    <Spin spinning={submitting}>
      <div className="bg-white pl-4 pr-4 pt-4 pb-3" style={{ width: "1220px" }}>
        <h3 style={{ color: "#555555", fontFamily: "Helvetica" }}>
          Quản Lý Sản Phẩm
        </h3>
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
            <div className="d-flex align-items-end ">
              <p style={{ margin: "0 10px" }}>
                <FontAwesomeIcon
                  color="#0099FF"
                  className="mr-2"
                  icon={faBook}
                />
                Số Lượng Sách:
              </p>
              <p style={{ margin: "0 0", color: "blue" }}>{data.length}</p>
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
              <Option value="discount" className="font-cate">
                <p style={{ marginBottom: "0" }}>Giảm Giá</p>
              </Option>
            </Select>
          </div>
        </div>
        <div className="bg-white ">
          <Table
            style={{
              border: "1px solid rgba(0,0,0,.125)",
            }}
            columns={columns}
            dataSource={data}
            scroll={{ x: true, y: 430 }}
            pagination={{ position: ["bottomCenter"] }}
          />
        </div>
      </div>
    </Spin>
  );
}

export default Books;

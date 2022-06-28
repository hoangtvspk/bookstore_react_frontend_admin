import { Collapse, message, Pagination, Popconfirm, Space, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { adminRoutes } from "../../routes/routes";
import "./Books.css";

const DEFAULT_PAGE_SIZE = 15;

function MyPurchase() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [showingBook, setShowingBook] = useState<Book[]>([]);
  const [curPage, setCurPage] = useState(1);
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };
  const onEdit = (id: string) => {
    navigate(adminRoutes.EditBook.replace(":id", id));
  };

  const onLoad = () => {
    httpClient()
      .get("/books")
      .then((res) => {
        console.log(res);
        setBookArray(res.data);
        console.log(bookArrray);
        setCurPage(1);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };

  const [bookArrray, setBookArray] = useState<Book[]>([]);

  const onPageChange = (page: number, pageSize: number) => {
    setCurPage(page);
    setShowingBook([
      ...bookArrray.slice((page - 1) * pageSize, page * pageSize),
    ]);
  };
  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteBook.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Delete Successfully");
        navigate(adminRoutes.books);
        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  interface DataType {
    bookImages: string;
    nameBook: string;
    category: string;
    author: string;
    quantity: number;
    price: number[];
    id: number;
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
      render: (text) => <div style={{ width: "60px" }}>{text}</div>,
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
            title="Are you sure to delete this book?"
            onConfirm={() => {
              onDelete(id.toString());
            }}
            okText="Yes"
            cancelText="No"
          >
            <u className="book-action-item">Xóa</u>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.newBook)
      .then((res) => {
        setSubmitting(true);
        console.log(res);
        setBookArray(res.data);
        console.log(bookArrray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);

        if (res.data.length > 0) {
          res.data.map((book: Book) => {
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
              },
            ]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => setSubmitting(false));
  }, []);
  return (
    <Spin spinning={submitting}>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 430 }}
        pagination={{ position: ["bottomCenter"] }}
      />
    </Spin>
  );
}

export default MyPurchase;

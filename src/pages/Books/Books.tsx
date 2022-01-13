import { Collapse, message, Pagination, Popconfirm, Spin } from "antd";
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
  useEffect(() => {
    httpClient()
      .get("/books")
      .then((res) => {
        console.log(res);
        setBookArray(res.data);
        console.log(bookArrray);
        setShowingBook([...res.data.slice(0, DEFAULT_PAGE_SIZE)]);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  }, []);
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

  return (
    <Spin spinning={submitting}>
      <div className="book-item">
        <div className="order-item-image-header"></div>
        <div className="order-item-name"></div>
        <div className="book-totalquantity">Category</div>
        <div className="book-totalquantity">Author</div>
        <div className="book-totalquantity">Available</div>
        <div className="book-totalquantity">Price</div>
        <div className="book-totalquantity">Action</div>
      </div>
      {showingBook.length > 0 &&
        showingBook.map((books: Book) => (
          <div className="book-item">
            <img
              className="order-item-image"
              src={books.bookImages[0].image}
            ></img>
            <div className="order-item-name">
              <p style={{ marginBottom: "0px" }}>{books.nameBook}</p>
              <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                Category: {books.category.nameCategory}
              </p>
              <p style={{ fontSize: "14px", paddingTop: "0px" }}>
                Author: {books.author}
              </p>
            </div>

            {books.category && (
              <div className="book-totalquantity">
                {books.category.nameCategory}
              </div>
            )}

            <div className="book-totalquantity">{books.author}</div>
            <div className="book-totalquantity">{books.quantity}</div>
            <div className="book-totalquantity">
              <p style={{ marginBottom: "0px" }}>
                {stringPrice(
                  books.price - (books.price * books.discount) / 100
                )}{" "}
                ₫
              </p>
              {books.discount > 0 && (
                <>
                  <p
                    style={{
                      color: "rgb(128, 128, 137) ",
                      marginTop: "8px",
                      fontSize: "15px",
                      textDecoration: "line-through",
                      paddingLeft: "8px",
                      marginBottom: "0px",
                    }}
                  >
                    {stringPrice(books.price)} ₫
                  </p>
                  <p className="discountt">-{books.discount}%</p>
                </>
              )}
            </div>
            <div className="book-totalquantity">
              <div className="d-flex align-items-center">
                <u
                  className="book-action-item"
                  onClick={() => {
                    onEdit(books.id.toString());
                  }}
                >
                  Edit
                </u>
                <p className="action-item-slice"> | </p>
                <Popconfirm
                  title="Are you sure to delete this book?"
                  onConfirm={() => {
                    onDelete(books.id.toString());
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <u className="book-action-item">Delete</u>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      <div className="text-center">
        <Pagination
          className="p-3 mb-4"
          total={bookArrray.length}
          onChange={onPageChange}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          current={curPage}
          showSizeChanger={false}
        />
      </div>
    </Spin>
  );
}

export default MyPurchase;

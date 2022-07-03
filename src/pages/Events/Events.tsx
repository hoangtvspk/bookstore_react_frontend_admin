import { message, Popconfirm, Select, Spin, Image } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { Event } from "../../models/event";
import { adminRoutes } from "../../routes/routes";
import "./Events.css";

function Events() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

    return newNumber;
  };
  const onEdit = (id: string) => {
    navigate(adminRoutes.eventBooks.replace(":id", id));
  };

  const onLoad = () => {
    httpClient()
      .get(adminRoutes.events)
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

  const [keyWordSearch, setKeyWordSearch] = useState("");

  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteEvents.replace(":id", id))
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
    image: string;
    detail: string;
    dayStart: string;
    dayEnd: string;
    id: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <div style={{ width: 12 }}>{text}</div>,
      align: "center",
    },
    {
      title: "Hình",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image width="400px" alt="" src={text}></Image>,
      align: "center",
    },
    {
      title: "Sự Kiện",
      dataIndex: "detail",
      key: "detail",
      // render: text => <a>{text}</a>,
      align: "center",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "dayStart",
      key: "dayStart",
      align: "center",
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "dayEnd",
      key: "dayEnd",
      align: "center",
    },
    {
      title: "Tùy Chọn",
      align: "center",
      key: "action",
      render: (_, { id }) => (
        <u
          className="book-action-item pl-0 ml-0"
          onClick={() => {
            onEdit(id.toString());
          }}
        >
          Chi Tiết
        </u>
      ),
    },
  ];
  const setBooksData = (events: Event[]) => {
    setSubmitting(true);
    if (events.length > 0) {
      setData([]);
      events.map((event: Event) => {
        setData((state) => [
          ...state,
          {
            dayEnd: event.dayEnd,
            dayStart: event.dayStart,
            detail: event.detail,
            id: event.id,
            image: event.image,
          },
        ]);
      });
    }
  };
  const getEvents = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.getEvents)
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

  useEffect(() => {
    setSubmitting(true);
    console.log(keyWordSearch);
    getEvents();
  }, [booksSearch]);
  return (
    <Spin spinning={submitting}>
      <div className="bg-white pl-4 pr-4 pt-4" style={{ width: "1220px" }}>
        <div className="bg-white">
          <Table
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       navigate(
            //         adminRoutes.eventBooks.replace(
            //           ":id",
            //           data[rowIndex || 0].id.toString() || ""
            //         )
            //       );
            //     }, // click row
            //   };
            // }}
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

export default Events;

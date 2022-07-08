import { message, Popconfirm, Select, Spin, Image } from "antd";
import { SelectValue } from "antd/lib/select";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EventEmitter } from "stream";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book, Category } from "../../models/book";
import { Event } from "../../models/event";
import { adminRoutes } from "../../routes/routes";
import "./Events.css";

function Events() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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

  interface DataType {
    image: string;
    detail: string;
    dayStart: string;
    dayEnd: string;
    id: number;
    status: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <div style={{ width: 20 }}>{text}</div>,
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
      render: (text) => formatDate(text),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "dayEnd",
      key: "dayEnd",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Tình Trạng",
      dataIndex: "status",
      key: "status",
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
    setData([]);
    if (events.length > 0) {
      events.map((event: Event) => {
        setData((state) => [
          ...state,
          {
            dayEnd: event.dayEnd,
            dayStart: event.dayStart,
            detail: event.detail,
            id: event.id,
            image: event.image,
            status: event.status,
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
  const getRunningEvents = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.getRunningEvents)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const getFinishedEvents = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.getFinishedEvents)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const getFutureEvents = () => {
    setSubmitting(true);
    httpClient()
      .get(APP_API.getFutureEvents)
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitting(false));
  };
  const onselectionchange = (e: SelectValue) => {
    if (e === "all") getEvents();
    else if (e === "running") getRunningEvents();
    else if (e === "future") getFutureEvents();
    else getFinishedEvents();
  };
  const dispatch = useDispatch();
  const [data, setData] = useState<DataType[]>([]);
  const { Option } = Select;
  const formatDate = (date: string) => {
    return date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
  };
  useEffect(() => {
    setSubmitting(true);
    console.log(keyWordSearch);
    getEvents();
  }, [booksSearch]);
  return (
    <Spin spinning={submitting}>
      <div className="bg-white pl-4 pr-4 pt-4 pb-4" style={{ width: "1220px" }}>
        <Select
          style={{ width: "200px" }}
          allowClear
          onChange={(e) => {
            onselectionchange(e);
          }}
          defaultValue={"all"}
        >
          <Option value="all">
            <p style={{ marginBottom: "0" }}>Tất Cả</p>
          </Option>

          <Option value="running" className="font-cate">
            <p style={{ marginBottom: "0" }}>Đang Diễn Ra</p>
          </Option>
          <Option value="future" className="font-cate">
            <p style={{ marginBottom: "0" }}>Chưa Diễn Ra</p>
          </Option>
          <Option value="finished" className="font-cate">
            <p style={{ marginBottom: "0" }}>Đã Kết Thúc</p>
          </Option>
        </Select>
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

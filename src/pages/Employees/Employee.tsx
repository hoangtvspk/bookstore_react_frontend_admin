import { message, Popconfirm, Spin, Image } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { User } from "../../models/getUser";
import { UserInfo } from "../../models/user";
import { adminRoutes } from "../../routes/routes";
import "./User.css";

function Employee() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [usersArray, setUsersArray] = useState<User[]>([]);

  const onEdit = (id: string) => {
    navigate(adminRoutes.editEmployees.replace(":id", id));
  };

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteEmployees.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Xóa Thành Công!");

        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  interface DataType {
    image: string;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image alt="user image" width={50} height={50} src={text}></Image>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: text => <a>{text}</a>,
    },

    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Số Điện Thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },

    {
      title: "Sửa/Xóa",
      key: "action",
      render: (_, { id }) => (
        <div className="d-flex">
          <u
            className="book-action-item pl-0 ml-0"
            onClick={() => {
              onEdit(id.toString());
            }}
          >
            Cập Nhật
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Bạn muốn xóa nhân viên này?"
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
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    setData([]);
    setSubmitting(true);
    httpClient()
      .get(APP_API.employees)
      .then((res) => {
        console.log(res);
        setUsersArray([...res.data]);
        console.log(usersArray);
        if (res.data.length > 0) {
          res.data.map((user: User) => {
            setData((state) => [
              ...state,
              {
                id: user.id,
                image: user.image,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
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
  };
  return (
    <Spin spinning={submitting}>
      <div className="bg-white pt-4 pb-4 pr-5 pl-5">
        <h3 style={{ color: "#555555", fontFamily: "Helvetica" }}>
          Quản Lý Nhân Viên
        </h3>
        <Table
          columns={columns}
          dataSource={data.slice().reverse()}
          pagination={{ position: ["bottomCenter"] }}
          style={{ border: "1px solid rgba(0,0,0,.125)" }}
        />
      </div>
    </Spin>
  );
}

export default Employee;

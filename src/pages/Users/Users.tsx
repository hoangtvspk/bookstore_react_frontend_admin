import { message, Popconfirm, Spin } from "antd";
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

function Users() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const stringPrice = (number: number) => {
    const newNumber = number.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    console.log(newNumber);
    return newNumber;
  };

  const [usersArray, setUsersArray] = useState<User[]>([]);

  const onEdit = (id: string) => {
    navigate(adminRoutes.editUsers.replace(":id", id));
  };

  const onDelete = (id: string) => {
    setSubmitting(true);
    httpClient()
      .delete(APP_API.deleteUsers.replace(":id", id))
      .then((res) => {
        console.log(res);
        message.success("Delete Successfully");
        navigate(adminRoutes.users);
        onLoad();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSubmitting(false));
  };
  interface DataType {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: text => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
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
            className="book-action-item"
            onClick={() => {
              onEdit(id.toString());
            }}
          >
            Cập Nhật
          </u>
          <p className="action-item-slice"> | </p>
          <Popconfirm
            title="Bạn muốn xóa người dùng này?"
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
    setSubmitting(true);
    httpClient()
      .get(APP_API.users)
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
      <Table columns={columns} dataSource={data} />
    </Spin>
  );
}

export default Users;

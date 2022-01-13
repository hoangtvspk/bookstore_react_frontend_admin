import { message, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_API } from "../../httpClient/config";
import { httpClient } from "../../httpClient/httpServices";
import { Book } from "../../models/book";
import { User } from "../../models/getUser";
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

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    httpClient()
      .get(APP_API.users)
      .then((res) => {
        console.log(res);
        setUsersArray([...res.data]);
        console.log(usersArray);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
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

  return (
    <Spin spinning={submitting}>
      <div className="user-item">
        <div className="user-propertive-name-title">Id</div>
        <div className="user-propertive-title">Email</div>
        <div className="user-propertive-title">First Name</div>
        <div className="user-propertive-name-title">Last Name</div>
        <div className="user-propertive-title">Phone Number</div>
        <div className="user-propertive-title">Activation Code</div>
        <div className="user-propertive-title">Password Reset</div>
        <div className="user-propertive-title">Active</div>
        <div className="user-propertive-title">Action</div>
      </div>
      {usersArray.length > 0 &&
        usersArray.map((users: User) => (
          <div className="book-item">
            <div className="user-propertive-name">{users.id}</div>
            <div className="user-propertive">{users.email}</div>
            <div className="user-propertive">{users.firstName}</div>
            <div className="user-propertive-name">{users.lastName}</div>
            <div className="user-propertive">{users.phoneNumber}</div>
            <div className="user-propertive">{users.activationCode}</div>
            <div className="user-propertive">{users.passwordResetCode}</div>
            <div className="user-propertive"> {users.active.toString()}</div>
            <div className="user-propertive">
              <div className="d-flex">
                <u
                  className="book-action-item"
                  onClick={() => {
                    onEdit(users.id.toString());
                  }}
                >
                  Edit
                </u>
                <p className="action-item-slice"> | </p>
                <Popconfirm
                  title="Are you sure to delete this user?"
                  onConfirm={() => {
                    onDelete(users.id.toString());
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
    </Spin>
  );
}

export default Users;

import { AutoComplete, Divider, Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BookTwoTone,
  MoneyCollectFilled,
  DashboardFilled,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./Layout.css";
import {
  faAddressCard,
  faMoneyBill,
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { adminRoutes } from "../../routes/routes";
import { Link, useLocation } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../redux/slices/authSlice";
import Logo from "../../Image/logoLeft.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCrumb from "../BreadCrumbs/BreadCrumb";

const { Header, Content } = Layout;
const AppLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[1] || "home"
  );
  const toggle = () => {
    setCollapsed((preValue) => !preValue);
    console.log(collapsed);
  };
  const userName = useSelector((state: RootStateOrAny) => {
    if (state.authSlice.userInfo) {
      return (
        state.authSlice.userInfo.firstName +
        " " +
        state.authSlice.userInfo.lastName
      );
    } else return "";
  });
  const dispatch = useDispatch();
  return (
    <>
      <Layout className="flex-row">
        <Sider
          className="app-sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="250px"
        >
          <div>
            <img src={Logo} className="logo"></img>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]}>
            <Menu.Item
              key="1"
              icon={<DashboardFilled />}
              onClick={() => setSelectedMenu("1")}
            >
              <Link to={adminRoutes.home}>Home</Link>
            </Menu.Item>
            <SubMenu key="2" icon={<BookTwoTone />} title="Books Management">
              <Menu.Item
                key="3"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("3")}
              >
                {" "}
                <Link to={adminRoutes.books}>Books List</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("4")}
              >
                <Link to={adminRoutes.addBooks}>Add New Books</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="5" icon={<UserOutlined />} title="Users Management">
              <Menu.Item
                key="6"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("6")}
              >
                {" "}
                <Link to={adminRoutes.users}>Users List</Link>
              </Menu.Item>
              <Menu.Item
                key="7"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("7")}
              >
                <Link to={adminRoutes.addUsers}>Add New Users</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="8"
              icon={<MoneyCollectFilled />}
              onClick={() => setSelectedMenu("8")}
            >
              <Link to={adminRoutes.order}>Orders</Link>
            </Menu.Item>
            {/* <Menu.Item key="9" icon={<ShoppingCartOutlined />}>
              <Link to={adminRoutes.cart}>Cart</Link>
            </Menu.Item> */}
            <SubMenu
              key="10"
              icon={<BookTwoTone />}
              title="Categories Management"
            >
              <Menu.Item
                key="11"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("11")}
              >
                {" "}
                <Link to={adminRoutes.categories}>Categories List</Link>
              </Menu.Item>
              <Menu.Item
                key="12"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("12")}
              >
                <Link to={adminRoutes.addCategories}>Add New Categories</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="13" icon={<LogoutOutlined />}>
              <p
                onClick={() => dispatch(userLogOut())}
                style={{ marginBottom: "0px" }}
              >
                Log Out
              </p>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout app-content d-flex">
          <Header
            className="site-layout-background d-flex align-items-center"
            style={{ padding: 0 }}
          >
            {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )} */}
            <BreadCrumb />
            <Menu
              mode="horizontal"
              style={{
                background: "Transparent",
                width: "400px",
                paddingLeft: "800px",
              }}
            >
              <SubMenu
                key="name"
                title={userName}
                className="font-name"
                icon={<FontAwesomeIcon className="mr-2" icon={faUserCircle} />}
              >
                <Menu.Item key="my-account">
                  <FontAwesomeIcon className="mr-2" icon={faUser} />
                  <Link to={adminRoutes.myAccount} className="font-submenu">
                    My Account
                  </Link>
                </Menu.Item>
                <Divider className="m-0" />
                <Menu.Item key="logout" onClick={() => dispatch(userLogOut())}>
                  <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                  <Link to={adminRoutes.login} className="font-submenu">
                    Log Out
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              marginTop: 24,
              marginRight: 24,
              marginLeft: 24,
              paddingTop: 24,
              minHeight: 280,
              overflow: "auto",
            }}
          >
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;

import {
  BookTwoTone,
  DashboardFilled,
  LogoutOutlined,
  MoneyCollectFilled,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Divider, Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes } from "../../routes/routes";
import "./Layout.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Provider,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import Logo from "../../Image/doubhlogo7.png";
import SideBarBackGround from "../../Image/sidebarbackground.png";
import ChartIcon from "../../Image/chart-icon-color.png";
import BookIcon from "../../Image/185628_book_icon.png";
import CustomerIcon from "../../Image/customer.png";
import OrderIcon from "../../Image/order.png";
import CateIcon from "../../Image/categories.png";
import LogOutIcon from "../../Image/logout.png";
import EventIcon from "../../Image/event.png";
import { userLogOut } from "../../redux/slices/authSlice";
import BreadCrumb from "../BreadCrumbs/BreadCrumb";
import Search from "antd/lib/input/Search";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import { faDashcube } from "@fortawesome/free-brands-svg-icons";
import PageFooter from "../Footer/Footer";

const { Header, Content } = Layout;
const AppLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[1] || "home"
  );
  const [openKey, setOpenKey] = useState<string[]>([]);
  const toggle = () => {
    setCollapsed((preValue) => !preValue);
    console.log(collapsed);
  };
  const navigate = useNavigate();
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
  const booksSearch = useSelector((state: RootStateOrAny) => {
    return state.keySearchSlice.booksSearch;
  });

  const [keyWordSearch, setKeyWordSearch] = useState("");

  const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (booksSearch.keyWord != null) {
      setKeyWordSearch(e.target.value);
      console.log(booksSearch);
      dispatch(
        updateKeySearch({
          idCategory: booksSearch.idCategory,
          keyWord: e.target.value,
          minPrice: 0,
          maxPrice: 100000000,
        })
      );
    }
  };
  useEffect(() => {
    switch (location.pathname.split("/")[1]) {
      case "booksList":
        setOpenKey(["books"]);
        break;
      case "booksListAdd":
        setOpenKey(["books"]);
        break;
      case "usersList":
        setOpenKey(["users"]);
        break;
      case "usersListAdd":
        setOpenKey(["users"]);
        break;
      case "categories":
        setOpenKey(["category"]);
        break;
      case "categoriesAdd":
        setOpenKey(["category"]);
        break;
      case "eventsList":
        setOpenKey(["events"]);
        break;
      case "eventsListAdd":
        setOpenKey(["events"]);
        break;
      default:
        setOpenKey([]);
        break;
    }
  }, []);
  return (
    <>
      <Layout className="flex-row">
        <Sider
          style={{ backgroundImage: "url(" + SideBarBackGround + ")" }}
          className="app-sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="250px"
        >
          <div>
            <img src={Logo} className="logo"></img>
          </div>
          <Divider
            style={{
              borderTop: "1px solid #555555",
              marginTop: "5px",
              marginBottom: "9px",
            }}
          ></Divider>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedMenu]}
            openKeys={openKey}
          >
            <Menu.Item
              key="/"
              onClick={() => setSelectedMenu("/")}
              icon={
                <>
                  {
                    <img
                      src={ChartIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
            >
              <Link to={adminRoutes.home}>Trang Chủ</Link>
            </Menu.Item>
            <SubMenu
              key="books"
              icon={
                <>
                  {
                    <img
                      src={BookIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
              title="Sản Phẩm"
              onTitleClick={() => {
                if (openKey.includes("books"))
                  setOpenKey(openKey.filter((item) => item !== "books"));
                else setOpenKey((state) => [...state, "books"]);
              }}
            >
              <Menu.Item
                key="booksList"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  setSelectedMenu("booksList");
                }}
              >
                {" "}
                <Link to={adminRoutes.books}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="booksListAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("booksListAdd")}
              >
                <Link to={adminRoutes.addBooks}>Thêm</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="users"
              icon={
                <>
                  {
                    <img
                      src={CustomerIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
              title="Khách Hàng"
              onTitleClick={() => {
                if (openKey.includes("users"))
                  setOpenKey(openKey.filter((item) => item !== "users"));
                else setOpenKey((state) => [...state, "users"]);
              }}
            >
              <Menu.Item
                key="usersList"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("usersList")}
              >
                {" "}
                <Link to={adminRoutes.users}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="usersListAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("usersListAdd")}
              >
                <Link to={adminRoutes.addUsers}>Thêm</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="ordersList"
              icon={
                <>
                  {
                    <img
                      src={OrderIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
              onClick={() => setSelectedMenu("ordersList")}
            >
              <Link to={adminRoutes.order}>Đơn Hàng</Link>
            </Menu.Item>
            {/* <Menu.Item key="9" icon={<ShoppingCartOutlined />}>
              <Link to={adminRoutes.cart}>Cart</Link>
            </Menu.Item> */}
            <SubMenu
              key="category"
              icon={
                <>
                  {
                    <img
                      src={CateIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
              title="Danh Mục Sách"
              onTitleClick={() => {
                if (openKey.includes("category"))
                  setOpenKey(openKey.filter((item) => item !== "category"));
                else setOpenKey((state) => [...state, "category"]);
              }}
            >
              <Menu.Item
                key="categories"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("11")}
              >
                {" "}
                <Link to={adminRoutes.categories}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="categoriesAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("categoriesAdd")}
              >
                <Link to={adminRoutes.addCategories}>Thêm</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="events"
              icon={
                <>
                  {
                    <img
                      src={EventIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
              title="Sự Kiện"
              onTitleClick={() => {
                if (openKey.includes("events"))
                  setOpenKey(openKey.filter((item) => item !== "events"));
                else setOpenKey((state) => [...state, "events"]);
              }}
            >
              <Menu.Item
                key="eventsList"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => setSelectedMenu("11")}
              >
                {" "}
                <Link to={adminRoutes.categories}>Đang Diễn Ra</Link>
              </Menu.Item>
              <Menu.Item
                key="eventsListAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => setSelectedMenu("12")}
              >
                <Link to={adminRoutes.addCategories}>Thêm</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="logout"
              icon={
                <>
                  {
                    <img
                      src={LogOutIcon}
                      height={30}
                      width={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    ></img>
                  }
                  &nbsp; &nbsp;
                </>
              }
            >
              <p
                onClick={() => dispatch(userLogOut())}
                style={{ marginBottom: "0px" }}
              >
                Đăng Xuất
              </p>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout app-content d-flex"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <Header
            className="site-layout-background d-flex align-items-center"
            style={{
              padding: 0,
              borderBottom: "1px solid rgba(0,0,0,.1)",
              backgroundColor: "#f8f9fa",
              height: "80px",
            }}
          >
            {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )} */}
            <BreadCrumb />
            <div
              style={{
                minWidth: "60%",
                marginRight: "20px",
                marginLeft: "20px",
                paddingTop: "25px",
              }}
            >
              <Search
                placeholder="Hôm nay bạn tìm sách gì..."
                enterButton="Tìm Kiếm"
                size="large"
                onChange={onKeyChange}
                onSearch={() => {
                  if (booksSearch.keyWord != null) {
                    dispatch(
                      updateKeySearch({
                        idCategory: booksSearch.idCategory,
                        keyWord: keyWordSearch,
                        minPrice: 0,
                        maxPrice: 100000000,
                      })
                    );
                  }

                  navigate(adminRoutes.books);
                  window.scrollTo(0, 0);
                }}
                className="bg-transparent mr-6"
              />
            </div>
            <Menu
              mode="horizontal"
              style={{
                background: "Transparent",
                width: "400px",
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
          <Content>
            <div
              className="site-layout-background rounded-3"
              style={{
                marginTop: 24,
                marginRight: 24,
                marginLeft: 24,
                marginBottom: 24,
                minHeight: 550,
              }}
            >
              {children}
            </div>
            <PageFooter></PageFooter>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;

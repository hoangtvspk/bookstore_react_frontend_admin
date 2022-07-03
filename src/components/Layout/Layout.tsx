import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Divider, Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes } from "../../routes/routes";
import "./Layout.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "antd/lib/input/Search";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import BookIcon from "../../Image/185628_book_icon.png";
import CateIcon from "../../Image/categories.png";
import ChartIcon from "../../Image/chart-icon-color.png";
import CustomerIcon from "../../Image/customer.png";
import Logo from "../../Image/doubhlogo7.png";
import Employees from "../../Image/employee.png";
import EventIcon from "../../Image/event.png";
import LogOutIcon from "../../Image/logout.png";
import OrderIcon from "../../Image/order.png";
import SideBarBackGround from "../../Image/sidebarbackground.png";
import { UserInfo } from "../../models/auth";
import { userLogOut } from "../../redux/slices/authSlice";
import { updateKeySearch } from "../../redux/slices/keySearchSlice";
import PageFooter from "../Footer/Footer";

const { Header, Content } = Layout;
const AppLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [myLocation, setMyLocation] = useState("Thống Kê");
  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[1] || "home"
  );
  const [openKey, setOpenKey] = useState<string[]>([]);
  const toggle = () => {
    setCollapsed((preValue) => !preValue);
    console.log(collapsed);
  };
  const navigate = useNavigate();
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.authSlice.userInfo as UserInfo
  );
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
      case "":
        setMyLocation("Thống Kê");
        break;
      case "booksList":
        setOpenKey(["books"]);
        setMyLocation("Quản Lý Sách");
        break;
      case "booksListAdd":
        setOpenKey(["books"]);
        setMyLocation("Quản Lý Sách");
        break;
      case "booksListEdit":
        setSelectedMenu("booksList");
        setOpenKey(["books"]);
        setMyLocation("Quản Lý Sách");
        break;
      case "usersList":
        setOpenKey(["users"]);
        setMyLocation("Khách Hàng");
        break;
      case "usersListAdd":
        setOpenKey(["users"]);
        setMyLocation("Khách Hàng");
        break;
      case "usersListEdit":
        setSelectedMenu("usersList");
        setOpenKey(["users"]);
        setMyLocation("Khách Hàng");
        break;
      case "categories":
        setOpenKey(["category"]);
        setMyLocation("Danh Mục Sách");
        break;
      case "categoriesAdd":
        setOpenKey(["category"]);
        setMyLocation("Danh Mục Sách");
        break;
      case "categoriesEdit":
        setSelectedMenu("categories");
        setOpenKey(["category"]);
        setMyLocation("Danh Mục Sách");
        break;
      case "events":
        setOpenKey(["event"]);
        setMyLocation("Sự Kiện");
        break;
      case "addEvent":
        setOpenKey(["event"]);
        setMyLocation("Sự Kiện");
        break;
      case "editEvent":
        setSelectedMenu("events");
        setOpenKey(["event"]);
        setMyLocation("Sự Kiện");
        break;
      case "eventBooks":
        setSelectedMenu("events");
        setOpenKey(["event"]);
        setMyLocation("Sự Kiện");
        break;
      case "addBooksToEvent":
        setSelectedMenu("events");
        setOpenKey(["event"]);
        setMyLocation("Sự Kiện");
        break;
      case "ordersList":
        setMyLocation("Đơn Hàng");
        break;
      case "employeesList":
        setOpenKey(["employees"]);
        setMyLocation("Nhân Viên");
        break;
      case "employeesListEdit":
        setSelectedMenu("employeesList");
        setOpenKey(["employees"]);
        setMyLocation("Nhân Viên");
        break;
      case "employeesListAdd":
        setOpenKey(["employees"]);
        setMyLocation("Nhân Viên");
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
          // style={{ backgroundColor: "white" }}
          className="app-sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="250px"
        >
          <div className="ml-2 mt-2">
            <img
              src={Logo}
              onClick={() => {
                setSelectedMenu("/");
                window.scroll(0, 0);
                setMyLocation("Thống Kê");
                navigate(adminRoutes.home);
              }}
              className="logo"
              style={{ cursor: "pointer" }}
            ></img>
          </div>
          <Divider
            style={{
              borderTop: "1px solid #D3D3D3",
              marginTop: "3px",
              marginBottom: "20px",
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
              onClick={() => {
                setSelectedMenu("/");
                window.scroll(0, 0);
                setMyLocation("Thống Kê");
              }}
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
              <Link to={adminRoutes.home}>Thống Kê Doanh Thu</Link>
            </Menu.Item>
            {userInfo.userRole === "ADMIN" && (
              <SubMenu
                key="employees"
                icon={
                  <>
                    {
                      <img
                        src={Employees}
                        height={30}
                        width={30}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      ></img>
                    }
                    &nbsp; &nbsp;
                  </>
                }
                title="Nhân Viên"
                onTitleClick={() => {
                  if (openKey.includes("employees"))
                    setOpenKey(openKey.filter((item) => item !== "employees"));
                  else setOpenKey((state) => [...state, "employees"]);
                }}
              >
                <Menu.Item
                  key="employeesList"
                  style={{ paddingLeft: "60px" }}
                  icon={<UnorderedListOutlined />}
                  onClick={() => {
                    setSelectedMenu("employeesList");
                    window.scroll(0, 0);
                    setMyLocation("Nhân Viên");
                  }}
                >
                  {" "}
                  <Link to={adminRoutes.employees}>Danh Sách</Link>
                </Menu.Item>
                <Menu.Item
                  key="employeesListAdd"
                  style={{ paddingLeft: "60px" }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setSelectedMenu("employeesListAdd");
                    window.scroll(0, 0);
                    setMyLocation("Nhân Viên");
                  }}
                >
                  <Link to={adminRoutes.addEmployees}>Thêm</Link>
                </Menu.Item>
              </SubMenu>
            )}
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
                  window.scroll(0, 0);
                  setMyLocation("Quản Lý Sách");
                }}
              >
                {" "}
                <Link to={adminRoutes.books}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="booksListAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedMenu("booksListAdd");
                  window.scroll(0, 0);
                  setMyLocation("Quản Lý Sách");
                }}
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
                onClick={() => {
                  setSelectedMenu("usersList");
                  window.scroll(0, 0);
                  setMyLocation("Khách Hàng");
                }}
              >
                {" "}
                <Link to={adminRoutes.users}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="usersListAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedMenu("usersListAdd");
                  window.scroll(0, 0);
                  setMyLocation("Khách Hàng");
                }}
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
              onClick={() => {
                setSelectedMenu("ordersList");
                window.scroll(0, 0);
                setMyLocation("Đơn Hàng");
              }}
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
                onClick={() => {
                  setSelectedMenu("categories");
                  window.scroll(0, 0);
                  setMyLocation("Danh Mục Sách");
                }}
              >
                {" "}
                <Link to={adminRoutes.categories}>Danh Sách</Link>
              </Menu.Item>
              <Menu.Item
                key="categoriesAdd"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedMenu("categoriesAdd");
                  window.scroll(0, 0);
                  setMyLocation("Danh Mục Sách");
                }}
              >
                <Link to={adminRoutes.addCategories}>Thêm</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="event"
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
                if (openKey.includes("event"))
                  setOpenKey(openKey.filter((item) => item !== "event"));
                else setOpenKey((state) => [...state, "event"]);
              }}
            >
              <Menu.Item
                key="events"
                style={{ paddingLeft: "60px" }}
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  setSelectedMenu("events");
                  window.scroll(0, 0);
                  setMyLocation("Sự Kiện");
                }}
              >
                {" "}
                <Link to={adminRoutes.events}>Đang Diễn Ra</Link>
              </Menu.Item>
              <Menu.Item
                key="addEvent"
                style={{ paddingLeft: "60px" }}
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedMenu("addEvent");
                  window.scroll(0, 0);
                  setMyLocation("Sự Kiện");
                }}
              >
                <Link to={adminRoutes.addEvents}>Thêm</Link>
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
            <div
              style={{
                fontSize: "18px",
                width: "200px",
                marginLeft: "30px",
                fontFamily: "Helvetica",
                color: "#888",
              }}
            >
              {myLocation}
            </div>
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
                icon={
                  <img
                    src={userInfo?.image}
                    height={30}
                    width={30}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  ></img>
                }
              >
                <Menu.Item key="my-account">
                  <FontAwesomeIcon
                    color="#339933"
                    className="mr-2"
                    icon={faUser}
                  />
                  <Link to={adminRoutes.myAccount} className="font-submenu">
                    Thông Tin Cá Nhân
                  </Link>
                </Menu.Item>
                <Divider className="m-0" />
                <Menu.Item key="logout" onClick={() => dispatch(userLogOut())}>
                  <FontAwesomeIcon
                    color="#FF9900"
                    className="mr-2"
                    icon={faSignOutAlt}
                  />
                  <Link to={adminRoutes.login} className="font-submenu">
                    Đăng Xuất
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

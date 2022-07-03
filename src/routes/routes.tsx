import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Books from "../pages/Books/Books";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AddBooks from "../pages/Books/AddBooks";
import EditBook from "../pages/Books/EditBooks";
import Orders from "../pages/Orders/Orders";
import User from "../pages/Users/Users";

import AddUsers from "../pages/Users/AddUser";
import EditUsers from "../pages/Users/EditUser";
import Categories from "../pages/Categories/Categories";
import EditCategories from "../pages/Categories/EditCategories";
import AddCategories from "../pages/Categories/AddCategories";
import MyAccount from "../pages/MyAccount/MyAccount";
import UpdateProfile from "../pages/MyAccount/UpdateProfile";
import UpdatePassword from "../pages/MyAccount/UpdatePassword";
import OrderDetail from "../pages/Orders/OrderDetail";
import Employee from "../pages/Employees/Employee";
import AddEmployee from "../pages/Employees/AddEmployee";
import EditEmployee from "../pages/Employees/EditEmployee";
import OrderReport from "../pages/Home/OrderReport";
import Events from "../pages/Events/Events";
import AddEvents from "../pages/Events/AddEvents";
import EditEvents from "../pages/Events/EditEvents";
import EventBooks from "../pages/Events/EventBooks";
import AddBooksToEvent from "../pages/Events/AddBooksToEvent";

export const adminRoutes = {
  login: "/login",
  home: "/",
  orderReport: "/orderReport",
  books: "/booksList",
  addBooks: "/booksListAdd",
  bookEdit: "/booksListEdit/:id",
  employees: "/employeesList",
  addEmployees: "/employeesListAdd",
  editEmployees: "/employeesListEdit/:id",
  users: "/usersList",
  addUsers: "/usersListAdd",
  editUsers: "/usersListEdit/:id",
  order: "/ordersList",
  orderDetail: "/ordersList/orderdetail/:id",
  cart: "/cartsList",
  categories: "/categories",
  editCategories: "/categoriesEdit/:id",
  addCategories: "/categoriesAdd",
  myAccount: "/my-account",
  updateProfile: "/my-accountUpdate",
  updatePassword: "/my-account/password",
  events: "/events",
  addEvents: "/addEvent",
  editEvents: "/editEvent/:id",
  eventBooks: "/eventBooks/:id",
  addBookToEvent: "/addBooksToEvent/:id",
};

interface IAppComponentConfig {
  path: string;
  component: React.ReactElement | null;
  noAuthRequired?: boolean;
  isAdminRequired?: boolean;
}

export const appComponentConfig: IAppComponentConfig[] = [
  {
    path: adminRoutes.home,
    component: <Home />,
  },
  {
    path: adminRoutes.login,
    component: <Login />,
    noAuthRequired: true,
  },
  {
    path: adminRoutes.books,
    component: <Books />,
  },
  {
    path: adminRoutes.addBooks,
    component: <AddBooks />,
  },
  {
    path: adminRoutes.bookEdit,
    component: <EditBook />,
  },
  {
    path: adminRoutes.order,
    component: <Orders />,
  },
  {
    path: adminRoutes.employees,
    component: <Employee />,
    isAdminRequired: true,
  },

  {
    path: adminRoutes.addEmployees,
    component: <AddEmployee />,
    isAdminRequired: true,
  },
  {
    path: adminRoutes.editEmployees,
    component: <EditEmployee />,
    isAdminRequired: true,
  },
  {
    path: adminRoutes.users,
    component: <User />,
  },

  {
    path: adminRoutes.addUsers,
    component: <AddUsers />,
  },
  {
    path: adminRoutes.editUsers,
    component: <EditUsers />,
  },
  {
    path: adminRoutes.categories,
    component: <Categories />,
  },
  {
    path: adminRoutes.addCategories,
    component: <AddCategories />,
  },
  {
    path: adminRoutes.editCategories,
    component: <EditCategories />,
  },
  {
    path: adminRoutes.myAccount,
    component: <MyAccount />,
  },
  {
    path: adminRoutes.updateProfile,
    component: <UpdateProfile />,
  },
  {
    path: adminRoutes.updatePassword,
    component: <UpdatePassword />,
  },
  {
    path: adminRoutes.orderDetail,
    component: <OrderDetail />,
  },
  {
    path: adminRoutes.orderReport,
    component: <OrderReport />,
  },
  {
    path: adminRoutes.events,
    component: <Events />,
  },
  {
    path: adminRoutes.addEvents,
    component: <AddEvents />,
  },
  {
    path: adminRoutes.editEvents,
    component: <EditEvents />,
  },
  {
    path: adminRoutes.eventBooks,
    component: <EventBooks />,
  },
  {
    path: adminRoutes.addBookToEvent,
    component: <AddBooksToEvent />,
  },
];

export const renderAppComponent = (
  data: IAppComponentConfig[],
  isAuth: boolean,
  isAdmin: boolean
) => {
  return (
    <Routes>
      {data.map((route: IAppComponentConfig) => {
        console.log(route);
        if (isAuth && route.noAuthRequired) {
          return (
            <Route
              path={route.path}
              element={<Navigate replace to={adminRoutes.home}></Navigate>}
            ></Route>
          );
        } else if (!isAuth && route.path !== adminRoutes.login) {
          return (
            <Route
              path={route.path}
              element={<Navigate replace to={adminRoutes.login}></Navigate>}
            ></Route>
          );
        }
        if (!isAdmin && route.isAdminRequired) {
          return (
            <Route
              path={route.path}
              element={<Navigate replace to={adminRoutes.home}></Navigate>}
            ></Route>
          );
        }
        return (
          <Route
            path={route.path}
            element={
              route.path === adminRoutes.login ? (
                route.component
              ) : (
                <Layout>{route.component}</Layout>
              )
            }
          ></Route>
        );
      })}
    </Routes>
  );
};

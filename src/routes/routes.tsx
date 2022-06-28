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
// import OrderDetail from "../pages/Orders/OrderDetail";

export const adminRoutes = {
  login: "/login",
  home: "/",
  books: "/booksList",
  addBooks: "/booksListAdd",
  EditBook: "/booksListEdit/:id",
  users: "/usersList",
  addUsers: "/usersListAdd",
  editUsers: "/usersListEdit/:id",
  order: "/ordersList",
  // orderDetail: "/ordersList/orderdetail/:id",
  cart: "/cartsList",
  categories: "/categories",
  editCategories: "/categoriesEdit/:id",
  addCategories: "/categoriesAdd",
  myAccount: "/my-account",
  updateProfile: "/my-accountUpdate",
  updatePassword: "/my-account/password",
};

interface IAppComponentConfig {
  path: string;
  component: React.ReactElement | null;
  noAuthRequired?: boolean;
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
    path: adminRoutes.EditBook,
    component: <EditBook />,
  },
  {
    path: adminRoutes.order,
    component: <Orders />,
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
  // {
  //   path: adminRoutes.orderDetail,
  //   component: <OrderDetail />,
  // },
];

export const renderAppComponent = (
  data: IAppComponentConfig[],
  isAuth: boolean
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

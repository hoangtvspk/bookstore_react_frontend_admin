export const HTTP_CONFIG = {
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: "https://tomcat.vanhtuan0409.com/Bookstore_springboot/api/v1/",
    // baseURL: "http://ec2-13-250-45-49.ap-southeast-1.compute.amazonaws.com:4876/Bookstore_springboot/api/v1/",
  headers: { "Content-Type": "application/json" },
};

export const APP_API = {
  login: "/auth/login-admin",
  addBook: "/admin/add",
  editBook: "/admin/edit",
  deleteBook: "/admin/delete/:id",
  users: "/admin/users",
  getUsers: "/admin/users/:id",
  addUsers: "/admin/users/add",
  editUsers: "/admin/users/edit",
  deleteUsers: "/admin/users/delete/:id",
  getOrder: "/admin/orders",
  categoryBooks: "/books/categories",
  getBook: "/books/:id",
  addCategory: "/admin/categories/add",
  editCategory: "/admin/categories/edit",
  deleteCategory: "/admin/categories/delete/:id",
  getCategory: "/admin/categories/:id",
  userInfo: "/users/account/info",
  editProfile: "/users/account/edit",
  editPassword: "/auth/edit/password",
  cancelOrder: "/admin/orders/canel/:id",
  reportByMonth: "/admin/report-revenue-month/year/:year/month/:month",
  reportByYear: "/admin/report-revenue-year/:year",
  reportByEveryYear: "/admin/report-revenue-every-year",
  reportBestSelling: "/admin/report-best-selling",
  newBook: "/books/new",
};

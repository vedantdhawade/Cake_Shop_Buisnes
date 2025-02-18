export const baseUrl = "http://localhost:5000";

export const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  getUser: {
    url: "/api/user/getuser",
    method: "post",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "put",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getcategories: {
    url: "/api/category/getcategory",
    method: "get",
  },
  deletecategories: {
    url: "/api/category/delete-category",
    method: "delete",
  },
  addProduct: {
    url: "/api/product/add-product",
    method: "post",
  },
  getProducts: {
    url: "/api/product/get-product",
    method: "get",
  },
  updateProduct: {
    url: "/api/product/update-product",
    method: "put",
  },
  deleteProduct: {
    url: "/api/product/delete-product",
    method: "delete",
  },
  getBlogs: {
    url: "api/blog/get-blog",
    method: "get",
  },
  getsingleblog: {
    url: "api/blog/get-single-blog",
    method: "post",
  },
  addBlog: {
    url: "api/blog/add-blog",
    method: "post",
  },
  deleteBlog: {
    url: "api/blog/delete-blog",
    method: "delete",
  },
  getOrders: {
    url: "/api/order/orders",
    method: "get",
  },
  updateOrderStatus: {
    url: "/api/order/update",
    method: "put",
  },
  getcart: {
    url: "/api/user/getcart",
    method: "post",
  },
  deletecart: {
    url: "/api/user/deleteCart",
    method: "delete",
  },
  addworkshop: {
    url: "/api/workshop/add-workshop",
    method: "post",
  },
  getworkshop: {
    url: "/api/workshop/workshops",
    method: "get",
  },
  deleteworkshop: {
    url: "/api/workshop/delete-workshop",
    method: "delete",
  },
  PlaceOrder: {
    url: "/api/order/add-order",
    method: "post",
  },
  trackOrder: {
    url: "/api/order/track",
    method: "post",
  },
  getfeedbacks: {
    url: "/api/feedback/get-feedback",
    method: "get",
  },
  addfeedback: {
    url: "/api/feedback/add-feedback",
    method: "post",
  },
};

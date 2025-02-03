import { getcategories } from "../../../server/controllers/Category.controller";

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
};

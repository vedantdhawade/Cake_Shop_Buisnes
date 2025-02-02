import Axios from "./Axios";
import { SummaryApi } from "../common/SummaryApi";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export default uploadImage;

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const FetchShop = async () => {
  try {
    const response = await axios.get("/shop");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const FetchProduct = async (ids) => {
  const payload = ids.join("&id=");
  try {
    const response = await axios.get(`/product?id=${payload}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const PostOrder = async (order) => {
  try {
    await axios.post("/order", { order });
  } catch (error) {
    console.log(error);
  }
};

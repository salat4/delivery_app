import axios from "axios";

axios.defaults.baseURL = "https://deliveryserverqwe.herokuapp.com";

export const FetchShop = async () => {
  try {
    const response = await axios.get("/shops");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const FetchProduct = async (id) => {
  try {
    const response = await axios.get(`/product?id=${id}`);
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

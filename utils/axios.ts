import { BASE_URL } from "@/constants/url";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const ApiClient = setupCache(
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default ApiClient;

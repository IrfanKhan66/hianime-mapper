import axios from "axios";
import { REQ_HEADERS } from "./constant";

export const client = axios.create({
  timeout: 20000,
  headers: {
    "Accept-Encoding": "gzip",
    ...REQ_HEADERS
  }
})

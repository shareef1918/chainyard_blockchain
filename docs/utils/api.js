
import axios from "axios";

export default axios.create({
  baseURL: "http://blockchain.info",
  responseType: "json"
});
import axios from "axios";
import { URL } from "../../environment";

export default class YemekhaneSuyuService {
  // GET ALL YEMEKHANE SUYU DATA
  async getAllYemekhaneSuyu() {
    return await axios.get(`${URL}/api/controller/get/yemekhaneSuyu`);
  }

}

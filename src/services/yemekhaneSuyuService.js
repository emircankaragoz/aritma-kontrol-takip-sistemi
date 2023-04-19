import axios from "axios";
import { URL } from "../../environment";

export default class YemekhaneSuyuService {
  // GET ALL YEMEKHANE SUYU DATA
  async getAllYemekhaneSuyu() {
    return await axios.get(`${URL}/api/controller/get/yemekhaneSuyu`);
  }
   // GET YEMEKHANE SUYU BY ID
   async getYemekhaneSuyuById(id) {
    let yemekhaneSuyu;
    await axios.get(`${URL}/api/controller/get/yemekhaneSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          yemekhaneSuyu = data;
        }
      });
    });
    
    return yemekhaneSuyu;
  }

}

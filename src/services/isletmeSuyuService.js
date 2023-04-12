import axios from "axios";
import { URL } from "../../environment";

export default class IsletmeSuyuService {
  // GET ALL İSLETME SUYU DATA
  async getAllIsletmeSuyu() {
    return await axios.get(`${URL}/api/controller/get/isletmeSuyu`);
  }
  // GET ISLETME SUYU BY ID
  async getIsletmeSuyuById(id) {
    let isletmeSuyu = [];
    await axios.get(`${URL}/api/controller/get/isletmeSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          isletmeSuyu.push(data);
        }
      });
    });
    console.log(isletmeSuyu);
    return isletmeSuyu;
  }

}

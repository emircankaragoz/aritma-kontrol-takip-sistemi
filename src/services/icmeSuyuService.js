import axios from "axios";
import { URL } from "../../environment";

export default class IcmeSuyuService {
  // GET ALL İCME SUYU DATA
  async getAllIcmeSuyu() {
    return await axios.get(`${URL}/api/controller/get/icmeSuyu`);
  }
   // GET ICME SUYU BY ID
   async getIcmeSuyuById(id) {
    let icmeSuyu = [];
    await axios.get(`${URL}/api/controller/get/icmeSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          icmeSuyu.push(data);
        }
      });
      console.log(icmeSuyu); 
    });
    return icmeSuyu;
  }

}

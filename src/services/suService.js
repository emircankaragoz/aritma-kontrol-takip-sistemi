import axios from "axios";
import { URL } from "../../environment";

export default class SuService {

    //İCME SUYU 
    async getAllIcmeSuyu() {
        return await axios.get(`${URL}/api/controller/get/icmeSuyu`);
    }
    async getIcmeSuyuById(id) {
        let icmeSuyu;
        await axios.get(`${URL}/api/controller/get/icmeSuyu`).then((result) => {
            result.data.map((data) => {
                if (data.id === id) {
                    icmeSuyu = data;
                }
            });
        });
        console.log(icmeSuyu);
        return icmeSuyu;
    }

    //İSLETME SUYU 

    async getAllIsletmeSuyu() {
        return await axios.get(`${URL}/api/controller/get/isletmeSuyu`);
    }
    async getIsletmeSuyuById(id) {
        let isletmeSuyu;
        await axios.get(`${URL}/api/controller/get/isletmeSuyu`).then((result) => {
            result.data.map((data) => {
                if (data.id === id) {
                    isletmeSuyu = data;
                }
            });
        });
        console.log(isletmeSuyu);
        return isletmeSuyu;
    }

    //YEMEKHANE SUYU

    
  async getAllYemekhaneSuyu() {
    return await axios.get(`${URL}/api/controller/get/yemekhaneSuyu`);
  }
   
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

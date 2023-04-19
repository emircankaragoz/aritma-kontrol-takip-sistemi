import axios from "axios";
import { URL } from "../../environment";

export default class TduService {
  
  async getAllTdu() {
    return await axios.get(`${URL}/api/controller/get/tdu`);
  }

   async getTduById(id) {
    let tdu;
    await axios.get(`${URL}/api/controller/get/tdu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
            tdu = data ;
        }
      });     
    });
    return tdu;
  }

}

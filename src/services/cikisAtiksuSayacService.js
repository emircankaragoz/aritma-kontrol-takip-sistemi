import axios from "axios";
import { URL } from "../../environment";

export default class CikisAtiksuSayacService {
  
  async getAllCikisAtiksuSayac() {
    return await axios.get(`${URL}/api/controller/get/cikisAtiksuSayac`);
  }
   
   async getCikisAtiksuSayacById(id) {
    let atiksu;
    await axios.get(`${URL}/api/controller/get/cikisAtiksuSayac`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          atiksu = data ;
        }
      });     
    });
    
    return atiksu;
  }

}

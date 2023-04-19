import axios from "axios";
import { URL } from "../../environment";

export default class SaatlikVeriService {
  
  async getAllSaatlikVeri() {
    return await axios.get(`${URL}/api/controller/get/saatlikVeri`);
  }

   async getSaatlikVeriById(id) {
    let saatlikVeri;
    await axios.get(`${URL}/api/controller/get/saatlikVeri`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
            saatlikVeri = data ;
        }
      });     
    });
    console.log(saatlikVeri);
    return saatlikVeri;
  }

}

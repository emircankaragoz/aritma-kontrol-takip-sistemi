import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";
export default class AritmaService {
  
  async getAllAtiksuAritmaGirisCikis() {
    return await axios.get(`${URL}/api/controller/get/atiksuAritmaGirisCikis`);
  }
   
   async getAtiksuAritmaGirisCikisById(id) {
    let atiksuAritma;
    await axios.get(`${URL}/api/controller/get/atiksuAritmaGirisCikis`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          atiksuAritma = data ;
        }
      });     
    });
    
    return atiksuAritma;
  }

  async getTransferDeneme(datetime){
    let girisAtiksuMiktariM3Gun1,girisAtiksuMiktariM3Gun2,girisAtiksuMiktariM3Gun;
    let cikisAtiksuMiktariM3Gun1,cikisAtiksuMiktariM3Gun2,cikisAtiksuMiktariM3Gun;
    let farkCekilenCamurMiktari;
    let aerobiktenCekilenCamurMiktari;

    const response = await axios.get(
        `${URL}/api/controller/get/atiksuAritmaGirisCikis`
    );
    const data = response.data.find(
        (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
      );

  }







  //CİKİS ATİKSU SAYAC SERVİCE
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

  //RENK GİDERİCİ TUKETİMİ SERVİCE

  async getAllRenkGidericiTuketimi() {
    return await axios.get(`${URL}/api/controller/get/renkGidericiTuketimi`);
  }
  
   async getRenkGidericiTuketimiById(id) {
    let renkGidericiTuketimi;
    await axios.get(`${URL}/api/controller/get/renkGidericiTuketimi`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
            renkGidericiTuketimi = data ;
        }
      });     
    });
    
    return renkGidericiTuketimi;
  }

  //SAATLİK VERİ SERVİCE
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
  //TDU SERVİCE

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

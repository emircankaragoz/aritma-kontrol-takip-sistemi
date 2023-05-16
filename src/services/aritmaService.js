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
          atiksuAritma = data;
        }
      });
    });

    return atiksuAritma;
  }

  async getCalculationDeneme(datetime) {
    let girisAtiksuMiktariM3Gun1, girisAtiksuMiktariM3Gun2, girisAtiksuMiktariM3Gun;
    let cikisAtiksuMiktariM3Gun1, cikisAtiksuMiktariM3Gun2, cikisAtiksuMiktariM3Gun;
    let farkCekilenCamurMiktari;
    let aerobiktenCekilenCamurMiktari;
    let kimyasalCokeltimdenCekilenCamurMiktari;
    let girisAtiksuSayacDegeri, cikisAtiksuSayacDegeri;

    const response = await axios.get(
      `${URL}/api/controller/get/atiksuAritmaGirisCikis`
    );
   
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    
   

    // Find data for the previous day
    const prevDatetime = moment(datetime)
      .subtract(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    const prevData = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == prevDatetime
    );
    

    if (data && prevData) {
      girisAtiksuMiktariM3Gun1 = parseFloat(prevData.girisAtiksuSayacDegeri);
      girisAtiksuMiktariM3Gun2 = parseFloat(data.girisAtiksuSayacDegeri);
      girisAtiksuMiktariM3Gun =
        girisAtiksuMiktariM3Gun2 - girisAtiksuMiktariM3Gun1;

      cikisAtiksuMiktariM3Gun1 = parseFloat(prevData.cikisAtiksuSayacDegeri);
      cikisAtiksuMiktariM3Gun2 = parseFloat(data.cikisAtiksuSayacDegeri);
      cikisAtiksuMiktariM3Gun = cikisAtiksuMiktariM3Gun2 - cikisAtiksuMiktariM3Gun1;

      farkCekilenCamurMiktari = girisAtiksuMiktariM3Gun-cikisAtiksuMiktariM3Gun;
      kimyasalCokeltimdenCekilenCamurMiktari = parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun);
      aerobiktenCekilenCamurMiktari = farkCekilenCamurMiktari-kimyasalCokeltimdenCekilenCamurMiktari;
      const dateAndTime = prevDatetime;
      const id = data.id;
      girisAtiksuSayacDegeri = parseFloat(data.girisAtiksuSayacDegeri);
      cikisAtiksuSayacDegeri = parseFloat(data.cikisAtiksuSayacDegeri);
      //kimyasalCokeltimdenCekilenCamurMiktari = parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun);

      return {
        girisAtiksuSayacDegeri,
        girisAtiksuMiktariM3Gun,
        cikisAtiksuSayacDegeri,
        cikisAtiksuMiktariM3Gun,
        farkCekilenCamurMiktari,
        kimyasalCokeltimdenCekilenCamurMiktari,
        aerobiktenCekilenCamurMiktari,
        dateAndTime,
        id
      };
    }
    else {
      
      
        girisAtiksuMiktariM3Gun = parseFloat(data.girisAtiksuSayacDegeri);
        cikisAtiksuMiktariM3Gun = parseFloat(data.cikisAtiksuSayacDegeri);
        farkCekilenCamurMiktari = parseFloat(data.girisAtiksuSayacDegeri)-parseFloat(data.cikisAtiksuSayacDegeri) ;
        kimyasalCokeltimdenCekilenCamurMiktari = parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun);
        aerobiktenCekilenCamurMiktari = farkCekilenCamurMiktari-kimyasalCokeltimdenCekilenCamurMiktari;
        const dateAndTime = datetime;
        const id = data.id;
        
        girisAtiksuSayacDegeri = parseFloat(data.girisAtiksuSayacDegeri);
        cikisAtiksuSayacDegeri = parseFloat(data.cikisAtiksuSayacDegeri);
      

      return {
        girisAtiksuSayacDegeri,
        girisAtiksuMiktariM3Gun,
        cikisAtiksuSayacDegeri,
        cikisAtiksuMiktariM3Gun,
        farkCekilenCamurMiktari,
        kimyasalCokeltimdenCekilenCamurMiktari,
        aerobiktenCekilenCamurMiktari,
        dateAndTime,
        id
        
       
      };
    }

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
          atiksu = data;
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
          renkGidericiTuketimi = data;
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
          saatlikVeri = data;
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
          tdu = data;
        }
      });
    });
    return tdu;
  }


  // ARITMA MADDE KULLANIM

  // SULFIRIK ASIT
  async getAllSulfirikAsitKullanim(){
    return await axios.get(`${URL}/api/controller/get/sulfirikAsitKullanim`);
  }

  async getSulfirikAsitKullanimById(id) {
    let aritma;
    await axios
      .get(`${URL}/api/controller/get/sulfirikAsitKullanim`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            aritma = data;
          }
        });
      });
    return aritma;
  }

  // DEMIR UC KLORUR
  async getAllDemirUcKlorurKullanim(){
    return await axios.get(`${URL}/api/controller/get/demirUcKlorurKullanim`);
  }

  async getDemirUcKlorurById(id) {
    let aritma;
    await axios
      .get(`${URL}/api/controller/get/demirUcKlorurKullanim`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            aritma = data;
          }
        });
      });
    return aritma;
  }

  // RENK GIDERICI
  async getAllRenkGidericiKullanim(){
    return await axios.get(`${URL}/api/controller/get/renkGidericiKullanim`);
  }

  async getRenkGidericiById(id) {
    let aritma;
    await axios
      .get(`${URL}/api/controller/get/renkGidericiKullanim`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            aritma = data;
          }
        });
      });
    return aritma;
  }
}

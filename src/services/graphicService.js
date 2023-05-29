import axios from "axios";
import { URL } from "../../environment";

export default class GraphicService {
  /* TUZ */
  /* TUZ TESİSİ */
  async getAllTuzTesisiPhValues() {
    let phValues = [];
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        phValues = result.data.map((data) =>  ({
          ph: data.ph,
          dateAndTime: data.createdAt
        }));
      });
    return phValues;
  }

  async getAllTuzTesisiYogunlukValues() {
    let yogunlukValues = [];
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        yogunlukValues = result.data.map((data) => ({
          yogunluk: data.yogunluk,
          dateAndTime: data.createdAt
        }));
      });
    return yogunlukValues;
  }
  
  async getAllTuzTesisiBikarbonatValues() {
    let bikarbonatValues = [];
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        bikarbonatValues = result.data.map((data) => ({
          bikarbonat: data.bikarbonat,
          dateAndTime: data.createdAt
        }));
      });
    return bikarbonatValues;
  }

  /* SODA TESİSİ */
  async getAllSodaTesisiCYogunluguValues() {
    let cYogunlukValues = [];
    await axios
      .get(`${URL}/api/controller/get/sodaTesisiKontrolFormu`)
      .then((result) => {
        cYogunlukValues = result.data.map((data) => ({
          cozeltiYogunlugu: data.cozeltiYogunlugu,
          dateAndTime: data.createdAt
        }));
      });
    return cYogunlukValues;
  }

  /* SODYUM KLORUR KONTROL */

  async getAllSodyumKlorurSertlikValues() {
    let sertlik = [];
    await axios
      .get(`${URL}/api/controller/get/sodyumKlorurKontrol`)
      .then((result) => {
        sertlik = result.data.map((data) => ({
          sertlik: data.sertlik,
          dateAndTime: data.createdAt
        }));
      });
    return sertlik;
  }

  async getAllSodyumKlorurDemirValues() {
    let demir = [];
    await axios
      .get(`${URL}/api/controller/get/sodyumKlorurKontrol`)
      .then((result) => {
        demir = result.data.map((data) => ({
          demir: data.demir,
          dateAndTime: data.createdAt
        }));
      });
    return demir;
  }

  /* SU */
  /* Isletmeye Suyu */

  async su_getAllPHValues(subCategory) {
    let values = [];
    await axios.get(`${URL}/api/controller/get/isletmeSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.subCategory === subCategory) {
          const value = {
            dateAndTime: data.createdAt, 
            ph: data.ph
          };
          values.push(value);
        }
      });
    });
    return values;
  }

  async su_getAllSertlikValues(subCategory) {
    let values = [];
    await axios.get(`${URL}/api/controller/get/isletmeSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.subCategory === subCategory) {
          const value = {
            dateAndTime: data.createdAt, 
            sertlik: data.sertlik
          };
          values.push(value);
        }
      });
    });
    return values;
  }

  async su_getAllBikarbonatValues(subCategory) {
    let values = [];
    await axios.get(`${URL}/api/controller/get/isletmeSuyu`).then((result) => {
      result.data.map((data) => {
        if (data.subCategory === subCategory) {
          const value = {
            dateAndTime: data.createdAt, 
            bikarbonat: data.bikarbonat
          };
          values.push(value);
        }
      });
    });
    return values;
  }

   /* Yemekhane Suyu */

   async su_getAllYemekhanePHValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/yemekhaneSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          ph: data.ph,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }

  async su_getAllYemekhaneKlorValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/yemekhaneSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          klor: data.klor,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }

  async su_getAllYemekhaneIletkenlikValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/yemekhaneSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          iletkenlik: data.iletkenlik,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }

  /*  WC Suyu */

  async su_getAllWCPHValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/wcSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          ph: data.ph,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }

  async su_getAllWCKlorValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/wcSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          klor: data.klor,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }

  async su_getAllWCIletkenlikValues() {
    let su = [];
    await axios
      .get(`${URL}/api/controller/get/wcSuyu`)
      .then((result) => {
        su = result.data.map((data) => ({
          iletkenlik: data.iletkenlik,
          dateAndTime: data.createdAt
        }));
      });
    return su;
  }
  /* ARITMA  */
  /* RENK GİDERİCİ TÜKETİMİ   */
  async getAllRenkGidericiTuketimiYavasKaristirmaHavCikisiValues(){
    let yavasKaristirmaHavCikisiValues = [];
    await axios
      .get(`${URL}/api/controller/get/renkGidericiTuketimi`)
      .then((result) => {
        yavasKaristirmaHavCikisiValues = result.data.map((data) => ({
          yavasKaristirmaHavCikisi: data.yavasKaristirmaHavCikisi,
          dateAndTime: data.createdAt
      
          
        }));
      });
    return yavasKaristirmaHavCikisiValues;
  }
  async getAllRenkGidericiTuketimiKimyasalCokHavCikisiRenkValues(){
    let kimyasalCokHavCikisiRenkValues = [];
    await axios
      .get(`${URL}/api/controller/get/renkGidericiTuketimi`)
      .then((result) => {
        kimyasalCokHavCikisiRenkValues = result.data.map((data) => ({
          kimyasalCokHavCikisiRenk: data.kimyasalCokHavCikisiRenk,
          dateAndTime: data.createdAt
      
          
        }));
      });
    return kimyasalCokHavCikisiRenkValues;
  }
  
  async getAllCamurKekiNemValues(){
    let camurKekiNemValues = [];
    await axios
      .get(`${URL}/api/controller/get/filtrepres`)
      .then((result) => {
        camurKekiNemValues = result.data.map((data) => ({
          camurKekiNem:data.camurKekiNem,
          dateAndTime: data.createdAt
        }));
      });
    return camurKekiNemValues;
  }

}

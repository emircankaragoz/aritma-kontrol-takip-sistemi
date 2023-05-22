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
        phValues = result.data.map((data) => data.ph);
      });
    return phValues;
  }

  async getAllTuzTesisiYogunlukValues() {
    let yogunlukValues = [];
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        yogunlukValues = result.data.map((data) => data.yogunluk);
      });
    return yogunlukValues;
  }

  async getAllTuzTesisiBikarbonatValues() {
    let bikarbonatValues = [];
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        bikarbonatValues = result.data.map((data) => data.bikarbonat);
      });
    return bikarbonatValues;
  }

  /* SODA TESİSİ */
  async getAllSodaTesisiCYogunluguValues() {
    let cYogunlukValues = [];
    await axios
      .get(`${URL}/api/controller/get/sodaTesisiKontrolFormu`)
      .then((result) => {
        cYogunlukValues = result.data.map((data) => data.cozeltiYogunlugu);
      });
    return cYogunlukValues;
  }

  /* SODYUM KLORUR KONTROL */

  async getAllSodyumKlorurSertlikValues() {
    let sertlik = [];
    await axios
      .get(`${URL}/api/controller/get/sodyumKlorurKontrol`)
      .then((result) => {
        sertlik = result.data.map((data) => data.sertlik);
      });
    return sertlik;
  }

  async getAllSodyumKlorurDemirValues() {
    let demir = [];
    await axios
      .get(`${URL}/api/controller/get/sodyumKlorurKontrol`)
      .then((result) => {
        demir = result.data.map((data) => data.demir);
      });
    return demir;
  }
}

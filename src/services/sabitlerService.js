import axios from "axios";
import { URL } from "../../environment";

export default class SabitlerService {
  /* TUZ */
  async tuz_getAllTuzTesisiKontrolSabitler() {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/sbt_TuzTesisiKontrolCizelgesi`)
      .then((result) => {
        let lastItem = result.data.pop();
        tuz = lastItem;
      });
    return tuz;
  }

  async tuz_getAllSodaTesisiKontrolSabitler() {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/sbt_SodaTesisiKontrolCizelgesi`)
      .then((result) => {
        let lastItem = result.data.pop();
        tuz = lastItem;
      });
    return tuz;
  }

  async tuz_getAllSodyumKlorurKontrolSabitler() {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/sbt_SodyumKlorurKontrolCizelgesi`)
      .then((result) => {
        let lastItem = result.data.pop();
        tuz = lastItem;
      });
    return tuz;
  }

  /*  SU  */
  /*  SU - YUMUŞAK SU  */
  async su_getAllIsletmeSuyu() {
    let su;
    await axios
      .get(`${URL}/api/controller/get/sbt_IsletmeSuyu`)
      .then((result) => {
        su = result.data;
      });
    return su;
  }
}

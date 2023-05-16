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
        tuz = lastItem
      });
    return tuz;
  }
}

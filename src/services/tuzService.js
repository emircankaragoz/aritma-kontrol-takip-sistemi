import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class TuzService {
  // GET ALL TUZ DATAS
  async getAllTuzSodaSayacToplama() {
    return await axios.get(`${URL}/api/controller/get/tuzSodaSayacToplama`);
  }

  async getTuzSodaSayacToplamaById(id) {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/tuzSodaSayacToplama`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            tuz = data;
          }
        });
      });
    return tuz;
  }

  async getTuzSodaSayacToplamaById(id) {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/tuzSodaSayacToplama`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            tuz = data;
          }
        });
      });
    return tuz;
  }

  async getTransferDataToGunlukKullanimFromTuzSodaSayacToplama(datetime) {
    let siviTuzSayac1, siviTuzSayac2, siviTuzLt;
    let tuzVeSodaSayac1, tuzVeSodaSayac2, suSayac;
    let isletmeyeVerilenSiviTuzSayac1,
      isletmeyeVerilenSiviTuzSayac2,
      isletmeyeVerilenSiviTuzLt;
    let hazirlananSiviSodaSayac1,
      hazirlananSiviSodaSayac2,
      hazirlananSiviSodaLt;
    let siviSodaHattiYikamaSuyuSayac1,
      siviSodaHattiYikamaSuyuSayac2,
      siviSodaHattiYikamaSuyuLt;
    let isletmeyeVerilenSiviSodaLt;
    let siviSodaLt;
    let aritmaTesisineAtilanAtikSiviTuzLt;
    let isletmeyeVerilenSiviTuzHazirlananTankSayisi;
    let katiSodaKg;
    let uretilenSu;

    const response = await axios.get(
      `${URL}/api/controller/get/tuzSodaSayacToplama`
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
      siviTuzSayac1 = prevData.tasviyedeKullanilanSiviTuzSayac;
      siviTuzSayac2 = data.tasviyedeKullanilanSiviTuzSayac;
      siviTuzLt = siviTuzSayac2 - siviTuzSayac1;

      tuzVeSodaSayac1 = prevData.tuzVeSodaTesisiKullanilanSuSayac;
      tuzVeSodaSayac2 = data.tuzVeSodaTesisiKullanilanSuSayac;
      suSayac = tuzVeSodaSayac2 - tuzVeSodaSayac1;

      isletmeyeVerilenSiviTuzSayac1 = prevData.isletmeyeVerilenSiviTuzSayac;
      isletmeyeVerilenSiviTuzSayac2 = data.isletmeyeVerilenSiviTuzSayac;
      isletmeyeVerilenSiviTuzLt =
        isletmeyeVerilenSiviTuzSayac2 - isletmeyeVerilenSiviTuzSayac1;

      hazirlananSiviSodaSayac1 = prevData.hazirlananSiviSodaSayac;
      hazirlananSiviSodaSayac2 = data.hazirlananSiviSodaSayac;
      hazirlananSiviSodaLt =
        hazirlananSiviSodaSayac2 - hazirlananSiviSodaSayac1;

      siviSodaHattiYikamaSuyuSayac1 = prevData.siviSodaHattiYikamaSuyuSayac;
      siviSodaHattiYikamaSuyuSayac2 = data.siviSodaHattiYikamaSuyuSayac;
      siviSodaHattiYikamaSuyuLt =
        (siviSodaHattiYikamaSuyuSayac2 - siviSodaHattiYikamaSuyuSayac1) * 1000;

      isletmeyeVerilenSiviSodaLt =
        hazirlananSiviSodaLt - siviSodaHattiYikamaSuyuLt;

      siviSodaLt = (isletmeyeVerilenSiviSodaLt / 200) * 1000;

      aritmaTesisineAtilanAtikSiviTuzLt =
        prevData.aritmaTesisineAtilanAtikSiviTuzuLt;

      isletmeyeVerilenSiviTuzHazirlananTankSayisi =
        prevData.isletmeyeVerilenSiviTuzHazirlananTankSayisi;

      katiSodaKg = prevData.katiSodaKg;
      uretilenSu = prevData.uretilenSu;

      const dateAndTime = prevDatetime;
      return {
        siviTuzLt,
        suSayac,
        isletmeyeVerilenSiviTuzLt,
        isletmeyeVerilenSiviSodaLt,
        siviSodaLt,
        dateAndTime,
        aritmaTesisineAtilanAtikSiviTuzLt,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        katiSodaKg,
        uretilenSu,
      };
    } else {
      siviTuzLt = 0;
      suSayac = 0;
      isletmeyeVerilenSiviTuzLt = 0;
      isletmeyeVerilenSiviSodaLt = 0;
      siviSodaLt = 0;
      aritmaTesisineAtilanAtikSiviTuzLt =
        data.aritmaTesisineAtilanAtikSiviTuzLt;
      isletmeyeVerilenSiviTuzHazirlananTankSayisi =
        data.isletmeyeVerilenSiviTuzHazirlananTankSayisi;
      katiSodaKg = data.katiSodaKg;
      uretilenSu = data.uretilenSu;
      const dateAndTime = datetime;
      return {
        siviTuzLt,
        suSayac,
        isletmeyeVerilenSiviTuzLt,
        hazirlananSiviSodaLt,
        isletmeyeVerilenSiviSodaLt,
        siviSodaLt,
        dateAndTime,
        aritmaTesisineAtilanAtikSiviTuzLt,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        katiSodaKg,
        uretilenSu,
      };
    }
  }
}

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

    console.log(data)

    // Find data for the previous day
    const prevDatetime = moment(datetime)
      .subtract(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    const prevData = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == prevDatetime
    );

    if (data && prevData) {
      siviTuzSayac1 = parseFloat(prevData.tasviyedeKullanilanSiviTuzSayac);
      siviTuzSayac2 = parseFloat(data.tasviyedeKullanilanSiviTuzSayac);
      siviTuzLt = siviTuzSayac2 - siviTuzSayac1;

      tuzVeSodaSayac1 = parseFloat(prevData.tuzVeSodaTesisiKullanilanSuSayac);
      tuzVeSodaSayac2 = parseFloat(data.tuzVeSodaTesisiKullanilanSuSayac);
      suSayac = tuzVeSodaSayac2 - tuzVeSodaSayac1;

      isletmeyeVerilenSiviTuzSayac1 = parseFloat(prevData.isletmeyeVerilenSiviTuzSayac);
      isletmeyeVerilenSiviTuzSayac2 = parseFloat(data.isletmeyeVerilenSiviTuzSayac);
      isletmeyeVerilenSiviTuzLt =
        isletmeyeVerilenSiviTuzSayac2 - isletmeyeVerilenSiviTuzSayac1;

      hazirlananSiviSodaSayac1 = parseFloat(prevData.hazirlananSiviSodaSayac);
      hazirlananSiviSodaSayac2 = parseFloat(data.hazirlananSiviSodaSayac);
      hazirlananSiviSodaLt =
        (hazirlananSiviSodaSayac2- hazirlananSiviSodaSayac1)*1000;


      siviSodaHattiYikamaSuyuSayac1 = parseFloat(prevData.siviSodaHattiYikamaSuyuSayac);
      siviSodaHattiYikamaSuyuSayac2 = parseFloat(data.siviSodaHattiYikamaSuyuSayac);
      siviSodaHattiYikamaSuyuLt =
        (siviSodaHattiYikamaSuyuSayac2 - siviSodaHattiYikamaSuyuSayac1) * 1000;


      isletmeyeVerilenSiviSodaLt =
        hazirlananSiviSodaLt - siviSodaHattiYikamaSuyuLt;


      siviSodaLt = (isletmeyeVerilenSiviSodaLt / 200) * 1000;

      aritmaTesisineAtilanAtikSiviTuzLt =
        parseFloat(prevData.aritmaTesisineAtilanAtikSiviTuzuLt);

      isletmeyeVerilenSiviTuzHazirlananTankSayisi =
        parseFloat(prevData.isletmeyeVerilenSiviTuzHazirlananTankSayisi);

      katiSodaKg = parseFloat(prevData.katiSodaKg);
      uretilenSu = parseFloat(prevData.uretilenSu);

      const dateAndTime = prevDatetime;
      return {
        siviTuzLt,
        suSayac,
        isletmeyeVerilenSiviTuzLt,
        isletmeyeVerilenSiviSodaLt,
        dateAndTime,
        aritmaTesisineAtilanAtikSiviTuzLt,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        katiSodaKg,
        uretilenSu,
      };
    } else {
      console.log(data)
      siviTuzLt = 0;
      suSayac = 0;
      isletmeyeVerilenSiviTuzLt = 0;
      isletmeyeVerilenSiviSodaLt = 0;
      siviSodaLt = 0;
      aritmaTesisineAtilanAtikSiviTuzLt =
        parseFloat(data.aritmaTesisineAtilanAtikSiviTuzuLt);
      isletmeyeVerilenSiviTuzHazirlananTankSayisi =
        parseFloat(data.isletmeyeVerilenSiviTuzHazirlananTankSayisi);
      katiSodaKg = parseFloat(data.katiSodaKg);
      uretilenSu = parseFloat(data.uretilenSu);
      const dateAndTime = datetime;
      return {
        siviTuzLt,
        suSayac,
        isletmeyeVerilenSiviTuzLt,
        isletmeyeVerilenSiviSodaLt,
        dateAndTime,
        aritmaTesisineAtilanAtikSiviTuzLt,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        katiSodaKg,
        uretilenSu,
      };
    }
  }
}

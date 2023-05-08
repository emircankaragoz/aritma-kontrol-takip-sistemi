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

  async getAllTuzGunlukTuketimMiktari() {
    return await axios.get(`${URL}/api/controller/get/tuzGunlukTuketimMiktari`);
  }

  async getTuzGunlukTuketimMiktariById(id) {
    let tuz;
    await axios
      .get(`${URL}/api/controller/get/tuzGunlukTuketimMiktari`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            tuz = data;
          }
        });
      });
    return tuz;
  }

  //TUZ TESİSİ KONTROL CİZELGESİ
  async getAllTuzTesisiKontrolCizelgesi() {
    return await axios.get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`);
  }

  async getTuzTesisiKontrolCizelgesiById(id) {
    let tuzTesisi;
    await axios
      .get(`${URL}/api/controller/get/tuzTesisiKontrolCizelge`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            tuzTesisi = data;
          }
        });
      });
    return tuzTesisi;
  }

  //SODA TESİSİ KONTROL CİZELGESİ

  async getAllSodaTesisiKontrolFormu() {
    return await axios.get(`${URL}/api/controller/get/sodaTesisiKontrolFormu`);
  }
  async getSodaTesisiKontrolFormuById(id) {
    let sodaTesisi;
    await axios
      .get(`${URL}/api/controller/get/sodaTesisiKontrolFormu`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            sodaTesisi = data;
          }
        });
      });
    return sodaTesisi;
  }

  //SODYUM KLORUR KONTROL
  async getAllSodyumKlorurKontrolFormu() {
    return await axios.get(`${URL}/api/controller/get/sodyumKlorurKontrol`);
  }
  async getSodyumKlorurById(id) {
    let sodyum;
    await axios
      .get(`${URL}/api/controller/get/sodyumKlorurKontrol`)
      .then((result) => {
        result.data.map((data) => {
          if (data.id === id) {
            sodyum = data;
          }
        });
      });
    return sodyum;
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
      siviTuzSayac1 = parseFloat(prevData.tasviyedeKullanilanSiviTuzSayac);
      siviTuzSayac2 = parseFloat(data.tasviyedeKullanilanSiviTuzSayac);
      siviTuzLt = siviTuzSayac2 - siviTuzSayac1;

      tuzVeSodaSayac1 = parseFloat(prevData.tuzVeSodaTesisiKullanilanSuSayac);
      tuzVeSodaSayac2 = parseFloat(data.tuzVeSodaTesisiKullanilanSuSayac);
      suSayac = tuzVeSodaSayac2 - tuzVeSodaSayac1;

      isletmeyeVerilenSiviTuzSayac1 = parseFloat(
        prevData.isletmeyeVerilenSiviTuzSayac
      );
      isletmeyeVerilenSiviTuzSayac2 = parseFloat(
        data.isletmeyeVerilenSiviTuzSayac
      );
      isletmeyeVerilenSiviTuzLt =
        (isletmeyeVerilenSiviTuzSayac2 - isletmeyeVerilenSiviTuzSayac1) * 1000;

      hazirlananSiviSodaSayac1 = parseFloat(prevData.hazirlananSiviSodaSayac);
      hazirlananSiviSodaSayac2 = parseFloat(data.hazirlananSiviSodaSayac);
      hazirlananSiviSodaLt =
        (hazirlananSiviSodaSayac2 - hazirlananSiviSodaSayac1) * 1000;

      siviSodaHattiYikamaSuyuSayac1 = parseFloat(
        prevData.siviSodaHattiYikamaSuyuSayac
      );
      siviSodaHattiYikamaSuyuSayac2 = parseFloat(
        data.siviSodaHattiYikamaSuyuSayac
      );
      siviSodaHattiYikamaSuyuLt =
        (siviSodaHattiYikamaSuyuSayac2 - siviSodaHattiYikamaSuyuSayac1) * 1000;

      isletmeyeVerilenSiviSodaLt =
        hazirlananSiviSodaLt - siviSodaHattiYikamaSuyuLt;

      siviSodaLt = (isletmeyeVerilenSiviSodaLt / 200) * 1000;

      aritmaTesisineAtilanAtikSiviTuzLt = parseFloat(
        prevData.aritmaTesisineAtilanAtikSiviTuzuLt
      );

      isletmeyeVerilenSiviTuzHazirlananTankSayisi = parseFloat(
        prevData.isletmeyeVerilenSiviTuzHazirlananTankSayisi
      );

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
      siviTuzLt = 0;
      suSayac = 0;
      isletmeyeVerilenSiviTuzLt = 0;
      isletmeyeVerilenSiviSodaLt = 0;
      siviSodaLt = 0;
      aritmaTesisineAtilanAtikSiviTuzLt = parseFloat(
        data.aritmaTesisineAtilanAtikSiviTuzuLt
      );
      isletmeyeVerilenSiviTuzHazirlananTankSayisi = parseFloat(
        data.isletmeyeVerilenSiviTuzHazirlananTankSayisi
      );
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

  async getTuzSodaAylikTuketimMiktari(year) {
    const dataByMonth = {};
    const subtract = moment().year() - moment(year).year();
    const startOf = moment()
      .subtract(subtract, "year")
      .startOf("year")
      .format();
    const endOf = moment().subtract(subtract, "year").endOf("year").format();
    await axios
      .get(`${URL}/api/controller/get/tuzGunlukTuketimMiktari`)
      .then((result) =>
        result.data.forEach((data) => {
          if (data.dateAndTime >= startOf && data.dateAndTime <= endOf) {
            const month = moment(data.dateAndTime).format("MMM");
            const keys = Object.keys(data).filter(
              (key) =>
                key !== "id" &&
                key !== "dateAndTime" &&
                key !== "updatedAt" &&
                key !== "createdAt" &&
                key !== "category"
            );
            if (!dataByMonth[month]) {
              dataByMonth[month] = {};
            }
            keys.forEach((key) => {
              if (data[key]) {
                if (dataByMonth[month][key]) {
                  dataByMonth[month][key] += parseFloat(data[key]);
                } else {
                  dataByMonth[month][key] = parseFloat(data[key]);
                }
              }
            });
          }
        })
      );
    const result = [];
    for (const month in dataByMonth) {
      result.push({ month, ...dataByMonth[month] });
    }

    return result;
  }

  async getTuzSodaTuketimMiktariYillari() {
    const years = [];
    await axios
      .get(`${URL}/api/controller/get/tuzGunlukTuketimMiktari`)
      .then((result) => {
        result.data.map((data) => {
          if (!years.includes(moment(data.dateAndTime).year()))
            years.push(moment(data.dateAndTime).year());
        });
      });
    return years;
  }

  async getTuzSodaTuketimMiktariYillikToplam(year) {
    const dataByYear = {};
    const subtract = moment().year() - moment(year).year();
    const startOf = moment()
      .subtract(subtract, "year")
      .startOf("year")
      .format();
    const endOf = moment().subtract(subtract, "year").endOf("year").format();
    await axios
      .get(`${URL}/api/controller/get/tuzGunlukTuketimMiktari`)
      .then((result) =>
        result.data.forEach((data) => {
          if (data.dateAndTime >= startOf && data.dateAndTime <= endOf) {
            const keys = Object.keys(data).filter(
              (key) =>
                key !== "id" &&
                key !== "dateAndTime" &&
                key !== "updatedAt" &&
                key !== "createdAt" &&
                key !== "category"
            );
            /* if (!dataByMonth[month]) {
              dataByMonth[month] = {};
            } */
            keys.forEach((key) => {
              if (data[key]) {
                if (dataByYear[key]) {
                  dataByYear[key] += parseFloat(data[key]);
                } else {
                  dataByYear[key] = parseFloat(data[key]);
                }
              }
            });
          }
        })
      );
    return dataByYear;
  }
}

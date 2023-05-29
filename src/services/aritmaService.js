import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class AritmaService {

  //atiksu aritma giris cikis
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

  async getCalculationAtiksuAritmaGirisCikis(datetime) {
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

      farkCekilenCamurMiktari = girisAtiksuMiktariM3Gun - cikisAtiksuMiktariM3Gun;
      kimyasalCokeltimdenCekilenCamurMiktari = parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun);
      aerobiktenCekilenCamurMiktari = farkCekilenCamurMiktari - kimyasalCokeltimdenCekilenCamurMiktari;
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
      farkCekilenCamurMiktari = parseFloat(data.girisAtiksuSayacDegeri) - parseFloat(data.cikisAtiksuSayacDegeri);
      kimyasalCokeltimdenCekilenCamurMiktari = parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun);
      aerobiktenCekilenCamurMiktari = farkCekilenCamurMiktari - kimyasalCokeltimdenCekilenCamurMiktari;
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
  //FİLTREPRES KİMYASAL CAMUR HESAPLAMALARI 

  async getAllFiltrepresKimyasalCamur() {
    return await axios.get(`${URL}/api/controller/get/filtrepresKimyasalCamur`);
  }

  async getFiltrepresKimyasalCamurById(id) {
    let kimyasalCamur;
    await axios.get(`${URL}/api/controller/get/filtrepresKimyasalCamur`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          kimyasalCamur = data;
        }
      });
    });

    return kimyasalCamur;
  }

  //CAMUR YOGUNLASTİRMA
  async getTransferDataToCamurYogunlastirmaFromAtiksuAritmaGirisCikis(datetime) {

    let kimyasalCokeltimdenCekilenCamurMiktari_m3gun;
    let aerobiktenCekilenCamurMiktari;

    const response = await axios.get(
      `${URL}/api/controller/get/atiksuAritmaGirisCikis`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    if (data) {
      kimyasalCokeltimdenCekilenCamurMiktari_m3gun = data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun
      aerobiktenCekilenCamurMiktari = data.aerobiktenCekilenCamurMiktari

    }
    return {
      kimyasalCokeltimdenCekilenCamurMiktari_m3gun,
      aerobiktenCekilenCamurMiktari,


    };
  }
  async getAllCamurMiktari() {
    return await axios.get(`${URL}/api/controller/get/camurYogunlastirma`);
  }

  //Renk GİDERİCİ KİMYASAL GİRDİ KONTROLU

  async getAllRenkGidericiKimyasalGirdiKontrolu() {
    return await axios.get(`${URL}/api/controller/get/renkGidericiKimyasalGirdiKontrol`);
  }

  async getRenkGidericiKimyasalGirdiKontroluById(id) {
    let Data;
    await axios.get(`${URL}/api/controller/get/renkGidericiKimyasalGirdiKontrol`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          Data = data;
        }
      });
    });

    return Data;
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
  //ANALİZ FORMLARI SERVİCE

  //AMONYUM AZOT
  //DENGELEME
  async getAllAmonyumAzotuAnalizDengelemeVerileri() {
    return await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizDengeleme`);
  }
  async getAmonyumAzotuAnalizDengelemeById(id) {
    let amonyumAzot;
    await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizDengeleme`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          amonyumAzot = data;
        }
      });
    });
    return amonyumAzot;
  }

  //GÜNLÜK ATIKSU SAYACINDAN DENGELEME HAVUZUNA VERİ AKTARIMI
  async getValuesGunlukAtıksuSayacıToDengelemeHavuzu(datetime) {
    let debi;
    const response = await axios.get(
      `${URL}/api/controller/get/atiksuAritmaGirisCikis`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    if (data) {
      debi = data.girisAtiksuMiktariM3Gun;
    }
    else {
      debi = 0;
    }
    return {
      debi
    };


  }

  //AMONYUM AZOT ANALİZ DENGELEMEDEN --> DENGELEME HAVUZUNA VERİ AKTARIMI
  async getValuesAmonyumAzotToDengelemeHavuzu(datetime) {
    let amonyumAzot;
    const response = await axios.get(
      `${URL}/api/controller/get/amonyumAzotuAnalizDengeleme`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    if (data) {
      amonyumAzot = data.seyreltme;
    }
    else {
      amonyumAzot = 0;
    }
    return {
      amonyumAzot,

    };
  }
  //AMONYUM AZOT ANALİZ DENGELEME VE GÜNLÜK ATIKSU SAYACINDAN --> DENGELEME HAVUZUNA

  async getValuesAmonyumAzotAndGunlukAtıksuSayacıToDengelemeHavuzu(datetime) {

    let amonyumAzot;
    let debi;

    const response = await axios.get(
      `${URL}/api/controller/get/amonyumAzotuAnalizDengeleme`
    );
    const response2 = await axios.get(
      `${URL}/api/controller/get/atiksuAritmaGirisCikis`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    const data2 = response2.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    

    if (data && data2) {
      amonyumAzot = data.seyreltme;
      debi = data2.girisAtiksuMiktariM3Gun;

    }
    else if(data){
      amonyumAzot = data.seyreltme;
      debi = 0;
    }
    else if (data2){
      debi = data2.girisAtiksuMiktariM3Gun;
      amonyumAzot = 0;
    }
    else {
      amonyumAzot = 0;
      debi = 0;
    }
    return {
      amonyumAzot,
      debi
    };
  }

  //CİKİS
  async getAllAmonyumAzotuAnalizCikisVerileri() {
    return await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizCikis`);
  }
  async getAmonyumAzotuAnalizCikisById(id) {
    let Data;
    await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizCikis`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          Data = data;
        }
      });
    });

    return Data;
  }
  //BİYOLOJİK
  async getAllAmonyumAzotuAnalizBiyolojikVerileri() {
    return await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizBiyolojik`);
  }
  async getAmonyumAzotuAnalizBiyolojikById(id) {
    let Data;
    await axios.get(`${URL}/api/controller/get/amonyumAzotuAnalizBiyolojik`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          Data = data;
        }
      });
    });

    return Data;
  }

  //DENGELEME HAVUZU FORMU
  async getAllDengelemeHavuzuVerileri() {
    return await axios.get(`${URL}/api/controller/get/dengelemeHavuzuVerileri`);
  }
  async getDengelemeHavuzuById(id) {
    let dengelemeHavuzu;
    await axios.get(`${URL}/api/controller/get/dengelemeHavuzuVerileri`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          dengelemeHavuzu = data;
        }
      });
    });

    return dengelemeHavuzu;
  }

  //ISI GERİ KAZANIM PH AND AMPER
  async getAllIsiGeriKazanimVerileri() {
    return await axios.get(`${URL}/api/controller/get/isiGeriKazanim`);
  }
  async getIsiGeriKazanimById(id) {
    let isiGeriKazanim;
    await axios.get(`${URL}/api/controller/get/isiGeriKazanim`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          isiGeriKazanim = data;
        }
      });
    });

    return isiGeriKazanim;
  }
  //SUM OF ISI GERİ KAZANIM VERİLERİ
  //kimyasal miktarı toplamı
  async sumOfKimyasalMiktarıIsıGeriKazanim() {
    const response = await axios.get(
      `${URL}/api/controller/get/isiGeriKazanim`
    );
    let totalKimyasalMiktari = 0; 
    response.data.forEach((item) => {
      totalKimyasalMiktari += parseFloat(item.kimyasalMiktari); // Her bir verinin kimyasalMiktarı değerini toplama 
    });

    return totalKimyasalMiktari;
  }
  //ANAEROBİK HAVUZU 
  async getAllAnaerobikHavuzuVerileri() {
    return await axios.get(`${URL}/api/controller/get/anaerobikHavuzu`);
  }
  async getAnaerobikHavuzuById(id) {
    let anaerobik;
    await axios.get(`${URL}/api/controller/get/anaerobikHavuzu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          anaerobik = data;
        }
      });
    });

    return anaerobik;
  }

  //GERİ DEVİR HAZNESİ
  async getAllGeriDevirHaznesiVerileri() {
    return await axios.get(`${URL}/api/controller/get/geriDevirHaznesi`);
  }
  async getGeriDevirHaznesiById(id) {
    let devirHazne;
    await axios.get(`${URL}/api/controller/get/geriDevirHaznesi`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          devirHazne = data;
        }
      });
    });


    return devirHazne;
  }
  //BİYOLOJİK COKELTİM HAVUZU
  async getAllBiyolojikCokeltimHavuzuVerileri() {
    return await axios.get(`${URL}/api/controller/get/biyolojikCokeltimHavuzu`);
  }
  async getBiyolojikCokeltimHavuzuById(id) {
    let biyolojikCokeltimHavuzu;
    await axios.get(`${URL}/api/controller/get/biyolojikCokeltimHavuzu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          biyolojikCokeltimHavuzu = data;
        }
      });
    });


    return biyolojikCokeltimHavuzu;
  }
  //FİLTREPRES
  async getAllFiltrepresVerileri() {
    return await axios.get(`${URL}/api/controller/get/filtrepres`);
  }
  async getFiltrepresById(id) {
    let filtrepres;
    await axios.get(`${URL}/api/controller/get/filtrepres`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          filtrepres = data;
        }
      });
    });


    return filtrepres;
  }

  //DEŞARJ
  async getAllDesarjVerileri() {
    return await axios.get(`${URL}/api/controller/get/desarj`);
  }
  async getDesarjById(id) {
    let desarj;
    await axios.get(`${URL}/api/controller/get/desarj`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          desarj = data;
        }
      });
    });


    return desarj;
  }
  //AMONYUM AZOT CİKİSDAN ve RENK GİDERİCİDEN DEŞARJA VERİ AKTARIMI
  async getValuesCikisAndRenkGidericiToDesarj(datetime) {

    let amonyumAzotu;
    let renk;
    let renkGidericiTuketimiTotal = 0;
    let renkGidericiTuketimiCount = 0;

    const response = await axios.get(
      `${URL}/api/controller/get/amonyumAzotuAnalizCikis`
    );
    const response2 = await axios.get(
      `${URL}/api/controller/get/renkGidericiTuketimi`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    const data2 = response2.data.map(item => parseFloat(item.kimyasalCokHavCikisiRenk));
    //Kimyasal  Çök Hav Çıkışı Renk Mak 280 Pt-co 
    if (data && data2) {
      amonyumAzotu = data.sonuc;
      renkGidericiTuketimiTotal = data2.reduce((total, item) => {
        const renkFloat = parseFloat(item);
        if (!isNaN(renkFloat)) {
          return total + renkFloat;
        } else {
          return total;
        }
      }, 0);
      renkGidericiTuketimiCount = data2.length;
      renk = renkGidericiTuketimiTotal / renkGidericiTuketimiCount;
    }
    else if(data){
      amonyumAzotu = data.sonuc;
      renk = 0;
    }
    else if (data2){
      amonyumAzotu = 0;
      renkGidericiTuketimiTotal = data2.reduce((total, item) => {
        const renkFloat = parseFloat(item);
        if (!isNaN(renkFloat)) {
          return total + renkFloat;
        } else {
          return total;
        }
      }, 0);
      renkGidericiTuketimiCount = data2.length;
      renk = renkGidericiTuketimiTotal / renkGidericiTuketimiCount;
    }
    else {
      amonyumAzotu = 0;
      renk = 0;
    }
    return {
      
      amonyumAzotu,
      renk
    };
  }
  async getValuesRenkGidericiTuketimiToDesarj() {
    let renk;
    let renkGidericiTuketimiTotal = 0;
    let renkGidericiTuketimiCount = 0;
    const response2 = await axios.get(
      `${URL}/api/controller/get/renkGidericiTuketimi`
    );
    const data2 = response2.data.map(item => parseFloat(item.kimyasalCokHavCikisiRenk));
    if (data2) {
      renkGidericiTuketimiTotal = data2.reduce((total, item) => {
        const renkFloat = parseFloat(item);
        if (!isNaN(renkFloat)) {
          return total + renkFloat;
        } else {
          return total;
        }
      }, 0);
      renkGidericiTuketimiCount = data2.length;
      renk = renkGidericiTuketimiTotal / renkGidericiTuketimiCount;
    }
    else {
      renk = 0;
    }
    return {
      renk
    };

  }
  async getValuesCikisToDesarj(datetime) {
    let amonyumAzotu;
    const response = await axios.get(
      `${URL}/api/controller/get/amonyumAzotuAnalizCikis`
    );
    const data = response.data.find(
      (item) => moment(item.dateAndTime).format("YYYY-MM-DD") == datetime
    );
    if (data) {
      amonyumAzotu = data.sonuc;
    }
    else {
      amonyumAzotu = 0;
    }
    return {
      amonyumAzotu
    };
  }
  //NOTRALİZASYON HAVUZU 

  async getAllNotrHavuzu() {
    return await axios.get(`${URL}/api/controller/get/notralizasyonHavuzu`);
  }
  //ortalama gönderme SATLİK VERİ EŞ,NÖT PH, OKSİJEN'!F28 'den NOTR HAVUZUNA
  async getTransferValuesSatlikVeriEsToNotrHavuzu() {
    let ph;
    let phTotal = 0;
    let phCount = 0;

    const response = await axios.get(
      `${URL}/api/controller/get/saatlikVeri`
    );
    const data = response.data.map(item => parseFloat(item.ph));
    //ph
    if (data.length > 0) {
      phTotal = data.reduce((total, item) => {
        const phFloat = parseFloat(item);
        if (!isNaN(phFloat)) {
          return total + phFloat;
        } else {
          return total;
        }
      }, 0);
      phCount = data.length;
      ph = phTotal / phCount;
    }
    else {
      ph = 0;
    }



    return {
      ph
    };
  }


  //AEROBİK HAVUZU 
  async getAllAerobikHavuzuVerileri() {
    return await axios.get(`${URL}/api/controller/get/aerobikHavuzu`);
  }
  async getAerobikHavuzuById(id) {
    let dataUpdate;
    await axios.get(`${URL}/api/controller/get/aerobikHavuzu`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          dataUpdate = data;
        }
      });
    });
    return dataUpdate;
  }
  //ortalama gönderme SATLİK VERİ EŞ,NÖT PH, OKSİJEN'!F28 'den AEROBİK HAVUZUNA
  async getTransferValuesSatlikVeriEsToAerobikHavuzu() {
    let oksijen;
    let oksijenTotal = 0;
    let oksijenCount = 0;

    const response = await axios.get(
      `${URL}/api/controller/get/saatlikVeri`
    );
    const data = response.data.map(item => parseFloat(item.oksijen));
    //ph
    if (data.length > 0) {
      oksijenTotal = data.reduce((total, item) => {
        const oksijenFloat = parseFloat(item);
        if (!isNaN(oksijenFloat)) {
          return total + oksijenFloat;
        } else {
          return total;
        }
      }, 0);
      oksijenCount = data.length;
      oksijen = oksijenTotal / oksijenCount;
    }
    else {
      oksijen = 0;
    }

    return {
      oksijen
    };
  }


  //AKM ANALİZİ FORMU
  async getAllAkmAnaliz() {
    return await axios.get(`${URL}/api/controller/get/akmAnalizi`);
  }
  async getAkmAnaliziById(id) {
    let dataUpdate;
    await axios.get(`${URL}/api/controller/get/akmAnalizi`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
          dataUpdate = data;
        }
      });
    });
    return dataUpdate;
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
  async getAllSulfirikAsitKullanim() {
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
  async getAllDemirUcKlorurKullanim() {
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
  async getAllRenkGidericiKullanim() {
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

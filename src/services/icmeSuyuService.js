import axios from "axios";
import { URL } from "../../environment";

export default class IcmeSuyuService {
  // GET ALL İCME SUYU DATA
  async getAllIcmeSuyu() {
    return await axios.get(`${URL}/api/controller/get/icmeSuyu`);
  }

}

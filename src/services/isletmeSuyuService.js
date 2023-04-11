import axios from "axios";
import { URL } from "../../environment";

export default class IsletmeSuyuService {
  // GET ALL İSLETME SUYU DATA
  async getAllIsletmeSuyu() {
    return await axios.get(`${URL}/api/controller/get/isletmeSuyu`);
  }

}

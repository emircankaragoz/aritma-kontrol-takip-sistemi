import axios from "axios";
import { URL } from "../../environment";

export default class UserService {
  // GET ALL TUZ DATAS
  async getAllTuzSodaSayacToplama() {
    return await axios.get(`${URL}/api/controller/get/tuzSodaSayacToplama`);
  }
}

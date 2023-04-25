import axios from "axios";
import { URL } from "../../environment";

export default class SystemMessageService {
  // GET ALL SYSTEM MESSAGES
  async getAllSystemMessages() {
    return await axios.get(`${URL}/api/controller/get/systemMessage`);
  }
}

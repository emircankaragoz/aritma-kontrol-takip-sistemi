import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class EmailService {
  // GET ALL SYSTEM MESSAGES
  async getAllEmailOutcomes() {
    return await axios.get(`${URL}/api/controller/get/emailOutcome`);
  }
}

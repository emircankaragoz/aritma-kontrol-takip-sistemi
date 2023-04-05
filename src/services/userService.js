import axios from "axios";
import { URL } from "../../environment";

export default class UserService {
  // GET ALL USER
  async getAllUser() {
    return await axios.get(`${URL}/api/controller/get/user`);
  }

  // GET SESSION USER
  async getSessionUser(employeeId) {
    let user;
    await axios.get(`${URL}/api/controller/get/user`).then((result) => {
      result.data.map((data) => {
        if (data.employeeId === employeeId) {
          user = data;
        }
      });
    });
    return user;
  }
}

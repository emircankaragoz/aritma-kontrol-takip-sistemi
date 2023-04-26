import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class SystemMessageService {
  // GET ALL SYSTEM MESSAGES
  async getAllSystemMessages() {
    return await axios.get(`${URL}/api/controller/get/systemMessage`);
  }

  async addSystemMessage(post, caption, code) {
    const response = await axios.get(`${URL}/api/controller/get/systemMessage`);

    const data = response.data.find(
      (item) =>
        item.messageCode === code
    );

    if (!data || data === undefined || data === null) {
      let values = {};
      const content = {
        content: `${post}`,
      };
      const title = {
        title: `${caption}`,
      };
      const messageCode = {
        messageCode: `${code}`,
      };
      values = Object.assign(values, content, title, messageCode);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("/api/controller/post/addSystemMessage", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log("System message created.");
          }
        });
    }
  }


  async deleteSystemMessage(code) {
    const response = await axios.get(`${URL}/api/controller/get/systemMessage`);

    const data = response.data.find(
      (item) =>
        item.messageCode === code
    );

    if (data) {
      let values = {};
      const messageCode = {
        messageCode: `${code}`,
      };

      values = Object.assign(values, messageCode);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      await fetch("/api/controller/post/deleteSystemMessage", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log("System message deleted.");
          }
        });
    }
  }
}

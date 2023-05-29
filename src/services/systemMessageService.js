import axios from "axios";
import { URL } from "../../environment";
import moment from "moment";

export default class SystemMessageService {
  // GET ALL SYSTEM MESSAGES
  async getAllSystemMessages() {
    return await axios.get(`${URL}/api/controller/get/systemMessage`);
  }

  async addSystemMessage(post, caption, code, date) {
    const response = await axios.get(`${URL}/api/controller/get/systemMessage`);

    const data = response.data.find(
      (item) =>
        item.messageCode === code &&
        date === moment(item.createdAt).format("YYYY-MM-DD")
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

  async deleteSystemMessage(code, date) {
    const response = await axios.get(`${URL}/api/controller/get/systemMessage`);

    const data = response.data.find(
      (item) =>
        item.messageCode === code &&
        moment(item.createdAt).format("YYYY-MM-DD") === date
    );

    if (data) {
      let values = {};
      const messageCode = {
        messageCode: `${code}`,
      };
      const dateTime = {
        dateTime: `${date}`,
      };

      values = Object.assign(values, messageCode, dateTime);
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

  async getAllSystemMessagesByCode(code) {
    let messages = []
    await axios
      .get(`${URL}/api/controller/get/systemMessage`)
      .then((result) => result.data.map(data => {
        if(data.messageCode === code){
          messages.push(data)
        }
      }));
      return messages
  }
}

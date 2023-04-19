import axios from "axios";
import { URL } from "../../environment";

export default class RenkGidericiTuketimiService {
  
  async getAllRenkGidericiTuketimi() {
    return await axios.get(`${URL}/api/controller/get/renkGidericiTuketimi`);
  }
  
   async getRenkGidericiTuketimiById(id) {
    let renkGidericiTuketimi;
    await axios.get(`${URL}/api/controller/get/renkGidericiTuketimi`).then((result) => {
      result.data.map((data) => {
        if (data.id === id) {
            renkGidericiTuketimi = data ;
        }
      });     
    });
    
    return renkGidericiTuketimi;
  }

}

import Axios from "axios";


export default {
  getUsers: function () {
    return Axios.get("https://randomuser.me/api/?results=10&nat=us");
  },
};
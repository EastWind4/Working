import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const GetEvent = async (email) => {
  try {
    const response = await axios.get(apiurl + "/events/get/");
    if (response.status === 200) {
      console.log(response.data);
      return response.data.events;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export default GetEvent;

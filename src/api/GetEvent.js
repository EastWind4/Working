import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const GetEvent = async () => {
  try {
    const response = await axios.get(apiurl + "/events/get/");
    if (response.status === 200) {
      return response.data.events;
    } else {
      return {
        message: response.data.message,
        success: false,
      };
    }
  } catch (err) {
    return {
      message: err.response.data.message,
      success: false,
    };
  }
};
export default GetEvent;

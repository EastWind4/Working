import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const ApplyEvent = async (eventId, email, creatorEmail, name, title) => {
  try {
    const response = await axios.post(apiurl + "/events/apply/", {
      eventId: eventId,
      email: email,
      creatorEmail: creatorEmail,
      name: name,
      title: title,
    });
    if (response.status === 200) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};
export default ApplyEvent;

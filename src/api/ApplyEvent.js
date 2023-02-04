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
    console.log(eventId, email, creatorEmail, name, title);
    console.log(response.data);
    if (response.status === 200) {
      console.log(response.data.message);
      return { success: true, message: response.data.message };
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
export default ApplyEvent;

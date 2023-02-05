import axios from "axios";
const apiurl = process.env.REACT_APP_API_URL;
const CreateEvent = async (
  creatorEmail,
  title,
  description,
  date,
  location,
  img
) => {
  const formData = new FormData();
  formData.append("creatorEmail", creatorEmail);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("date", date);
  formData.append("location", location);
  formData.append("img", img);
  try {
    const response = await axios.post(apiurl + "/events/create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
export default CreateEvent;

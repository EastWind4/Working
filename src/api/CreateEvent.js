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
export default CreateEvent;

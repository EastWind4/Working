import React, { useState } from "react";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useAlert } from "../context/AlertProvider";
import CreateEvent from "../api/CreateEvent";
function Form() {
  const { showAlert } = useAlert();
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!img) {
      showAlert("error", "Please select an image");
      return;
    } else {
      const response = await CreateEvent(
        creatorEmail,
        title,
        description,
        date,
        location,
        img
      );
      setLoading(false);
      if (response.success) {
        showAlert("success", response.message);
      } else {
        showAlert("error", response.message);
      }
    }
  };
  
  return (
    <Grid sx={{ marginTop: "50px" }}>
      <Card
        style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
        color="inherit"
      >
        <CardContent>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  placeholder="Enter title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  id="datetime-local"
                  label="Event Date and Time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  required
                  type={"text"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  placeholder="Enter creators email address"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={creatorEmail}
                  onChange={(e) => setCreatorEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Type your message here"
                  variant="outlined"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="file">
                  <input
                    hidden
                    accept="image/*"
                    id="file"
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <IconButton
                    color="inherit"
                    aria-label="upload picture"
                    component="span"
                    sx={{ marginLeft: "-5px", marginRight: "5px" }}
                  >
                    <PhotoCamera color="inherit" />
                  </IconButton>
                </label>
                <Button
                  variant="contained"
                  component="label"
                  color="inherit"
                  sx={{ width: "85%" }}
                >
                  <input
                    hidden
                    accept="image/*"
                    id="file"
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <span style={{ color: "black" }}>Upload</span>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleForm}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Form;

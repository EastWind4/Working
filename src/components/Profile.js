import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import coin from "../images/coin.png";
import CardRequest from "./CardRequest";
import Dashboard from './Dashboard';

import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const adjWidth = {
    width: "800px",
    "@media (max-width:600px)": {
      width: "80%",
    },
  };
  const hours = localStorage.getItem("hours");
  const profilePic = localStorage.getItem("profilePic");
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={10}
      padding={5}
      item={true}
      md={12}
    >
      <Grid item>
        <Card elevation={3} sx={adjWidth}>
          <CardHeader
            avatar={
              <Avatar
                // src={localStorage.getItem("url")}
                src={profilePic}
                alt="profile picture"
                imgProps={
                  {
                    // src: localStorage.getItem("url"),
                    // src: "https://res.cloudinary.com/dqpspujbg/image/upload/v1675519017/test/uploads/yashb%40gmail.com.jpg",
                    // alt: "profile picture",
                  }
                }
                variant="square"
                sx={{ width: "90px", height: "100px" }}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: "h4" }}
            title="Sakshi Pandey"
            subheaderTypographyProps={{ variant: "h6" }}
            subheader="Volunteer"
          />
          <CardMedia
            component="img"
            height="194"
            image={
              "https://t3.ftcdn.net/jpg/03/38/48/62/360_F_338486227_qQitUvh3nILqYiuQOUGxdfindoNMbtpH.jpg"
            }
            alt="background image"
          />
        </Card>
      </Grid>
      <Grid item>
        <Card elevation={3} sx={{ width: "300px", height: "200px" }}>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="Number of Hours"
            subheaderTypographyProps={{ variant: "h3" }}
            subheader={hours}
            avatar={<Avatar src={coin} sx={{ marginBottom: "-30px" }}></Avatar>}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "35%", marginTop: "15px" }}
            disabled={hours % 5 === 0 && hours !== "0" ? false : true}
            onClick={() => {
              navigate("/claim");
            }}
          >
            Claim
          </Button>
        </Card>
      </Grid>
      <Grid item>
        <Typography>Status</Typography>
        <br />
        <CardRequest
          eventTitle={"Teaching assistant"}
          isRejected={false}
          creatorEmail={"yashbrahmbhatt"}
        />
      </Grid>
      <br />
      <Dashboard />
    </Grid>
  );
}

export default Profile;

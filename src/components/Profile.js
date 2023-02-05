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
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();
  const adjWidth = {
    width: "800px",
    "@media (max-width:600px)": {
      width: "80%",
    },
  };
  const[creator,setCreator] = React.useState([])
  const[userEvent, setUserEvent] = React.useState([])
  const getCreatorEvents = async () => {
    const email = localStorage.getItem("email")
    const response = await axios.post(process.env.REACT_APP_API_URL+"/events/getbyemail/",{email})
    setCreator(response.data.events);
    console.log(response)
    console.log(creator)
  }
  const userEvents = async () => {
    const email = localStorage.getItem("email")
    const response = await axios.post(process.env.REACT_APP_API_URL+"events/my/",{email})
    setUserEvent(response.data.events);

  }
  const username = localStorage.getItem("name");
  const type = localStorage.getItem("type")
  const hours = localStorage.getItem("hours");
  const profilePic = localStorage.getItem("profilePic");
  React.useEffect(()=>{
    let type = localStorage.getItem("type")
    if(type==="VOLUNTEER") userEvents();
    else getCreatorEvents();
  }, [])
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
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, type: "tween" }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
    >
      <Grid item>
        <Card
          elevation={3}
          sx={adjWidth}
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          <CardHeader
            avatar={
              <Avatar
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
            title={username}
            subheaderTypographyProps={{ variant: "h6" }}
            subheader={type}
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
        {type==="VOLUNTEER"&&<Card elevation={3} sx={{ width: "300px", height: "200px" }}>
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
        </Card>}

      {type==="INSTITUTION" && <Card elevation={3} sx={{ width: "400px", height: "200px" }}>
          <CardHeader
            titleTypographyProps={{ variant: "h5" }}
            title="NUMBER OF EVENTS CREATED"
            subheaderTypographyProps={{ variant: "h3", textAlign:"center", marginTop:"20px" }}
            subheader={creator.length}
          />
        </Card>}
            
      </Grid>
      <Grid item>
        {type==="INSTITUTION"&&<><Typography>PREVIOUSLY CREATED EVENTS</Typography><br />
<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  spacing={3}
  padding={1}
>
{creator.map((cr)=>{
  return(
<Grid item key={cr._id}> 
<CardRequest
          eventTitle={cr.description}
          date={cr.date}
          creatorEmail={cr.title}
          totalParticipants={cr.registeredVolunteers.length}
        />
  </Grid>)
        })}</Grid></>}


{type==="VOLUNTEER"&&<><Typography>Applied Events:</Typography><br />
<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  spacing={3}
  padding={3}
>
{userEvent.map((cr)=>{
  return(
<Grid item key={cr._id}>
<CardRequest
          eventTitle={cr.description}
          date={cr.date}
          creatorEmail={cr.title}
          totalParticipants={cr.registeredVolunteers.length}
        />
  </Grid>)
        })}</Grid></>}

      </Grid>
      <br />
      <Dashboard />
    </Grid>
  );
}

export default Profile;

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import FolderIcon from "@mui/icons-material/Folder";
import ApplyEvent from "../api/ApplyEvent";
import { useAlert } from "../context/AlertProvider";
export default function EventsCard({
  _id,
  title,
  content,
  date,
  eventImage,
  events,
}) {
  const { showAlert } = useAlert();
  const handleEvent = async (_id) => {
    const event = events.find((event) => event._id === _id);
    const { title, creatorEmail } = event;
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const eventId = _id;
    console.log(eventId, email, creatorEmail, name, title);
    const response = await ApplyEvent(
      eventId,
      email,
      creatorEmail,
      name,
      title
    );
    const { success, message } = response;
    if (success) {
      showAlert("success", message);
    } else {
      showAlert("error", message);
    }
  };
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar>
            <FolderIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="150"
        image={eventImage}
        alt="Image for events"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          size="small"
          sx={{ marginLeft: "30%" }}
          onClick={() => handleEvent(_id)}
        >
          Volunteer
        </Button>
      </CardActions>
    </Card>
  );
}

/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </ExpandMore> */

import * as React from "react";
import { Grid } from "@mui/material";
import EventsCard from "./EventsCard";
import GetEvent from "../api/GetEvent";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertProvider";
export default function Event() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const { showAlert } = useAlert();
  React.useEffect(() => {
    if (localStorage.getItem("type") === "INSTITUTION") {
      navigate("/form");
    }
    GetEvent().then((response) => {
      if (response) {
        setEvents(response);
      } else {
        showAlert("error", response.message);
      }
    });
  }, [showAlert, navigate]);
  return (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      {events.map((event) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={event._id}
          sx={{ marginRight: "25px", marginLeft: "25px", marginY: "25px" }}
        >
          <EventsCard
            _id={event._id}
            title={event.title}
            content={event.description}
            date={event.date}
            eventImage={event.eventImage}
            events={events}
          />
        </Grid>
      ))}
      <Dashboard />
    </Grid>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

export default function CustomAlert(props) {
  const [open, setOpen] = React.useState(true);
  const { severity, message } = props;
  setTimeout(() => {
    setOpen(false);
  }, 10000);
  return (
    open === true && (
      <Box sx={{ width: "100%", height: "50px" }}>
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity={severity}
            sx={{ mb: 1, borderRadius: "0" }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle sx={{ marginTop: "-5px" }}>
              <span style={{ fontSize: "22px" }}>{message}</span>
            </AlertTitle>
          </Alert>
        </Collapse>
      </Box>
    )
  );
}
CustomAlert.defaultProps = {
  severity: "success",
  message: "This is an alert message",
};

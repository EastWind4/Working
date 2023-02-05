import { useState, React } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import "react-chatbot-kit/build/main.css";
import Box from "@mui/material/Box";

function Dashboard() {
  const [showChat, setShowChat] = useState(false);

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    backgroundColor: "#243665",
    color: "#FFFFFF",
    zIndex: (theme) => theme.zIndex.drawer + 2,
  };

  const toggleDiv = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <div>
      <div>
        {showChat && (
          <Box
            sx={{
              margin: 0,
              top: "auto",
              right: 20,
              bottom: 20,
              left: "auto",
              position: "fixed",
              marginBottom: "3rem",
              zIndex: (theme) => theme.zIndex.drawer + 2,
            }}
          >
            <iframe
              width="350"
              height="430"
              allow="microphone;"
              src="https://console.dialogflow.com/api-client/demo/embedded/44044ffd-d99a-42ea-bf44-511f1bcbfe15"
              title="Chatbot"
            />
          </Box>
        )}
      </div>
      <Button variant="fab" aria-label="add" sx={style} onClick={toggleDiv}>
        <ChatBubbleIcon />
      </Button>
    </div>
  );
}

export default Dashboard;

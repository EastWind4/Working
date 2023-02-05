import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useToggle } from "../context/ToggleButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import logo from "../images/logo.png";
import SheetReader from "./SheetReader";
import axios from "axios";

function Appbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { on, toggle } = useToggle();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [excel, showExcel] = React.useState(true);
  const type = localStorage.getItem("type");
  let pages;
  if (type === "VOLUNTEER" || type === "INSTITUTION") {
    pages = ["Profile", "Events"];
  } else {
    pages = [];
  }
  const fetchData = async (sheetData) => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/excel/vol/create/",
      {
        name,
        email,
        sheetData,
        filename: name + "_" + new Date(),
      }
    );
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate(`/${page.toLowerCase()}`)}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Avatar
                src={logo}
                sx={{ width: "60px", height: "60px", mr: { xs: 10, md: 1 } }}
                onClick={() => navigate("/")}
              />
              {pages.length === 0 ? (
                <Typography variant="h6">
                  <b>Yasham Foundation</b>
                </Typography>
              ) : null}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => navigate(`/${page.toLowerCase()}`)}
                    sx={{
                      my: 2,
                      color: "inherit",
                      backgroundColor: "inherit",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                ))}
                <span style={{ marginTop: "15px" }}>
                  {excel && <SheetReader submit={fetchData} />}
                </span>
              </Box>
              {localStorage.getItem("isActivated") !== "true" ? (
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{ color: "inherit", display: { xs: "none", md: "flex" } }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  sx={{ color: "inherit", display: { xs: "none", md: "flex" } }}
                >
                  Logout
                </Button>
              )}

              <Button onClick={toggle} sx={{ color: "text.primary" }}>
                {on ? <Brightness7Icon /> : <Brightness4Icon />}
              </Button>
            </Toolbar>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Appbar;

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
import AdbIcon from "@mui/icons-material/Adb";
import { useToggle } from "../context/ToggleButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SchoolIcon from "@mui/icons-material/School";
import logo from "./Yasham.png";

let pages = ["Events"];

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

  //if type is INSTITUTION or VOLUNTEER then add profile to pages'
  const type = localStorage.getItem("type");
  if (type === "INSTITUTION" || type === "VOLUNTEER") {
    pages = ["Events", "Profile"];
  } else {
    pages = ["Events"];
  }

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
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => navigate(`/${page.toLowerCase()}`)}
                    sx={{ my: 2, color: "inherit", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
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

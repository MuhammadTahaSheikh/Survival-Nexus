import React from "react";
import {
  Typography,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { backgroundColor: "black", color: "white" }
      : { color: "inherit" };
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#3A1D49", padding: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" className="link_report_btn" style={getLinkStyle("")}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 1 }}>
              SN
            </Avatar>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 5,
            }}
          >
            <Link to="/" className="link_report_btn" style={getLinkStyle("")}>
              <Button color="inherit">Report</Button>
            </Link>
            <Link
              to="/survivor"
              className="link_report_btn"
              style={getLinkStyle("/survivor")}
            >
              <Button color="inherit">Survivors</Button>
            </Link>
            <Link
              to="/inventory"
              className="link_report_btn"
              style={getLinkStyle("/inventory")}
            >
              <Button color="inherit">Inventory</Button>
            </Link>
          </Box>

          <IconButton sx={{ marginLeft: 2 }}>
            <Avatar src="https://via.placeholder.com/40" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

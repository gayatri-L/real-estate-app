import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Menu as MenuIcon, ExpandMore, Close } from "@mui/icons-material";
import { StarBorder, CheckCircleOutline, Home, Gavel, Storefront, Phone} from "@mui/icons-material";
import { HomeIcon } from "lucide-react";

const DemoNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  // Handle Dropdown Menu
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Handle Mobile/Tablet Drawer
  const toggleDrawer = (open) => () => setMobileOpen(open);

  return (
    <nav className="flex items-center justify-between p-4 border-b border-yellow-400 text-white bg-black">
      {/* Left Side: Logo and Company Name */}
      <div className="flex items-center space-x-2">
        <img src="https://via.placeholder.com/50" alt="Logo" className="h-10 w-10" />
        <span className="text-xl font-bold">Real Estate Buddy</span>
      </div>

      {/* Desktop Navigation (Hidden on Tablets & Mobile) */}
      <div className="hidden lg:flex space-x-6 items-center ml-auto">
      <a href="/" className="hover:text-gray-400 flex items-center">
          <HomeIcon className="mr-1" /> Home
        </a>
        <a href="/" className="hover:text-gray-400 flex items-center">
          <StarBorder className="mr-1" /> Our Recommendation
        </a>

        {/* Dropdown for Value Added Services */}
        <div className="relative">
          <button onClick={handleClick} className="flex items-center hover:text-gray-400">
            Value Added Services <ExpandMore className="ml-1" />
          </button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <CheckCircleOutline className="mr-2" /> Eligibility Check
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Home className="mr-2" /> Home Loan
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Gavel className="mr-2" /> RERA Guidelines
            </MenuItem>
          </Menu>
        </div>

        <a href="/" className="hover:text-gray-400 flex items-center">
          <Storefront className="mr-1" /> Sale Property
        </a>
        <a href="/" className="hover:text-gray-400 flex items-center">
          <Phone className="mr-1" /> Book Consultation
        </a>
      </div>

      {/* Mobile & Tablet Menu Icon (Hidden on Desktop) */}
      <IconButton onClick={toggleDrawer(true)} className=" block lg:!hidden text-white">
        <MenuIcon className="text-white"/>
      </IconButton>

      {/* Mobile/Tablet Drawer Navigation */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
        <div className="w-64 bg-black text-white h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <IconButton onClick={toggleDrawer(false)} className="text-white">
              <Close className="text-white"/>
            </IconButton>
          </div>

          {/* Mobile/Tablet Menu Items */}
          <List>
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <StarBorder className="text-yellow-400" />
              </ListItemIcon>
              <ListItemText primary="Our Recommendation" />
            </ListItem>

            <Divider className="bg-gray-600" />

            {/* Dropdown in Mobile/Tablet */}
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <ExpandMore className="text-yellow-400" />
              </ListItemIcon>
              <ListItemText primary="Value Added Services" />
            </ListItem>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <CheckCircleOutline className="mr-2" /> Eligibility Check
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Home className="mr-2" /> Home Loan
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Gavel className="mr-2" /> RERA Guidelines
              </MenuItem>
            </Menu>

            <Divider className="bg-gray-600" />

            <ListItem button component="a" href="/">
              <ListItemIcon>
                <Storefront className="text-yellow-400" />
              </ListItemIcon>
              <ListItemText primary="Sale Property" />
            </ListItem>

            <ListItem button component="a" href="/">
              <ListItemIcon>
                <Phone className="text-yellow-400" />
              </ListItemIcon>
              <ListItemText primary="Book Consultation" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default DemoNavbar;

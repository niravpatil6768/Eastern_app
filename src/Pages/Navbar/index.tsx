import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import Colors from "../../Assets/Colors";
import { ClearData, getUser } from "../../utils/localStorage";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Swal from "sweetalert2";


export default function Navbar() {
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(); // Assuming getUser returns a promise
      setUser(userData);
    };

    fetchUser();
  }, []);

  const toggleDrawer = (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
    setOpen(newOpen);
  };

  const Logout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btnlogoutconfirm",
        denyButton: "btnlogoutdeny",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        ClearData();
        navigate("/");
      }
    });
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <h2 style={{ margin: "20px 20px" }}>User Profile</h2>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
          <ListItemButton sx={{ display: "flex", justifyContent: "flex-start" }}>
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "1.2rem" }}>
                {user?.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ display: "flex", justifyContent: "flex-start" }}>
            <ListItemIcon>
              <EmailIcon sx={{ fontSize: "2rem" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "1.2rem" }}>
                {user?.email}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ display: "flex", justifyContent: "flex-start" }}>
            <ListItemIcon>
              <VerifiedUserIcon sx={{ fontSize: "1.8rem", marginLeft: "2px" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "1.2rem" }}>
                {user?.role?.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => Logout()} fullWidth sx={{ backgroundColor: Colors.primary, color: "white", padding: "2%", margin: "20px 0" }}>
            Sign out
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Grid
      container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        display: "flex",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        margin: "0 auto",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: Colors.primary,
          boxShadow: "none",
          width: "100%",
          paddingLeft:
            window.innerWidth > 900 && window.innerWidth < 1100 ? "3%" : "3%",
          paddingRight:
            window.innerWidth > 900 && window.innerWidth < 1100 ? "3%" : "3%",
          margin: "0 auto",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: window.innerWidth > 900 ? "space-between" : "center",
              paddingRight: 0,
            }}
          >
            <Box sx={{ display: { lg: 'flex', md: "flex", sm: "none", xs: "none" } }}>
              <Typography sx={{ fontSize: "1.2rem" }}>User Management</Typography>
            </Box>
            <Button onClick={toggleDrawer(true)}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "1.2rem", marginRight: "10px", color: "white" }}>
                  <span style={{ color: "lightgrey" }}>Hi, </span>
                  {user?.name}
                </Typography>
                <AccountCircleIcon style={{ fontSize: "3rem", color: "white" }} />
              </div>
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

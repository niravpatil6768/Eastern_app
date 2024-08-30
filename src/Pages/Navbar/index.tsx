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
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { storeUserData } from "../../Redux/action";

export default function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((store: any) => store.reducer.user);
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userData.length === 0) {
        const data = await getUser();
        console.log("data", data);
        dispatch(storeUserData(data));
        setUser(data);
      } else {
        console.log("data");
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const toggleDrawer =
    (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
      setOpen(newOpen);
    };

  const Logout = () => {
    setOpen(false);
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
    <Box sx={{ width: 350, backgroundColor: "#f4f4f4" }} role="presentation">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#1976d2",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          User Profile
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem
          disablePadding
          sx={{
            flexDirection: "column",
            alignItems: "start",
            padding: "10px 20px",
          }}
        >
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: "#e3f2fd",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={{ fontSize: "1.4rem", fontWeight: "500", color: "#424242" }}
              >
                {user?.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: "#e3f2fd",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <ListItemIcon>
              <EmailIcon sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={{ fontSize: "1.4rem", fontWeight: "500", color: "#424242" }}
              >
                {user?.email}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: "#e3f2fd",
              borderRadius: "5px",
            }}
          >
            <ListItemIcon>
              <VerifiedUserIcon
                sx={{ fontSize: "2rem", color: "#1976d2", marginLeft: "2px" }}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={{ fontSize: "1.4rem", fontWeight: "500", color: "#424242" }}
              >
                {user?.role?.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => Logout()}
            fullWidth
            sx={{
              backgroundColor: "#d32f2f",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
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
              justifyContent:
                window.innerWidth > 900 ? "space-between" : "center",
              paddingRight: 0,
            }}
          >
            <Box
              sx={{
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>
                User Management
              </Typography>
            </Box>
            <Button onClick={toggleDrawer(true)}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: "10px",
                    color: "white",
                  }}
                >
                  <span style={{ color: "lightgrey" }}>Hi, </span>
                  {user?.name}
                </Typography>
                <AccountCircleIcon
                  style={{ fontSize: "3rem", color: "white" }}
                />
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

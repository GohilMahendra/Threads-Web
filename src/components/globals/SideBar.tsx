import { Avatar, Badge, BottomNavigation, BottomNavigationAction, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Switch, Typography, useMediaQuery } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PersonIcon from '@mui/icons-material/Person';
import lightLogo from "../../assets/theads-icon-background-light.png"
import darkLogo from "../../assets/theads-icon-background.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../globals/ThemeContext";
const SideBar = () => {
  const theme = useTheme()
  const [selectedRoute, setSelectedRoute] = useState("feed")
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [anchorEle, setAnchorEle] = useState<HTMLElement | null>()
  const user = useSelector((state: RootState) => state.User.user)
  const navigate = useNavigate();
  const {toggleTheme} = useThemeContext()
  const [signOutDialog, setSignOutDialog] = useState(false)
  const unread_count = useSelector((state: RootState) => state.Conversations.unread_messages)
  useEffect(() => {
    navigate(`/${selectedRoute}`)
  }, [selectedRoute])

  const signOut = () => {
    setSignOutDialog(false)
    localStorage.clear()
    navigate(`/signin`)
  }



  return (
    isSmallScreen ? (
      <BottomNavigation sx={{
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        position: "fixed",
        bottom: 0
      }}>
        <BottomNavigationAction
          onClick={()=>setSelectedRoute("home")}
          label="Home"
          value="home"
          icon={<HomeIcon style={{ color: selectedRoute === 'home' ? '#000' : 'grey' }} />}
        />
        <BottomNavigationAction
         onClick={()=>setSelectedRoute("search")}
          label="Search"
          value="search"
          icon={<SearchIcon style={{ color: selectedRoute === 'search' ? '#000' : 'grey' }} />}
        />
        <BottomNavigationAction
         onClick={()=>setSelectedRoute("conversations")}
          label="Messages"
          value="conversations"
          icon={<MailOutlineIcon style={{ color:selectedRoute === 'conversations' ? '#000' : 'grey' }} />}
        />
        <BottomNavigationAction
         onClick={()=>setSelectedRoute("favorites")}
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon style={{ color: selectedRoute === 'favorites' ? '#000' : 'grey' }} />}
        />
        <BottomNavigationAction
         onClick={()=>setSelectedRoute(user._id)}
          label="User"
          value={user._id}
          icon={<PersonIcon style={{ color: selectedRoute === user._id ? '#000' : 'grey' }} />}
        />
      </BottomNavigation>
    ) : (
      <Box
        sx={{
          display: "flex",
          width: "20%",
          bgcolor: theme.palette.background.default,
          justifyContent: "space-between",
          height: "100%",
          borderRight: "0.1px solid grey",
          flexDirection: "column",
        }}
      >
        <Box>
          <Container sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <img
              style={{ objectFit: "contain", height: 50, margin: 20, width: 50, borderRadius: 50 }}
              src={theme.palette.mode=="dark"?darkLogo:lightLogo}
            />
          </Container>

          <ListItem button onClick={() => setSelectedRoute("feed")} selected={selectedRoute === "feed"}>
            <ListItemIcon>
              <HomeIcon color={selectedRoute === "feed" ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText primary={<Typography fontWeight={"bold"} color={selectedRoute === "feed" ? "primary" : "textSecondary"}>Home</Typography>} />
          </ListItem>

          <ListItem button onClick={() => setSelectedRoute("search")} selected={selectedRoute === "search"}>
            <ListItemIcon>
              <SearchIcon color={selectedRoute === "search" ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText primary={<Typography fontWeight={"bold"} color={selectedRoute === "search" ? "primary" : "textSecondary"}>Search</Typography>} />
          </ListItem>

          <ListItem button onClick={() => setSelectedRoute("conversations")} selected={selectedRoute === "conversations"}>
            <ListItemIcon>
              <Badge badgeContent={unread_count} color="primary">
                <MailOutlineIcon color={selectedRoute === "conversations" ? "primary" : "secondary"} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<Typography fontWeight={"bold"} color={selectedRoute === "conversations" ? "primary" : "textSecondary"}>Messages</Typography>} />
          </ListItem>

          <ListItem button onClick={() => setSelectedRoute("favorites")} selected={selectedRoute === "favorites"}>
            <ListItemIcon>
              <FavoriteIcon color={selectedRoute === "favorites" ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText primary={<Typography  fontWeight={"bold"} color={selectedRoute === "favorites" ? "primary" : "textSecondary"}>Favorites</Typography>} />
          </ListItem>

          <ListItem button onClick={() => setSelectedRoute(user._id)} selected={selectedRoute === user._id}>
            <ListItemIcon>
              <PersonIcon color={selectedRoute === user._id ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText primary={<Typography  fontWeight={"bold"} color={selectedRoute === user._id ? "primary" : "textSecondary"}>User</Typography>} />
          </ListItem>
        </Box>
        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <Switch 
            onChange={()=>toggleTheme()}
            />
            <Typography sx={{ textTransform: "none", textAlign: "center", marginLeft: "10px" }}>
              Dark Mode
            </Typography>
          </Box>
          <Stack flexDirection={"row"} sx={{ padding: 2 }}>
            <Avatar
              src={user.profile_picture}
            />
            <Box sx={{ marginLeft: 2, alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Typography color={theme.palette.text.primary} sx={{ fontSize: 14 }}>{user.fullname}</Typography>
              <IconButton onClick={() => setSignOutDialog(true)} >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Stack>

        </Stack>
        <Dialog open={signOutDialog} onClose={() => setSignOutDialog(false)} >
          <Paper sx={{
            display:"flex",
            flexDirection:"column",
            padding: '20px',
            width: "100%",
            alignSelf: "center",
            alignItems:"center",
           
            maxWidth: '600px',
            bgcolor: "white"
          }}>
            <Typography fontWeight={"bold"}>Do you Want to Sign Out ??</Typography>
            <Typography>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </Typography>
            <Stack direction={"row"}>
              <Button  onClick={() => signOut()} color="primary">
                <Typography sx={{textTransform:"none"}}>Log out</Typography>
              </Button>
              <Button onClick={() => setSignOutDialog(false)}>
              <Typography sx={{textTransform:"none"}}>Cancel</Typography>
              </Button>
            </Stack>
          </Paper>
        </Dialog>
      </Box>
    )
  );

}
export default SideBar
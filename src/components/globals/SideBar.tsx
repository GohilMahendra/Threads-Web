import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Switch, Typography, useMediaQuery } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PersonIcon from '@mui/icons-material/Person';
import Frame from "../../assets/theads-icon-background-light.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
const SideBar = () => {

  const [selectedRoute, setSelectedRoute] = useState("Home")
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [anchorEle, setAnchorEle] = useState<HTMLElement | null>()
  const user = useSelector((state: RootState) => state.User.user)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEle(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEle(null);
  };
  const routes = [
    {
      name: "Home",
      icon: <HomeIcon
        color={selectedRoute == "Home" ? "primary" : "secondary"}
      />
    },
    {
      name: "Search",
      icon: <SearchIcon
        color={selectedRoute == "Search" ? "primary" : "secondary"}
      />
    },
    {
      name: "Messages",
      icon: <MailOutlineIcon
        color={selectedRoute == "Messages" ? "primary" : "secondary"}
      />
    },
    {
      name: "Favorites",
      icon: <FavoriteIcon
        color={selectedRoute == "Favorites" ? "primary" : "secondary"}
      />
    },
    {
      name: "User",
      icon: <PersonIcon
        color={selectedRoute == "User" ? "primary" : "secondary"}
      />
    },

  ]

  return (
    isSmallScreen ? (
      <BottomNavigation sx={{
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        position: "fixed",
        bottom: 0
      }}>
        {routes.map((route) => (
          <BottomNavigationAction
            onClick={() => setSelectedRoute(route.name)}
            key={route.name}
            color={selectedRoute === route.name ? "#000" : "grey"}
            label={route.name}
            icon={route.icon}
          />
        ))}
      </BottomNavigation>
    ) : (
      <Box
        sx={{
          display: "flex",
          flex: 1.5,
          justifyContent: "space-between",
          height: "100%",
          borderRight: "0.1px solid black",
          flexDirection: "column",
        }}
      >
        <Box>
          <Container sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <img
              style={{ objectFit: "contain", height: 50, margin: 20, width: 50, borderRadius: 50 }}
              src={Frame}
            />
          </Container>

          {routes.map((route) => {

            return (
              <Button
                key={route.name}
                onClick={() => setSelectedRoute(route.name)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "calc(100% - 20px)",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >

                <span style={{ color: selectedRoute === route.name ? "#000" : "grey" }}>
                  {route.icon}
                </span>
                <Typography sx={{ textTransform: "none", textAlign: "center", fontWeight: "bold", marginLeft: "10px", color: selectedRoute === route.name ? "#000" : "grey" }}>
                  {route.name}
                </Typography>
              </Button>
            )
          })}
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
            <Switch />
            <Typography sx={{ textTransform: "none", textAlign: "center", marginLeft: "10px" }}>
              Dark Mode
            </Typography>
          </Box>
          <Stack flexDirection={"row"} sx={{ padding: 2 }}>
            <Avatar
              src={user.profile_picture}
            />
            <Box sx={{ display: "flex", marginLeft: 2, flexDirection: "row" }}>
              <Typography sx={{ margin: "auto" }}>{user.fullname}</Typography>
              <IconButton onClick={handleClick} >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Stack>

        </Stack>

      </Box>
    )
  );

}
export default SideBar
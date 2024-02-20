import { Box, Button, CircularProgress, Container, Grid, ImageListItem, ListItem, Stack, TextField, Typography, useMediaQuery, useTheme, } from "@mui/material"
import { loginUser } from "../../api/UserApi"
import { useContext, useState } from "react"
import { BASE_URL } from "../../globals/constants"
import { User, UserResponse } from "../../types/User"
import logo from "../../assets/thread-dark.jpg";
import { SignInAction } from "../../redux/actions/UserActions"
import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import io from "socket.io-client";
import { SocketContext } from "../../globals/SocketProvider"
const SignIn = () => {

    const theme = useTheme()
    const isMobileDevice = useMediaQuery(theme.breakpoints.down("md"))
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setSocket } = useContext(SocketContext)
    const loading = useSelector((state: RootState) => state.User.loading)
    const dispatch = useAppDispatch()
    const SignInUser = async () => {
        try {

            const responseStaus = await dispatch(SignInAction({
                email: email,
                password: password
            }))

            if (SignInAction.fulfilled.match(responseStaus)) {
                const token = localStorage.getItem("token")
                const socket = io(BASE_URL, {
                    auth: {
                        token: token
                    }
                });

                socket.on('connect', () => {
                    console.log('Connected to Socket.IO server');
                    setSocket(socket)
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",

                height: "100vh", // Set height to 100% of viewport height
                width: "100vw", // Set width to 100% of viewport width
                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center"
            }}>

            <Box sx={{
                display: 'flex',
                maxWidth: '500px',
                backgroundColor: "black",
                flex: 1, flexDirection: "column", justifyContent: "center"
            }}>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ..."
                    InputProps={{
                        sx: {
                            borderRadius: '20px',
                            margin: '10px',

                            border: '1px solid white',
                            color: 'white', // Set text color to white

                        },
                    }}

                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password ..."
                    InputProps={{
                        sx: {
                            borderRadius: '20px',
                            margin: '10px',
                            color: 'white', // Set text color to white
                            border: '1px solid white',
                        },
                    }}
                />
                <Button
                    onClick={() => SignInUser()}
                    variant={"text"}
                    sx={{
                        padding: '15px',
                        borderRadius: '20px',
                        margin: '10px',
                        bgcolor: 'white',
                        '&:hover': {
                            bgcolor: 'lightgray', // Change to the desired hover color
                        },
                    }}
                >
                    {!loading ?
                        <Typography sx={{ textTransform: "none", color: "#000", }}>Sign In</Typography>
                        : <CircularProgress />
                    }
                </Button>
            </Box>
        </Box>
    )
}
export default SignIn
import { Box, Button, CircularProgress, Container, Grid, ImageListItem, ListItem, Stack, TextField, Typography, useMediaQuery, useTheme, } from "@mui/material"
import { loginUser } from "../../api/UserApi"
import { useContext, useState } from "react"
import { BASE_URL } from "../../globals/constants"
import { User, UserResponse } from "../../types/User"
import { SignInAction } from "../../redux/actions/UserActions"
import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import io from "socket.io-client";
import { SocketContext } from "../../globals/SocketProvider"
import logo from "../../assets/theads-icon-background.png";
import { makeStyles } from "@mui/styles"
import { updateUnreadCount } from "../../redux/slices/ConversationSlice"
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
                if (socket) {
                    socket.on("newMessageNotification", ({ senderId, channel }) => {
                        dispatch(updateUnreadCount({
                            senderId: senderId,
                            channel: channel
                        }))
                    })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Box sx={styles.container}>
            <Box sx={styles.formContainer}>
                <img src={logo} style={styles.logo} />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ..."
                    InputProps={{ sx: styles.textField }}
                />
                <TextField
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password ..."
                    InputProps={{ sx: styles.textField }}
                />
                <Button
                    onClick={() => SignInUser()}
                    variant="text"
                    sx={styles.button}
                >
                    {!loading ? (
                        <Typography sx={styles.buttonText}>Sign In</Typography>
                    ) : (
                        <CircularProgress />
                    )}
                </Button>
            </Box>
        </Box>
    )
}
export default SignIn
const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    formContainer: {
        display: 'flex',
        minWidth: '300px',
        width: '400px',
        maxWidth: '500px',
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        margin: 20,
    },
    textField: {
        borderRadius: '20px',
        margin: '10px',
        border: '1px solid white',
        color: 'white',
    },
    button: {
        padding: '15px',
        borderRadius: '20px',
        margin: '10px',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
    buttonText: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#000',
    },
}


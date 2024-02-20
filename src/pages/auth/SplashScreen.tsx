import { Box, Container, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { SocketContext } from "../../globals/SocketProvider"
import { useAppDispatch } from "../../redux/store"
import { SignInAction } from "../../redux/actions/UserActions"
import io from "socket.io-client";
import logo from "../../assets/theads-icon-background.png";
import { BASE_URL } from "../../globals/constants"
const SplashScreen = () =>
{
    const { socket, setSocket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const signIn = async () => {
        try {
            const email = localStorage.getItem("email")
            const password = localStorage.getItem("password")

            if (!email || !password) {
                alert("no found")
            }
            else {
                const fullfilled = await dispatch(SignInAction({ email, password }))
                if (SignInAction.fulfilled.match(fullfilled)) {
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
                else {
                    alert("no found")
                }
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        setTimeout(() => {
            signIn()
        }, 2000);
    }, [])
    return(
        <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center", flex:1, bgcolor:"#000" }} >
           <img
           src={logo}
           />
        </Box>
    )
}
export default SplashScreen
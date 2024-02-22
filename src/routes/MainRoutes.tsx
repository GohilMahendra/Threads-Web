import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../components/globals/SideBar';
import SearchBar from '../components/globals/SearchBar';
import SignIn from '../pages/auth/SignIn';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SplashScreen from '../pages/auth/SplashScreen';
import Messages from '../pages/messages/Messages';
import Conversations from '../pages/messages/Conversations';
import { useEffect } from 'react';
import Feed from '../pages/feed/Feed';
const MainRoute = () => {
    const user = useSelector((state: RootState) => state.User.user)
    return (
        < Router >
            <Box sx={{
                display: "flex",
                flex: 1,
                height: "100vh",
                width: "100vw",
                overflow:"hidden"
            }}>
                {
                    user.fullname ?
                        <>
                            <SideBar />
                            <Routes>
                                <Route  path='/feed' element={<Feed />} />
                                <Route path="/conversations" element={<Conversations />}>
                                    <Route path=":id" element={<Messages />} />
                                </Route>
                            </Routes>
                          
                        </>
                        :
                        <Routes>
                            <Route path='/' element={<SplashScreen />} />
                            <Route path='/signin' element={<SignIn />} />
                        </Routes>
                }

            </Box>
        </Router >
    )
}
export default MainRoute
import { Avatar, Badge, Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material"
import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchConversations } from "../../redux/actions/ConversationActions"
import { timeDifference } from "../../globals/utilities"
import { Outlet, useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

const Conversations = () => {
    const messages = useSelector((state: RootState) => state.Conversations.conversations)
    const dispatch = useAppDispatch()
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchConversations(""))
    }, [])
    return (
        <Box sx={{
            display: "flex",
            width:"100%",
            flexDirection: "row",
            padding: 1,
        }}>
          { !isSmallScreen &&
              <Stack sx={{ display: 'flex', width: "30%", }}>
              <Typography typography={""}>Messages</Typography>
              {
                  messages.map(channel => {
                      return (
                          <Paper
                              onClick={() => navigate(`/conversations/${channel.member._id}`)}
                              elevation={2} 
                              sx={{ display:"flex",flexDirection:"column",flexWrap:"wrap", padding: 2, width: "90%", cursor: "pointer", margin: 2, borderRadius: '10px' }}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap={"wrap"}>
                                  <Avatar src={channel.member.profile_picture} />
                                  <Stack direction="column" spacing={0} flex={1} ml={1}>
                                      <Typography variant="inherit">{channel.member.fullname}</Typography>
                                  </Stack>
                                  <Typography variant="body2">{timeDifference(channel.updated_at)}</Typography>
                              </Stack>
                              <Stack direction={"row"} sx={{justifyContent:"space-between"}}>
                              <Typography variant="body2" sx={{ marginTop: 1 }}>{channel.lastMessage?.content}</Typography>
                              <Badge color={"primary"} badgeContent={channel.unread_messages}/>
                              </Stack>
                          </Paper>
                      )
                  })
              }
          </Stack>
          }
        
                <Stack sx={{ width: "70%" }}>
                    <Outlet />
                </Stack>
           

        </Box>
    )
}
export default Conversations
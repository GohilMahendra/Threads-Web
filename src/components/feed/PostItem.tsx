import { Avatar, Box, IconButton, Paper, Stack, Typography } from "@mui/material"
import { Thread } from "../../types/Post"
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { timeDifference } from "../../globals/utilities";
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
type PostItemsProps =
    {
        post: Thread,
        onPressComment: (postId: string) => void
        onRepost: (postId: string) => void,
        onPressNavigate: (userId: string) => void
        onLikeToggle: (postId: string, step: "like" | "unlike") => void
    }

const PostItem = (props: PostItemsProps) => {
    const post = props.post
    const media = post.media

    const toggeleLike = () => {
        if (post.isLiked)
            props.onLikeToggle(post._id, "unlike")
        else
            props.onLikeToggle(post._id, "like")
    }
    return (
        <Paper elevation={5} sx={styles.container}>
            <Stack sx={{ display: "flex" }}>
                <Avatar
                    src={post.user.profile_picture}
                />
            </Stack>
            <Stack sx={{ display: 'flex', justifyContent: "center", marginLeft: 2 }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{post.user.fullname}</Typography>
                    <Typography sx={{ fontSize: 14 }}>{timeDifference(post.updated_at)}</Typography>
                </Stack>
                <Typography sx={{ fontSize: 14 }}>
                    Happy #SunDay! This week’s space weather report includes: <br />
                    · 1 X-class flare  <br />
                    · 13 M-class flares  <br />
                    · 28 coronal mass ejections <br />
                    · 0 geomagnetic storms  <br />

                    This video from NASA’s Solar Dynamics Observatory (SDO) shows activity on the Sun over the past week.
                </Typography>
                <Stack direction="row"
                    margin={2}
                    alignItems="center"
                    spacing={5}>
                    <IconButton onClick={toggeleLike}>
                        {
                            post.isLiked ?
                                <FavoriteSharpIcon sx={{ color: "red" }} />
                                : <FavoriteBorderIcon />
                        }

                        <Typography sx={{marginLeft:1}}>{post.likes}</Typography>
                    </IconButton>
                    <IconButton>
                        <ChatBubbleOutlineIcon />
                        <Typography sx={{marginLeft:1}}>{post.replies}</Typography>
                    </IconButton>
                    <IconButton>
                        <RepeatIcon />
                    </IconButton>
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Paper>
    )

}
export default PostItem

const styles = {
    container: {
        display: "flex",
        borderRadius: 5,
        bgcolor: "white",
        margin: 2, padding: 2
    }
}

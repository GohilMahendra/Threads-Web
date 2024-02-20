import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"
import { Thread } from "../../types/Post"
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

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

    return (
        <Paper elevation={5} sx={{ display: "flex", borderRadius: 5, bgcolor: "white", margin: 2, padding: 2, }}>
            <Stack sx={{ display: "flex" }}>
                <Avatar
                    src={post.user.profile_picture}
                />
            </Stack>
            <Stack sx={{ display: 'flex', justifyContent: "center", marginLeft: 2 }}>
                <Stack>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{post.user.fullname}</Typography>
                    <Typography sx={{ fontSize: 14 }} >{post.user.fullname}</Typography>
                </Stack>
                <Typography sx={{ fontSize: 14 }}>This for the content which is goona be wrotter over here for the this kind of wrappers</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }}>
                    {post.media.map((image, index) => (
                        <Box sx={{
                            height: "45%",
                            width: "45%"
                        }}>

                            <img
                                src={image.media_url}
                                alt={`Image ${index + 1}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>
                    ))}

                </Box>
                <Stack direction="row"
                    margin={2}
                    alignItems="center"
                    spacing={5}>
                    <FavoriteSharpIcon sx={{ color: (post.isLiked) ? "red" : "grey" }} />
                    <ShareIcon />
                    <ModeCommentIcon />
                </Stack>
            </Stack>
        </Paper>
    )

}
export default PostItem
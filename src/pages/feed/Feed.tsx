import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Modal, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"

import { useCallback, useEffect, useRef, useState } from "react";
import { Thread } from "../../types/Post";
import axios from "axios";
import { BASE_URL } from "../../globals/constants";
import PostItem from "../../components/feed/PostItem";
import { RootState, useAppDispatch } from "../../redux/store";
import { FetchMorePostsAction, FetchPostsAction, LikeAction, unLikeAction } from "../../redux/actions/FeedActions";
import { useSelector } from "react-redux";
const Feed = () => {
    const posts = useSelector((state:RootState)=>state.Feed.Threads)
    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(false)
    const [lastOffset, setLastOffset] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<"for_you" | "following" | string>("for_you")
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()
    const handleChange = (event: any, newValue: string) => {
        setSelectedTab(newValue);
    };

    const onLikeToggle = useCallback(((postId: string, state: "like" | "unlike") => {
        if (state == "like") {
          dispatch(LikeAction({ postId: postId }))
        }
        else {
          dispatch(unLikeAction({ postId: postId }))
        }
      }), [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollableElement = scrollRef.current
            if (!scrollableElement)
                return

            if (scrollableElement.scrollTop + scrollableElement.clientHeight >=
                scrollableElement.scrollHeight) {
               dispatch(FetchMorePostsAction({post_type:selectedTab}))
            }
        }
        const scrollableElement = scrollRef.current;
        scrollableElement?.addEventListener('scroll', handleScroll)
        dispatch(FetchPostsAction({post_type:selectedTab}))
        return () => scrollableElement?.removeEventListener('scroll', handleScroll)

    }, [selectedTab])

    return (
        <Box
            ref={scrollRef}
            sx={{
                display: 'flex',
                flexDirection: "column",
                flex: 4,
                overflowX: "hidden",
                overflowY: "scroll",
                alignItems: "center",

            }}>
            <Box sx={{ zIndex: 1000, bgcolor: "white", width: "auto", position: "sticky", borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange} sx={{ gap: 2 }} aria-label="basic tabs example">
                    <Tab value={"for_you"} label="For You" />
                    <Tab value={"following"} label="Following" />

                </Tabs>
            </Box>
            {
                loading &&
                <CircularProgress />
            }
            {
                posts.map((post) => {
                    return (
                        post.isRepost == false ?
                            <PostItem
                                onLikeToggle={(postId,step) => onLikeToggle(postId,step)}
                                onPressComment={() => console.log("button pressed")}
                                onPressNavigate={() => console.log("button pressed")}
                                onRepost={() => console.log("button pressed")}
                                post={post}
                            />
                            : null
                    )
                })
            }
        </Box>

    )
}
export default Feed
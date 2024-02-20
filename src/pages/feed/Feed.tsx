import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Modal, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"

import { useEffect, useRef, useState } from "react";
import { Thread } from "../../types/Post";
import axios from "axios";
import { BASE_URL } from "../../globals/constants";
import PostItem from "../../components/feed/PostItem";
const Feed = () => {
    const [posts, setPosts] = useState<Thread[]>([])
    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(false)
    const [lastOffset, setLastOffset] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<"for_you" | "following" | string>("for_you")
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const getPosts = async () => {
        try {
            setLoading(true)
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThmMDU5ZDkwMjM2ZDZhZmFkNzQ5MGMiLCJpYXQiOjE3MDgzODIwOTB9.X6MuKpnLPhwAQJyXji3gJ7CowhWhBuDhpHd99MlpSdk"
            const BASE_URL = "http://localhost:3000/"


            let query = `${BASE_URL}posts?pageSize=${20}`;

            if (selectedTab == "following") {
                query += `&post_type=following`
            }
            const response = await axios.get(query, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })
            if (response.status == 200) {
                setLoading(false)
                setPosts(response.data.data)
                setLastOffset(response.data.meta.lastOffset)
                scrollRef.current?.scrollIntoView()
            }
            else {
                setLoading(false)
                console.log(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const getMorePosts = async () => {
        if (!lastOffset)
            return
        setLoadMore(true)
        const token = localStorage.getItem("token")


        let query = `${BASE_URL}posts?pageSize=${20}&lastOffset=${lastOffset}`;

        if (selectedTab == "following") {
            query += `&post_type=following`
        }

        const response = await axios.get(query, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        if (response.status == 200) {
            setLoadMore(false)
            setPosts(prevPosts => [...prevPosts, ...response.data.data])
            setLastOffset(response.data.meta.lastOffset)
        }
        else {
            setLoadMore(false)
            console.log(response.data)
        }
    }


    const handleChange = (event: any, newValue: string) => {
        setSelectedTab(newValue);
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollableElement = scrollRef.current
            if (!scrollableElement)
                return

            if (scrollableElement.scrollTop + scrollableElement.clientHeight >=
                scrollableElement.scrollHeight) {
                getMorePosts()
            }
        }
        const scrollableElement = scrollRef.current;
        scrollableElement?.addEventListener('scroll', handleScroll)
        getPosts()
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
                                onLikeToggle={() => console.log("button pressed")}
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
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Input, InputAdornment, Paper, Popover, Stack, TextField, Typography } from "@mui/material"
import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { useContext, useEffect, useRef, useState } from "react"
import { fetchConversations } from "../../redux/actions/ConversationActions"
import { getToken, timeDifference } from "../../globals/utilities"
import { Message } from "../../types/Messages"
import { SocketContext } from "../../globals/SocketProvider"
import { fetchMessages } from "../../api/MessageApi"
import { useParams } from "react-router-dom"
import { SendAndArchiveOutlined } from "@mui/icons-material"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from "emoji-picker-react"
import { twitter_blue } from "../../globals/colors"
import axios from "axios"
import { BASE_URL } from "../../globals/constants"
import { readAll } from "../../redux/slices/ConversationSlice"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import { UploadMedia } from "../../types/Post"
const Messages = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false)
    const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false)
    const [userMessage, setUserMessage] = useState("")
    const [lastOffset, setLastOffset] = useState<string | null>(null)
    const { socket } = useContext(SocketContext)
    const { id } = useParams<{ id: string }>();
    const currentUserId = useSelector((state: RootState) => state.User.user._id)
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const listRef = useRef<HTMLDivElement | null>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [files, setFiles] = useState<File[]>([])
    const [previewFiles,setPreviewFiles] = useState<UploadMedia[]>([])
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowEmoji(true)
    };

    const handleClose = () => {
        setShowEmoji(false)
        setAnchorEl(null);
    };
    const dispatch = useAppDispatch()
    const sendMessage = async () => {
        try {
            setSendMessageLoading(true)
            const token = await getToken()
            let formdata = new FormData()
            formdata.append("content", userMessage)

            if (files && files.length > 0) {
                files.forEach((file, index) => {
                    formdata.append(`media`, file);   
                })
            }
            const response = await axios.post(
                `${BASE_URL}messages/${id}`,
                formdata,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'token': token
                    }
                }
            );

            const data = response.data

            setUserMessage("")
            setFiles([])
            setPreviewFiles([])
            setShowEmoji(false)
            setSendMessageLoading(false)

        }
        catch (err) {
            setUserMessage("")
            setShowEmoji(false)
            setSendMessageLoading(false)
        }
    }
    const readAllMessages = async () => {
        try {
            const token = await getToken()
            const path = `${BASE_URL}messages/${id}/read_all`
            const response = await axios.patch(path, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            dispatch(readAll(id || ""))
        }
        catch (err: any) {
            console.log(err)
        }
    }
    const getMessages = async () => {
        try {
            setLoading(true)
            const response = await fetchMessages({
                pageSize: 50,
                receiverId: id || ""
            })
            const data: Message[] = response.data

            if (data) {
                setMessages(data.reverse())
                setLastOffset(response.meta.lastOffset)
                setLoading(false)
                if (listRef.current) {
                    listRef.current.scrollIntoView({ behavior: "smooth" })
                }

            }
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length <= 4) {
            const fileList = Array.from(selectedFiles) as File[];
            const newFileInfos = Array.from(selectedFiles).map(file => ({
              uri: URL.createObjectURL(file),
              type: file.type,
              name: file.name
            }))
            setFiles(fileList)
            setPreviewFiles(newFileInfos);
          }
          else
          {
            console.log("error in file upload")
            alert("Max 4 files Allowed")
          }
    };


    const removeMediaItem = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };
    const handleEmojiSelect = (event: any) => {
        setUserMessage(userMessage => userMessage + event.emoji);

    };

    useEffect(() => {
        if (socket) {
            socket.emit("userConversation", id)
            socket.on("newMessage", (message: Message) => {
                setMessages(prevMessage => [...prevMessage, message])

                if (listRef.current) {
                    listRef.current.scrollTop = listRef.current.scrollHeight;
                }

            })
        }

        getMessages()
        readAllMessages()
        return () => {
            setShowEmoji(false)
            socket?.off("newMessage")
        }
    }, [id])

    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            flexDirection: "column",
            padding: 1,
            alignItems: "center"

        }}>
            <Box
                ref={listRef}
                sx={{
                    display: 'flex', width: "100%", flexDirection: "column", flex: 1, overflow: "scroll"
                }}>

                {
                    messages.map((message) => {
                        return (
                            <Paper sx={{
                                maxWidth: "60%",
                                alignSelf: (id == message.sender) ? "flex-start" : "flex-end",
                                margin: 1,
                                borderRadius: 5,
                                padding: 2,
                                bgcolor: (id == message.sender) ? twitter_blue : "white",
                                flexWrap: "wrap",

                            }}>
                                <Typography sx={{ wordWrap: 'break-word' }}>{message.content}</Typography>
                                {
                                    message.media && message.media.length > 0
                                    &&
                                    <img
                                    src={message.media[0].media_url}
                                    />
                                }
                            </Paper>
                        )
                    })
                }
            </Box>
            <Box sx={{ padding: 1, borderRadius: 2, bgcolor: "rgba(173, 216, 230, 0.2)", width: "90%", margin: 1 }}>
                {
                    files.length > 0 &&
                    <Stack direction={"row"} sx={{ display: "flex", }}>
                        {
                            previewFiles.map((file, index) => {
                                return (
                                    <Box key={index} sx={{ position: "relative", margin: 2, width: 100 }}>
                                       {file.type.includes("image") && <img
                                            style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                            src={file.uri}
                                            alt="File Preview"
                                        />
                                        }
                                        {
                                           file.type.includes("video") && <video
                                           controls
                                           style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                           src={file.uri}
                                       /> 
                                        }
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: -20,
                                                right: -20,
                                                display: "flex",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <IconButton onClick={() => removeMediaItem(index)}>
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                )
                            })
                        }
                    </Stack>
                }
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack direction={"row"}>
                        <IconButton onClick={(e) => handleClick(e)}>
                            <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton
                            component="label"
                            htmlFor="file-input"
                            edge="end"
                            aria-label="attach file"
                            tabIndex={-1} // Ensure the IconButton is not tabbable
                        >
                            <AttachFileIcon />
                            <input
                                id="file-input"
                                type="file"
                                multiple
                                maxLength={4} 
                                accept="video/*,image/*"
                                style={{ display: 'none' }}
                                onChange={(event) => handleFileUpload(event)}
                            />
                        </IconButton>
                    </Stack>
                    <Input
                        value={userMessage}
                        placeholder={"send a Message ..."}
                        onChange={(e) => setUserMessage(e.target.value)}
                        sx={{
                            borderRadius: '20px',
                            margin: '10px',
                            width: "80%",
                        }}
                    />
                        <IconButton
                            disabled={(userMessage.length == 0 && files.length == 0)}
                            onClick={() => sendMessage()}>
                            <SendIcon />
                        </IconButton>
                    
                </Stack>
            </Box>
            <Popover
                id={id}
                open={showEmoji}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </Popover>
        </Box>
    )
}
export default Messages
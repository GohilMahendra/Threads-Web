import React from "react";
import { Media } from "../../types/Post";
import { Box, Stack } from "@mui/material";

type MediaGridProps = 
{
    media: Media[],
}
const MediaGrid = (props:MediaGridProps) =>
{
    const images = props.media
    return(
        <Box>
            {
                images.length == 1
                && 
                <Box
                sx={{
                    display:"flex",
                    flexWrap:"wrap",
                    flexDirection:"row",
                    maxHeight:"300px",
                    width:"100%",
                    borderRadius:'20px'
                    
                }}
                >
                    <img
                    src={images[0].media_url}
                    style={{objectFit:"contain",borderRadius:"20px",overflow:"hidden"}}
                    />
                </Box>
            }
            {
                images.length == 2
                && 
                (
                    
                    <Stack flexDirection={"row"}>
                    {
                        images.map((media,number)=>{
                            return(
                                <Box
                                sx={{
                                    display:"flex",
                                    flexWrap:"wrap",
                                    flexDirection:"row",
                                    maxHeight:"300px",
                                    width:"50%",
                                    borderRadius:'20px'
                                }}
                                >
                                    <img
                                    src={images[0].media_url}
                                    style={{objectFit:"contain",borderRadius:"20px",overflow:"hidden"}}
                                    />
                                </Box>
                            )
                        })
                    }
                    </Stack>
                )
            }
        </Box>
    )
}
export default MediaGrid
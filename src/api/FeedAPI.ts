import axios from "axios"
import { BASE_URL } from "../globals/constants"
import { UploadMedia } from "../types/Post"
import { getToken } from "../globals/utilities"

type CreatePostArgs =
    {
        media?: File[],
        content?: string
    }

export const createPost = async ({ args }: { args: CreatePostArgs }) => {
    try {
        const content = args.content
        const media = args.media

        const token = await getToken()
        let formData = new FormData()
        if (content)
            formData.append("content", content)

        if (media && media.length > 0) {
            media.forEach((mediaItem, index) => {
                formData.append("media", mediaItem)
            })
        }
        const uploadPostResponse = await axios.post(BASE_URL + "posts",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            })
        if (uploadPostResponse.status == 200) {
            return uploadPostResponse.data
        }

        else
            throw new Error(uploadPostResponse.data)
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const createRepost = async (postId: string, content?: string) => {
    try {

        const token = await getToken()
        let formData = new FormData()
        if (content)
            formData.append("content", content)

        formData.append("is_repost", "true")
        formData.append("postId", postId)

        const uploadPostResponse = await axios.post(BASE_URL + "posts",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            })
        if (uploadPostResponse.status == 200) {
            return uploadPostResponse.data
        }

        else
            throw new Error(uploadPostResponse.data)
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const fetchPosts = async ({
    pageSize = 10,
    lastOffset,
    post_type,
}: { pageSize: number, lastOffset?: string, post_type: string }) => {
    try {
        const token = await getToken()

        let query = `${BASE_URL}posts?pageSize=${pageSize}`;

        if (lastOffset) {
            query += `&lastOffset=${lastOffset}`;
        }

        if (post_type === "following") {
            query += `&post_type=following`;
        }

        const response = await axios.get(query, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const fetchPostsByUser = async ({
    userId,
    pageSize = 10,
    lastOffset,
    post_type
}: {
    userId: string,
    pageSize: number
    lastOffset?: string,
    post_type: string
}) => {
    try {
        const token = await getToken()

        let query = `${BASE_URL}posts/${userId}?pageSize=${pageSize}`;

        if (lastOffset) {
            query += `&lastOffset=${lastOffset}`;
        }

        if (post_type === "Repost") {
            query += `&post_type=Repost`;
        }

        const response = await axios.get(query, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}
export const likePost = async (postId: string) => {
    try {
        const token = await getToken()
        const response = await axios.post(BASE_URL + `posts/${postId}/likes`, {}, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const unLikePost = async (postId: string) => {
    try {
        const token = await getToken()
        const response = await axios.delete(BASE_URL + `posts/${postId}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const commentPost = async (postId: string, content: string) => {
    try {
        const token = await getToken()
        const response = await axios.post(BASE_URL + `posts/${postId}/replies`, {
            content: content
        }, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data
        } else {
            throw new Error(response.data)
        }
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const fetchComments = async (postId: string, pagesize: number = 10, offset: string | null = null) => {
    try {
        const token = await getToken()

        let quary: string = ""

        if (offset) {
            quary = BASE_URL + `posts/${postId}/replies?pageSize=${pagesize}&lastOffset=${offset}`
        }
        else {
            quary = BASE_URL + `posts/${postId}/replies?pageSize=${pagesize}`
        }
        const response = await axios.get(quary, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200)
            return response.data
        else
            throw new Error(response.data)
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const searchPosts = async ({
    pageSize = 10,
    lastOffset,
    searchTerm,
}: { pageSize: number, lastOffset?: string, searchTerm: string }) => {
    try {
        const token = await getToken()

        let quary: string = ""

        if (lastOffset) {
            quary = BASE_URL + `posts/full-text-search?searchTerm=${searchTerm}&pageSize=${pageSize}&lastOffset=${lastOffset}`
        }
        else {
            quary = BASE_URL + `posts/full-text-search?searchTerm=${searchTerm}&pageSize=${pageSize}`
        }
        const response = await axios.get(quary, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200)
            {
                return response.data
            }
        else
            throw new Error(response.data)
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}
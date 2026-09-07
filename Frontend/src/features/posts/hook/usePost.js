import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useContext, useEffect } from "react"
import { PostContext } from "../post.contex.jsx"

export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data.posts.reverse())
        } catch (error) {
            console.error("Failed to load feed:", error)
            setFeed([])
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    const handleLike = async (post) => {

        const data = await likePost(post)
        await handleGetFeed()

    }
    const handleUnLike = async (post) => {

        const data = await unLikePost(post)
        await handleGetFeed()

    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

}

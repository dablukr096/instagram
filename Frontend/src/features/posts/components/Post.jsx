import React from 'react'

const Post = ({ user, post, handleLike, handleUnLike }) => {
    const isLiked = post.isLiked

    return (
        <article className='post'>
            <div className='user'>
                {user?.profileImage && <img src={user.profileImage} alt='' />}
                <span>{user?.username}</span>
            </div>
            <img src={post.imgUrl} alt={post.caption || 'Post'} />
            <div className='icons'>
                <button
                    className={isLiked ? 'like' : ''}
                    onClick={() => isLiked ? handleUnLike(post._id) : handleLike(post._id)}
                    aria-label={isLiked ? 'Unlike post' : 'Like post'}
                >
                    <i className={isLiked ? 'ri-heart-fill' : 'ri-heart-line'} />
                </button>
            </div>
            {post.caption && <p>{post.caption}</p>}
        </article>
    )
}

export default Post

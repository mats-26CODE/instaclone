import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';


const Post = ({ username, caption, imageUrl }) => {
    return (
        <div className={"post"}>
            <div className={"post_header"}>
                {/* Header -> avatar + username */}
                <Avatar 
                    className={"post_avatar"}
                    alt="mat__ayo"
                    src="/static/images/avatar/1.jpg"
                />
                <h4>{username}</h4>
            </div>

            {/* image */} 
            <img 
                className={"post_image"} 
                src={imageUrl}
                alt="temple post image" 
            />

            {/* username and caption */}
            <h5 className={"post_text"}><strong>{username}</strong> {caption}</h5>
        </div>
    )
}

export default Post;

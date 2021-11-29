import useAxios from "axios-hooks";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { generate } from "shortid";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Comment = ({ description, user }) => {
    return (
        <div className="text-xs px-4 py-2 space-y-2 border-t border-gray-400 lg:text-sm">
            <h1 className="font-bold">@{user.username}</h1>
            <h2>{ description }</h2>
        </div>
    )
}

const AddComment = ({ postId, triggerUpdate }) => {
    const comm = useRef(null);
    const [emptyInput, setEmptyInput] = useState();
    const auth = useAuth();

    const [, createComment] = useAxios({
        url: `${process.env.REACT_APP_API}/post/comment/${postId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true });

    async function onSubmit(e) {
        e.preventDefault();

        if (comm?.current?.value === "") {
            alert('No puedes agregar un comentario vacio');
            return;
        }

        try {
            await createComment({ data: { description: comm?.current?.value } });
            await triggerUpdate();

            setEmptyInput('');
        } catch(err) {
            console.log(err.response);
            alert('error');
        }
    }

    return (
        <form className="w-full px-4 my-2" onSubmit={onSubmit}>
            <input ref={comm} 
                className="w-full rounded-lg px-2 py-1 border-2 border-primary text-sm" 
                type="text"
                value={emptyInput}
                placeholder="Presiona enter para comentar..."
                onChange={(e) => setEmptyInput(e.target.value)}
            />
        </form>
    )
}

const Post = ({ post }) => {
    const auth = useAuth();
    const [identity, setIdentity] = useState();
    const location = useLocation();

    const [internalPost, setInternalPost] = useState(post);
    const [showComments, setShowComments] = useState(false);
    const [isActive, setIsActive] = useState(internalPost.active);

    const [, update] = useAxios({
        url: `${process.env.REACT_APP_API}/post/one/${internalPost._id}`,
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true });

    const [, likePost] = useAxios({
        url: `${process.env.REACT_APP_API}/post/like/${internalPost._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true });

    const [, togglePost] = useAxios({
        url: `${process.env.REACT_APP_API}/post/toggle/${internalPost._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true });

    async function triggerUpdate(callback) {
        try {
            if (callback)
                await callback();

            let { data: updateData } = await update();
            setInternalPost(updateData);
        } catch(err) {
            if (location.pathname === "/my")
                alert('Post desactivado');
            else
                alert('error sad');
        }
    }

    useEffect(() => {
        async function getIdentity() {
            try {
                let res = await axios.get(`${process.env.REACT_APP_API}/auth/whoami`, {
                    headers: {
                        Authorization: `Bearer ${auth?.user?.token}`
                    }
                });
                setIdentity(res.data.username);
            } catch(err) {
                alert('Error');
            }
        }

        getIdentity();
    }, []);

    return (
        <div className="w-full rounded-lg bg-gray-300 flex flex-col mb-6 md:w-2/5 md:m-4 lg:w-1/4 relative">
            {
                location.pathname === "/my" && auth?.user?.role === "admin"
                ?
                <div 
                    className={`absolute top-0 right-0 p-2 space-x-1 flex items-center cursor-pointer
                    ${ isActive && 'text-red-800' }`}
                    onClick={() => { 
                        triggerUpdate(togglePost);
                        setIsActive(!isActive);
                    }}
                >
                    <Icon icon={faEye} />
                </div>
                :
                <div 
                    className={`absolute top-0 right-0 p-2 space-x-1 flex items-center cursor-pointer
                    ${ internalPost.likes.some(it => it.username === identity) && 'text-red-800' }`}
                    onClick={() => triggerUpdate(likePost)}
                >
                    <Icon icon={faHeart} />
                    <span className="text-xs">{internalPost.likes.length ?? 0}</span>
                </div>
            }
            <div className="bg-gray-400 rounded-t px-4 py-2 font-medium space-y-2">
                <h1 className="text-xs text-gray-800 lg:text-sm">@ { internalPost.user.username }</h1>
                <h2 className="text-sm lg:text-base">{ internalPost.title }</h2>
            </div>
            {
                internalPost.image && 
                <div className="w-full ">
                    <img className="h-40 w-full object-contain" src={internalPost.image} alt={internalPost.title} />
                </div>
            }
            <div className="px-4 py-2 text-sm lg:text-base">
                <p>{ internalPost.description }</p>
            </div>
            <div className="w-full bg-gray-400 text-center py-2 cursor-pointer select-none" onClick={() => setShowComments(!showComments)}>
                {
                    internalPost.comments.length > 0 && 
                        <span>
                            <Icon icon={faComment} /> Mostrar comentarios
                        </span>
                }
            </div>
            <div>
                {
                    (showComments) && internalPost.comments.map((it) => <Comment key={ generate() } description={it.description} user={it.user} />)
                }
                <AddComment postId={internalPost._id} triggerUpdate={triggerUpdate} />
            </div>
        </div>
    )
}

export default Post;

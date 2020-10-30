

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext } from "../providers/LikeProvider";








export default function Favorites(props) {

    const { singleUserProfile } = useContext(UserProfileContext)
    const { getLike, like, saveLike, deleteLike } = useContext(LikeContext)
    const { artPost, addLike, removeLike } = useContext(ArtPostContext)


    const [localLike, setLocalLike] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if (artPost.userProfileId == singleUserProfile.id && artPost.id != undefined) {
            getLike(sessionStorage.userProfileId, artPost.id)
        }

        localLike.PostId = artPost.id

    }, [singleUserProfile])

    const handleLike = (evt) => {

        addLike(artPost.id, artPost.likes)
        saveLike(localLike)
        props.setRefresh(2)
    }

    const handleRemoveLike = (evt) => {
        removeLike(artPost.id, artPost.likes)
        deleteLike(like.id)
        props.setRefresh(1)
    }


    return (
        <>

            {like.userProfileId == sessionStorage.userProfileId && like.postId == artPost.id ? <Button onClick={handleRemoveLike}>Dislike</Button> : <Button onClick={handleLike}>Like</Button>}<p>{artPost.likes}</p>
        </>
    )

}


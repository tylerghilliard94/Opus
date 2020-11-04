

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

            {like.userProfileId == sessionStorage.userProfileId && like.postId == artPost.id ? <Col className="LikeButton" sm={3}><Button onClick={handleRemoveLike}>Dislike</Button></Col> : <Col className="LikeButton" sm={3}><Button className="SelectButton" onClick={handleLike}>Like</Button></Col>}<Col className="LikeCounter" sm={1}><h5 className="TotalLikes">{artPost.likes}</h5></Col>
        </>
    )

}


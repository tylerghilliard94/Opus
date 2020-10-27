import React, { useContext, useEffect, useState } from "react";

import { NavLink, useParams } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";






export default function PostDetails() {
    const { getArtPost, artPost, addLike, removeLike } = useContext(ArtPostContext)
    const { singleUserProfile } = useContext(UserProfileContext)
    const { getLike, like, saveLike, deleteLike } = useContext(LikeContext)

    const [localLike, setLocalLike] = useState({
        UserProfileId: singleUserProfile.id,
        PostId: artPost.id
    });
    const [refresh, setRefresh] = useState(false);

    console.log(like)

    const { id } = useParams();
    useEffect(() => {

        getArtPost(id)

    }, [refresh])

    useEffect(() => {
        localLike.UserProfileId = singleUserProfile.id
        localLike.PostId = artPost.id
    }, [artPost, singleUserProfile])

    const handleLike = (evt) => {

        addLike(artPost.id, artPost.likes)
        saveLike(localLike)
        setRefresh(true)
    }

    const handleRemoveLike = (evt) => {
        removeLike(artPost.id, artPost.likes)
        deleteLike(like.id)
        setRefresh(false)
    }
    return (
        <>
            <Row sm={8}>
                <Col>
                    <Row><img class="postDetailsImg" src={artPost.image}></img></Row>
                    <Row><h2>{artPost.title}</h2></Row>
                    <Row><p>{artPost.description}</p></Row>
                    <Row>{like.userProfileId == singleUserProfile.id && like.postId == artPost.id ? <Button onClick={handleRemoveLike}>Dislike</Button> : <Button onClick={handleLike}>Like</Button>}<p>{artPost.likes}</p><Button>Favorite</Button></Row>
                    <Row><h3>Comments</h3> <Button>Add New Comment</Button></Row>
                </Col>

                <Col>
                    <Row><h2>{singleUserProfile.displayName}</h2></Row>
                    <Row><img class="userProfileImg" src={singleUserProfile.image}></img></Row>
                    <Row><p>{singleUserProfile.description}</p></Row>
                    <Row><Button>Follow</Button> <Button>Details</Button></Row>

                </Col>
            </Row>
        </>


    )

}

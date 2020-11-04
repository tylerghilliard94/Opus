import React, { useContext, useEffect, useState } from "react";

import { NavLink, useParams } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Following from "../Following/Following"
import Likes from "../Likes/Likes"
import Favorites from "../Favorites/Favorites"






export default function PostDetails() {
    const { getArtPost, artPost, addLike, removeLike } = useContext(ArtPostContext)
    const { singleUserProfile } = useContext(UserProfileContext)



    const [refresh, setRefresh] = useState(0);



    const { id } = useParams();
    useEffect(() => {

        getArtPost(id)

    }, [refresh])




    return (
        <>
            <Row sm={8}>
                <Col>
                    <Row><img class="postDetailsImg" src={artPost.image}></img></Row>
                    <Row><h2>{artPost.title}</h2></Row>
                    <Row><p>{artPost.description}</p></Row>
                    <Row><Likes setRefresh={setRefresh} /> <Favorites setRefresh={setRefresh} /></Row>
                    <Row><h3>Comments</h3> <Button>Add New Comment</Button></Row>
                </Col>

                <Col>
                    <Row><h2>{singleUserProfile.displayName}</h2></Row>
                    <Row><img class="userProfileImg" src={singleUserProfile.image}></img></Row>
                    <Row><p>{singleUserProfile.description}</p></Row>
                    <Row><Following setRefresh={setRefresh} /> <Button>Details</Button></Row>

                </Col>
            </Row>
        </>


    )

}

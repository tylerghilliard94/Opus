import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import ProfileFollowing from "../Following/ProfileFollowing"
import Likes from "../Likes/Likes"
import Favorites from "../Favorites/Favorites"
import CommentList from "../Comments/CommentList"
import { CategoryContext } from "../providers/CategoryProvider";
import { propTypes } from "react-resize-image";
import ArtPostList from "../ArtPost/ArtPostList"






export default function PostDetails() {
    const { getArtPost, artPost, addLike, removeLike, editArtPost, deleteArtPost, getAllArtPostsByUserId } = useContext(ArtPostContext)
    const { singleUserProfile, getUserProfileById } = useContext(UserProfileContext)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const history = useHistory();



    const [refresh, setRefresh] = useState(0);





    const { id } = useParams();

    useEffect(() => {

        if (singleUserProfile.id != undefined) {
            getAllArtPostsByUserId(singleUserProfile.id)
        }
    }, [singleUserProfile])

    useEffect(() => {

        getUserProfileById(id)

    }, [id])

    return (
        <>
            <Row sm={8}>

                <Col>
                    <Row><img class="userProfileImg" src={singleUserProfile.image}></img></Row>

                </Col>
                <Col>
                    <Row><h2>{singleUserProfile.displayName}</h2></Row>
                    <Row><h2>{singleUserProfile.fullName}</h2></Row>




                </Col>
                <Col>
                    {singleUserProfile.id == sessionStorage.userProfileId ? <Button>Edit</Button> : null}
                    <Row><p>{singleUserProfile.description}</p></Row>
                    {singleUserProfile.id != sessionStorage.userProfileId ? <ProfileFollowing setRefresh={setRefresh} refresh={refresh} /> : null}

                </Col>


            </Row>
            <Row>
                <ArtPostList />

            </Row>
        </>


    )

}

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
    const [isLoading, setIsLoading] = useState(false)


    const [refresh, setRefresh] = useState(0);




    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const { id } = useParams();

    useEffect(() => {

        if (singleUserProfile.id != undefined) {
            sleep(300).then(() => getAllArtPostsByUserId(singleUserProfile.id))
            sleep(800).then(() => setIsLoading(false))
        }
        setIsLoading(true)
    }, [singleUserProfile])

    useEffect(() => {

        getUserProfileById(id)

    }, [id])

    useEffect(() => {

        setRefresh(refresh + 1)

    }, [singleUserProfile])

    if (isLoading) {
        return null
    }
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
                    {singleUserProfile.id == sessionStorage.userProfileId ? <NavLink to={"user/edit"}><Button>Edit</Button></NavLink> : null}
                    <Row><p>{singleUserProfile.description}</p></Row>
                    {singleUserProfile.id != sessionStorage.userProfileId ? <ProfileFollowing setRefresh={setRefresh} refresh={refresh} /> : null}
                    {singleUserProfile.id == sessionStorage.userProfileId ? <NavLink to={"post/add"}><Button>Add Art Post</Button></NavLink> : null}
                </Col>


            </Row>
            <Row>
                <ArtPostList />

            </Row>
        </>


    )

}

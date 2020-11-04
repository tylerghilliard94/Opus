import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
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
import "./UserProfile.css"






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

        getUserProfileById(id)

    }, [id])

    useEffect(() => {

        setRefresh(refresh + 1)

    }, [singleUserProfile])

    useEffect(() => {

        if (singleUserProfile.id != undefined) {
            sleep(300).then(() => getAllArtPostsByUserId(singleUserProfile.id))
            sleep(800).then(() => setIsLoading(false))
        }
        setIsLoading(true)
    }, [singleUserProfile])



    console.log(singleUserProfile)

    if (isLoading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }
    return (
        <>
            <div className="UserProfileContainer">
                <Row sm={8}>

                    <Col className="UserProfileAvatar" sm={2}>
                        <Row><img class="userProfileImg " src={singleUserProfile.image}></img></Row>

                    </Col>
                    <Col sm={2}>
                        <Row><h2 className="UserProfileDisplayName">{singleUserProfile.displayName}</h2></Row>
                        <Row><h3 className="UserProfileFullName">{singleUserProfile.fullName}</h3></Row>
                        {singleUserProfile != undefined ? <Row><h5>{singleUserProfile.primaryFocus.name} Focused</h5></Row> : null}




                    </Col>
                    <Col sm={4}>

                        <Row><p className="UserProfileDescription">{singleUserProfile.description}</p></Row>
                    </Col>
                    <Col>
                        <Row className="UserProfileEditRow">
                            {singleUserProfile.id == sessionStorage.userProfileId ? <NavLink to={"user/edit"}><Button className="UserProfileEditButton">Edit</Button></NavLink> : null}

                            {singleUserProfile.id != sessionStorage.userProfileId ? <ProfileFollowing setRefresh={setRefresh} refresh={refresh} /> : null}
                        </Row>
                        <Row>
                            {singleUserProfile.id == sessionStorage.userProfileId ? <NavLink to={"post/add"}><Button className="UserProfileAddPostButton">Add Art Post</Button></NavLink> : null}
                        </Row>
                    </Col>


                </Row>
                <div class="wrapperProfile">
                    <div class="dividerProfile div-transparent div-arrow-down"></div>
                </div>
                <Row >
                    <Col className="ArtPostList">
                        <ArtPostList />
                    </Col>

                </Row>
            </div>
        </>


    )

}

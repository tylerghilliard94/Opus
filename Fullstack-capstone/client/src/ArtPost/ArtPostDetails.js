import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Following from "../Following/Following"
import Likes from "../Likes/Likes"
import Favorites from "../Favorites/Favorites"
import CommentList from "../Comments/CommentList"
import { CategoryContext } from "../providers/CategoryProvider";
import { propTypes } from "react-resize-image";






export default function PostDetails() {
    const { getArtPost, artPost, addLike, removeLike, editArtPost, deleteArtPost } = useContext(ArtPostContext)
    const { singleUserProfile } = useContext(UserProfileContext)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const history = useHistory();
    const [postEdit, setPostEdit] = useState(0);
    let [localArtPost, setLocalArtPost] = useState({ Id: artPost.id, Title: artPost.Title, Description: artPost.description, Image: artPost.image, CategoryId: parseInt(artPost.categoryId), ArtTypeId: parseInt(artPost.artTypeId) })
    const [imageName, setImageName] = useState();


    const [refresh, setRefresh] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    const { id } = useParams();
    useEffect(() => {

        if (refresh != -5000) {


            sleep(300).then(() => getArtPost(id))

            getAllCategories()
        }
        setIsLoading(true)
        if (refresh != 0) {
            setIsLoading(false)
        }




    }, [refresh])

    useEffect(() => {


        if (artPost.id != undefined) {
            localArtPost.Id = artPost.id
            localArtPost.Title = artPost.title
            localArtPost.Description = artPost.description
            localArtPost.Image = artPost.image
            localArtPost.CategoryId = artPost.categoryId
            localArtPost.ArtTypeId = artPost.artTypeId

        }







    }, [singleUserProfile])
    useEffect(() => {
        setIsLoading(false)
    }, [singleUserProfile])
    useEffect(() => {
        setIsLoading(true)
    }, [])

    const handleChange = (evt) => {
        let stateChange = { ...localArtPost }
        stateChange[evt.target.id] = evt.target.value
        setLocalArtPost(stateChange)
    }
    const handleOpenEdit = (evt) => {
        setPostEdit(1)
        setRefresh(-5000)

    }


    const handleCloseEdit = (evt) => {
        localArtPost.ArtTypeId = parseInt(localArtPost.ArtTypeId)
        localArtPost.CategoryId = parseInt(localArtPost.CategoryId)
        editArtPost(localArtPost)
        setRefresh(0)
        setPostEdit(0)


    }

    const handleDelete = (evt) => {
        deleteArtPost(evt.target.id)
        history.push("/explore")
    }
    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {

            localArtPost.image = resultEvent.info.secure_url
            setImageName(resultEvent.info.original_filename + `.${resultEvent.info.format}`)

        }
    }



    const showWidget = (event) => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "dgllrw1m3",
            uploadPreset: "kxr8ogeo",

        },
            (error, result) => { checkUploadResult(result) })

        widget.open()
    }
    if (isLoading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }
    if (postEdit == 1) {
        return (
            <>
                <div className="DetailsContainer">
                    <Row sm={8}>
                        <Col>
                            <Form >
                                <fieldset>

                                    <FormGroup>
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="Title" value={localArtPost.Title} type="text" onChange={handleChange} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="description">Description</Label>
                                        <textarea id="Description" defaultValue={localArtPost.Description} type="text" onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <Button onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="category">Category</Label>
                                        {categories != undefined ?
                                            <select
                                                className="editArtPost"
                                                onChange={handleChange}
                                                defaultValue={artPost.categoryId}
                                                id="CategoryId"

                                            >

                                                {categories.map(category => {

                                                    return <option key={category.id} value={category.id}>{category.name}</option>


                                                })}

                                            </select> : null
                                        }
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="artType">Art Type</Label>

                                        <select
                                            className="editPost"
                                            onChange={handleChange}
                                            defaultValue={artPost.artTypeId}
                                            id="ArtTypeId"

                                        >

                                            <option key={1} value={1}>2D</option>
                                            <option key={2} value={2}>3D</option>

                                        </select>

                                    </FormGroup>

                                    <FormGroup>
                                        <Button onClick={handleCloseEdit}>Save Edit</Button>
                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </Col>
                        <Col>
                            <Row><h2>{singleUserProfile.displayName}</h2></Row>
                            <Row><img class="userProfileImg" src={singleUserProfile.image}></img></Row>
                            <Row><p>{singleUserProfile.description}</p></Row>
                            <Row><Following setRefresh={setRefresh} /> <NavLink to={`/profile/${singleUserProfile.id}`}><Button>Details</Button></NavLink></Row>

                        </Col>
                    </Row>
                </div>
            </>
        )
    }
    else {

    }
    return (
        <>
            <div className="DetailsContainer">
                <Row sm={8}>
                    <Col sm={5} className="PostDetails">
                        <Row><img class="postDetailsImg" src={artPost.image}></img></Row>
                        <Row ><Col><h2 className="PostTitle">{artPost.title}</h2></Col></Row>
                        <Row><Col className="PostDesc"><p >{artPost.description}</p></Col></Row>
                        <Row><Col sm={2}><Likes setRefresh={setRefresh} /></Col>{sessionStorage.userProfileId == singleUserProfile.id ? <div><Col><Button id={artPost.id} onClick={handleOpenEdit}>Edit</Button></Col> <Col><Button id={artPost.id} onClick={handleDelete}>Delete</Button></Col> </div> : <Col><Favorites setRefresh={setRefresh} /></Col>}</Row>
                        <CommentList refresh={refresh} setRefresh={setRefresh} />

                    </Col>

                    <Col sm={2} className="ArtistDetails">
                        <Row><h2>{singleUserProfile.displayName}</h2></Row>
                        <Row><img class="userProfileImg" src={singleUserProfile.image}></img></Row>
                        <Row><p>{singleUserProfile.description}</p></Row>
                        <Row><Following setRefresh={setRefresh} /> <NavLink to={`/profile/${singleUserProfile.id}`}><Button>Details</Button></NavLink></Row>

                    </Col>

                </Row>
            </div>
        </>


    )

}

import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Following from "../Following/Following"
import Likes from "../Likes/Likes"
import Favorites from "../Favorites/Favorites"
import CommentList from "../Comments/CommentList"
import { CategoryContext } from "../providers/CategoryProvider";
import { propTypes } from "react-resize-image";






export default function ArtPostAdd() {

    const { saveArtPost } = useContext(ArtPostContext)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const history = useHistory();

    let [localArtPost, setLocalArtPost] = useState({ Title: "", Description: "", Image: "", CategoryId: 1, ArtTypeId: 1, UserProfileId: parseInt(sessionStorage.userProfileId) })
    const [imageName, setImageName] = useState();








    const { id } = useParams();
    useEffect(() => {

        getAllCategories()


    }, [])


    const handleChange = (evt) => {

        let stateChange = { ...localArtPost }
        stateChange[evt.target.id] = evt.target.value
        setLocalArtPost(stateChange)
    }
    const handleSave = (evt) => {

        localArtPost.CategoryId = parseInt(localArtPost.CategoryId)
        localArtPost.ArtTypeId = parseInt(localArtPost.ArtTypeId)
        saveArtPost(localArtPost)
        history.push(`/profile/${sessionStorage.userProfileId}`)

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
            uploadPreset: "kxr8ogeo"
        },
            (error, result) => { checkUploadResult(result) })

        widget.open()
    }
    console.log(categories)

    return (
        <>
            <div className="EditUserProfileContainer">
                <Row sm={8}>
                    <Card className="EditUserProfile">

                        <Col>
                            <h2 className="TitleAddForm">Add Post</h2>
                            <Form >
                                <fieldset>

                                    <FormGroup>
                                        <Row>
                                            <Label className="PostTitleLabel" htmlFor="title">Title</Label>
                                            <Input className="PostTitleEdit" id="Title" defaultValue={""} type="text" onChange={handleChange} />
                                        </Row>
                                    </FormGroup>

                                    <FormGroup>
                                        <Row>
                                            <Label className="PostDescriptionLabel PostLabel" htmlFor="description">Description</Label>
                                            <textarea className="PostDescriptionEdit" id="Description" defaultValue="" type="text" onChange={handleChange} />
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <div>
                                            <Button className="UploadPostPicture" onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
                                        </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="PostLabelDropdown" for="category">Category</Label>
                                        {categories != undefined ?
                                            <select
                                                className="PostCategory"
                                                onChange={handleChange}
                                                defaultValue={1}
                                                id="CategoryId"

                                            >

                                                {categories.map(category => {

                                                    return <option key={category.id} value={category.id}>{category.name}</option>


                                                })}

                                            </select> : null
                                        }
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="PostLabelDropdownArtType" for="artType">Art Type</Label>

                                        <select
                                            className="PostArtType"
                                            onChange={handleChange}
                                            defaultValue={1}
                                            id="ArtTypeId"

                                        >

                                            <option key={1} value={1}>2D</option>
                                            <option key={2} value={2}>3D</option>

                                        </select>

                                    </FormGroup>

                                    <FormGroup>
                                        <Row>

                                            <NavLink to={`/profile/${sessionStorage.userProfileId}`}><Button className="AddPostCancelButton">Cancel</Button></NavLink>


                                            <Button className="PostSaveEditButton" onClick={handleSave}>Save Post</Button>

                                        </Row>

                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </Col>
                    </Card>

                </Row>
            </div>

        </>
    )




}

import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
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
        debugger
        getAllCategories()


    }, [])


    const handleChange = (evt) => {

        let stateChange = { ...localArtPost }
        stateChange[evt.target.id] = evt.target.value
        setLocalArtPost(stateChange)
    }
    const handleSave = (evt) => {
        debugger
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
            <Row sm={8}>
                <Col>
                    <Form >
                        <fieldset>

                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input id="Title" defaultValue={""} type="text" onChange={handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <textarea id="Description" defaultValue="" type="text" onChange={handleChange} />
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
                                <Label for="artType">Art Type</Label>

                                <select
                                    className="editPost"
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
                                    <NavLink to={`/profile/${sessionStorage.userProfileId}`}><Button>Cancel</Button></NavLink>
                                    <Button onClick={handleSave}>Save Post</Button>

                                </Row>

                            </FormGroup>
                        </fieldset>
                    </Form>
                </Col>

            </Row>

        </>
    )




}

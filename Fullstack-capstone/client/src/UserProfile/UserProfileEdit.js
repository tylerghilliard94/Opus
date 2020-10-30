import React, { useContext, useEffect, useState } from "react";

import { NavLink, useHistory, useParams } from "react-router-dom";

import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

import { LikeContext, LikeProvider } from "../providers/LikeProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Following from "../Following/Following"
import Likes from "../Likes/Likes"
import Favorites from "../Favorites/Favorites"
import CommentList from "../Comments/CommentList"
import { CategoryContext } from "../providers/CategoryProvider";
import { propTypes } from "react-resize-image";
import { PrimaryFocusContext } from "../providers/PrimaryFocusProvider";






export default function UserProfileEdit() {

    const { singleUserProfile, editUserProfile, getUserProfileById, deleteUserProfile } = useContext(UserProfileContext)
    const { getAllPrimaryFoci, primaryFoci } = useContext(PrimaryFocusContext)
    const history = useHistory();

    let [localUser, setLocalUser] = useState({ Id: sessionStorage.userProfileId, FullName: singleUserProfile.fullName, Email: singleUserProfile, DisplayName: singleUserProfile.displayName, Description: singleUserProfile.description, Image: singleUserProfile.image, PrimaryFocusId: parseInt(singleUserProfile.PrimaryFocusId) })
    const [imageName, setImageName] = useState();









    useEffect(() => {




        getUserProfileById(sessionStorage.userProfileId)
        getAllPrimaryFoci()




    }, [])

    useEffect(() => {

        if (singleUserProfile.id != undefined) {
            localUser.Id = singleUserProfile.id
            localUser.FullName = singleUserProfile.fullName
            localUser.DisplayName = singleUserProfile.displayName
            localUser.Description = singleUserProfile.description
            localUser.Email = singleUserProfile.email
            localUser.Image = singleUserProfile.image
            localUser.PrimaryFocusId = singleUserProfile.primaryFocusId

        }

    }, [singleUserProfile])
    const handleChange = (evt) => {
        let stateChange = { ...localUser }
        stateChange[evt.target.id] = evt.target.value
        setLocalUser(stateChange)
    }
    const handleSaveEdit = (evt) => {

        editUserProfile(localUser)
        history.push(`/profile/${sessionStorage.userProfileId}`)

    }

    const handleDelete = (evt) => {
        deleteUserProfile(sessionStorage.userProfileId)
        sessionStorage.clear("userProfile")
        sessionStorage.clear("userProfileId")
        history.push("/login")
    }



    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {

            localUser.image = resultEvent.info.secure_url
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

    return (
        <>

            <Row sm={8}>
                <Col>
                    <Form >
                        <fieldset>

                            <FormGroup>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="FullName" value={localUser.FullName} type="text" onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input id="DisplayName" value={localUser.DisplayName} type="text" onChange={handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <textarea id="Description" defaultValue={localUser.Description} type="text" onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <Button onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="category">Primary Focus</Label>
                                {primaryFoci != undefined ?
                                    <select
                                        className="primaryFocus"
                                        onChange={handleChange}
                                        defaultValue={localUser.primaryFocusID}
                                        id="PrimaryFocusId"

                                    >
                                        {primaryFoci.map(primaryFocus => {

                                            return <option key={primaryFocus.id} value={primaryFocus.id}>{primaryFocus.name}</option>


                                        })}

                                    </select> : null
                                }
                            </FormGroup>



                            <FormGroup>
                                <Row>
                                    <NavLink to={`/profile/${sessionStorage.userProfileId}`}><Button>Cancel</Button></NavLink>
                                    <Button onClick={handleSaveEdit}>Save Edit</Button>
                                </Row>
                            </FormGroup>
                        </fieldset>
                    </Form>
                </Col>
                <Col>
                    <Button onClick={handleDelete}>Delete Profile</Button>
                </Col>
            </Row>



        </>
    )



}

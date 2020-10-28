

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col, CardTitle, CardBody, Card } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CommentContext } from "../providers/CommentProvider";









export default function Comment(props) {
    const { artPost } = useContext(ArtPostContext)
    let [comment, setComment] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id, Content: "" })
    const { editComment } = useContext(CommentContext)




    const handleChange = (evt) => {
        let stateChange = { ...comment }
        stateChange[evt.target.id] = evt.target.value
        setComment(stateChange)
    }
    const handleOpenEdit = (evt) => {
        props.setEdit(parseInt(evt.target.id))
    }

    const handleCloseEdit = (evt) => {
        debugger
        editComment(comment, props.edit)
        props.setEdit(parseInt(evt.target.id))
    }


    if (props.edit == props.comment.id) {
        return (
            <Card>
                <CardTitle>{props.comment.userProfile.displayName} Date Posted: {props.comment.postDate}</CardTitle>

                <CardBody ><textarea id="Content" onChange={handleChange}>{props.comment.content}</textarea></CardBody>

                <Button id={0} onClick={handleCloseEdit}>Save Edit</Button>
            </Card>
        )
    }
    else {
        return (
            <>
                <Card>
                    <CardTitle>{props.comment.userProfile.displayName} Date Posted: {props.comment.postDate}</CardTitle>

                    <CardBody >{props.comment.content}</CardBody>

                    {props.comment.userProfileId == sessionStorage.userProfileId ? <div><Button id={props.comment.id} onClick={handleOpenEdit}>Edit</Button> <Button>Delete</Button></div> : null}
                </Card>


            </>
        )
    }

}



import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col, CardTitle, CardBody, Card, CardSubtitle } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CommentContext } from "../providers/CommentProvider";









export default function Comment(props) {
    const { artPost } = useContext(ArtPostContext)
    let [comment, setComment] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id, Content: props.comment.content })
    const { editComment, deleteComment } = useContext(CommentContext)




    const handleChange = (evt) => {
        let stateChange = { ...comment }
        stateChange[evt.target.id] = evt.target.value
        setComment(stateChange)
    }
    const handleOpenEdit = (evt) => {
        props.setEdit(parseInt(evt.target.id))

    }

    const handleDelete = (evt) => {

        deleteComment(evt.target.id)
        props.setDeleteRefresh(props.deleteRefresh + 1)
    }

    const handleCloseEdit = (evt) => {

        editComment(comment, props.edit)
        props.setEdit(0)
        props.setEditRefresh(props.editRefresh + 1)
    }


    if (props.edit == props.comment.id) {
        return (
            <>
                <div class="wrapper">
                    <div class="divider div-transparent"></div>
                </div>
                <Card className="CommentEdit">
                    <Row>
                        <CardTitle className="CommentDisplayName">{props.comment.userProfile.displayName}</CardTitle>


                    </Row>

                    <CardBody ><textarea className="CommentEditContent" id="Content" onChange={handleChange}>{props.comment.content}</textarea></CardBody>
                    <CardTitle className="CommentDate"> {props.comment.commentDate}</CardTitle>
                    <Button id={0} onClick={handleCloseEdit}>Save Edit</Button>
                </Card>
            </>
        )
    }
    else {
        return (

            <>
                <div class="wrapper">
                    <div class="divider div-transparent"></div>
                </div>
                <Card className="Comment">
                    <CardTitle className="CommentDisplayName">{props.comment.userProfile.displayName}</CardTitle>

                    <CardBody >{props.comment.content}</CardBody>
                    <CardTitle className="CommentDate"> {props.comment.commentDate}</CardTitle>

                    {props.comment.userProfileId == sessionStorage.userProfileId ? <div><Button id={props.comment.id} onClick={handleOpenEdit}>Edit</Button> <Button id={props.comment.id} onClick={handleDelete}>Delete</Button></div> : null}
                </Card>



            </>
        )
    }

}




import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment"


export default function ClassList(props) {
    const { singleUserProfile } = useContext(UserProfileContext)
    const { artPost } = useContext(ArtPostContext)
    const { getAllComments, saveComment, comments } = useContext(CommentContext)

    let [comment, setComment] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id, Content: "" })
    const [edit, setEdit] = useState(0);

    useEffect(() => {
        if (artPost.id != undefined) {


            getAllComments(artPost.id);
            comment.PostId = artPost.id;
        }
    }, [artPost, edit])

    const handleChange = (evt) => {
        let stateChange = { ...comment }
        stateChange[evt.target.id] = evt.target.value
        setComment(stateChange)
    }

    const handleSaveComment = () => {
        saveComment(comment)
        props.setRefresh(props.refresh + 7)

        document.querySelector("#Content").value = "";

    }

    console.log(comments.length)

    return (
        <>

            <Row><h3>Comments</h3> </Row>
            <input id="Content" onChange={handleChange}></input>
            <Button onClick={handleSaveComment}>Add New Comment</Button>
            {comments.length != 0 ? comments.map(artPostComment => (

                <Comment key={artPostComment.id} edit={edit} setEdit={setEdit} comment={artPostComment} setRefresh={props.setRefresh} />
            )) : null}

        </>
    )

}


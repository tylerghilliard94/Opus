


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

    let [comment, setComment] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: parseInt(artPost.id), Content: "" })
    const [edit, setEdit] = useState(-1);
    const [deleteRefresh, setDeleteRefresh] = useState(-1);
    const [addRefresh, setAddRefresh] = useState(-1);
    const [editRefresh, setEditRefresh] = useState(-1);

    useEffect(() => {
        if (artPost.id != undefined) {


            getAllComments(artPost.id);
            comment.PostId = artPost.id;
        }
    }, [artPost, deleteRefresh, addRefresh, editRefresh])

    const handleChange = (evt) => {
        let stateChange = { ...comment }
        stateChange[evt.target.id] = evt.target.value
        setComment(stateChange)
    }

    const handleSaveComment = () => {
        saveComment(comment)
        setAddRefresh(addRefresh + 1)

        document.querySelector("#Content").value = "";

    }

    console.log(edit)

    return (
        <>

            <Row><h3>Comments</h3> </Row>
            <input id="Content" onChange={handleChange}></input>
            <Button onClick={handleSaveComment}>Add New Comment</Button>
            {comments.length != 0 ? comments.map(artPostComment => (

                <Comment key={artPostComment.id} edit={edit} setEdit={setEdit} setEditRefresh={setEditRefresh} editRefresh={editRefresh} comment={artPostComment} setDeleteRefresh={setDeleteRefresh} deleteRefresh={deleteRefresh} setRefresh={props.setRefresh} refresh={props.refresh} />
            )) : null}

        </>
    )

}


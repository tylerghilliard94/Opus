


import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment"
import CommentAdd from "./CommentAdd"
import "./Comments.css"


export default function CommentList(props) {
    const { singleUserProfile } = useContext(UserProfileContext)
    const { artPost } = useContext(ArtPostContext)
    const { getAllComments, saveComment, comments } = useContext(CommentContext)


    const [edit, setEdit] = useState(-1);
    const [deleteRefresh, setDeleteRefresh] = useState(-1);
    const [addRefresh, setAddRefresh] = useState(-1);
    const [editRefresh, setEditRefresh] = useState(-1);
    const [isLoading, setIsLoading] = useState(false)


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {


        if (artPost.id != undefined) {



            sleep(300).then(() => getAllComments(artPost.id));

        }


    }, [artPost, deleteRefresh, addRefresh, editRefresh])







    return (
        <>
            <div className="CommentContainer">
                <CommentAdd setAddRefresh={setAddRefresh} addRefresh={addRefresh} />

                <Col className="CommentList">
                    {comments.length != 0 ? comments.map(artPostComment => (

                        <Comment key={artPostComment.id} edit={edit} setEdit={setEdit} setEditRefresh={setEditRefresh} editRefresh={editRefresh} comment={artPostComment} setDeleteRefresh={setDeleteRefresh} deleteRefresh={deleteRefresh} setRefresh={props.setRefresh} refresh={props.refresh} />
                    )) : null}
                </Col>
            </div>

        </>
    )

}


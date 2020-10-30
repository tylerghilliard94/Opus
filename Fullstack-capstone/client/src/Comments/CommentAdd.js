

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col, CardTitle, CardBody, Card, Input } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CommentContext } from "../providers/CommentProvider";









export default function CommentAdd(props) {
    const { artPost } = useContext(ArtPostContext)
    let [comment, setComment] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id, Content: "" })

    const { getAllComments, saveComment, comments } = useContext(CommentContext)


    useEffect(() => {
        document.querySelector("#Content").value = "";
        comment.Content = ""
    }, [comments])

    const handleChange = (evt) => {
        let stateChange = { ...comment }
        stateChange[evt.target.id] = evt.target.value
        setComment(stateChange)
    }

    const handleSaveComment = () => {
        comment.PostId = parseInt(artPost.id)
        saveComment(comment)

        props.setAddRefresh(props.addRefresh + 1)







    }


    return (
        <>
            <Row><h3>Comments</h3> </Row>
            <Input required id="Content" defaultValue="" onChange={handleChange}></Input>
            <Button onClick={handleSaveComment}>Add New Comment</Button>
        </>
    )


}



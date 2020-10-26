import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPost from "./ArtPost"






export default function ArtPostList() {


    const { artPosts } = useContext(ArtPostContext);






    return (
        <>
            <Row sm={2}>
                {artPosts.map(post => {
                    return <ArtPost post={post} />
                })}
            </Row>
        </>

    )

}

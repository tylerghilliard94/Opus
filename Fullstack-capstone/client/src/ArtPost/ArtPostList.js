import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPost from "./ArtPost"






export default function ArtPostList() {


    const { artPosts } = useContext(ArtPostContext);








    return (
        <>
            <div className="ArtContainer">
                <Row>
                    {artPosts.length != 0 ? artPosts.map(post => {
                        return <ArtPost post={post} />
                    }) : null}
                </Row>
            </div>
        </>

    )

}

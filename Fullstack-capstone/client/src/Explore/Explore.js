import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPostList from "../ArtPost/ArtPostList"
import CategoryList from "../Categories/CategoryList"





export default function Explore() {
    const { getAllArtPosts, artPosts } = useContext(ArtPostContext)
    const { latestSwitch, setLatestSwitch } = useState(false)

    useEffect(() => [
        getAllArtPosts()
    ], [])
    const handleLatest = () => {
        setLatestSwitch(true)
        getAllArtPosts()
    }
    return (
        <>
            <Row>
                <Col sm={4}>

                    <CategoryList />
                </Col>
                <Col>
                    <Row>
                        {latestSwitch == false ?
                            <Button onClick={handleLatest}>
                                Latest
            </Button> : <Button>
                                Latest
            </Button>}

                        <Button>
                            Trending
            </Button>
                        <Button>
                            Following
            </Button>
                        <Button>
                            Favorites
            </Button>
                    </Row>

                    <ArtPostList />

                </Col>
            </Row>
        </>


    )

}

import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col, Spinner } from "reactstrap";

import HomeCarousel from "./Carousel"

import Hello from "../Hello"
import { FollowingContext } from "../providers/FollowingProvider";





export default function Home() {
    const { getFollowing, following } = useContext(FollowingContext)
    const [isLoading, setIsLoading] = useState(false)
    const [counter, SetCounter] = useState(0)
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {

        if (counter == 0) {
            setIsLoading(true)
            SetCounter(1)
        }
        else {
            sleep(600).then(() => setIsLoading(false))
        }

    }, [following])
    if (isLoading) {
        return <div className="HomeContainer"><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner></div>
    }
    return (
        <>
            <div className="HomeContainer">
                <Row>
                    <HomeCarousel />
                    <Col>
                        <Row className="HelloRow">
                            <Hello />
                        </Row>
                        <Row className="HomeExploreRow">
                            <NavLink to="explore"><Button className="ExploreButton"><h1>Explore</h1></Button></NavLink>
                        </Row>

                        <h2 className="RecommendedPosts"> 	&larr; Recommended Posts Just for You!</h2>
                    </Col>
                </Row>
            </div>
        </>
    )

}

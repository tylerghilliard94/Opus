import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPostList from "../ArtPost/ArtPostList"
import CategoryList from "../Categories/CategoryList"





export default function Explore() {
    const { getAllArtPosts, artPosts, searchArtPosts } = useContext(ArtPostContext)
    const [latestSwitch, setLatestSwitch] = useState(false)
    const [trendingSwitch, setTrendingSwitch] = useState(true)
    const [artType, setArtType] = useState(0);
    const [category, setCategory] = useState(0);

    const search = () => {

        searchArtPosts(category, artType, latestSwitch, trendingSwitch)
    }
    useEffect(() => {

        search()
    }, [category, artType, latestSwitch])

    const handleLatest = () => {

        setLatestSwitch(true)
        setTrendingSwitch(false)

    }
    const handleTrending = () => {
        setTrendingSwitch(true)
        setLatestSwitch(false)

    }
    return (
        <>
            <Row>
                <Col sm={2}>

                    <CategoryList latestSwitch={latestSwitch} trendingSwitch={trendingSwitch} category={category} artType={artType} setCategory={setCategory} setArtType={setArtType} search={search} />
                </Col>
                <Col>
                    <Row>

                        {trendingSwitch == false ?
                            <Button onClick={handleTrending}>
                                Trending
            </Button> : <Button color="primary" >
                                Trending
            </Button>}
                        {latestSwitch == false ?
                            <Button onClick={handleLatest}>
                                Latest
            </Button> : <Button color="primary" >
                                Latest
            </Button>}


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

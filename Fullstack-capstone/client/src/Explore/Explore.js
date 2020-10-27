import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPostList from "../ArtPost/ArtPostList"
import CategoryList from "../Categories/CategoryList"
import { FollowingContext } from "../providers/FollowingProvider";





export default function Explore() {
    const { getAllArtPosts, artPosts, searchArtPosts } = useContext(ArtPostContext)
    const { following, getFollowing } = useContext(FollowingContext)
    const [latestSwitch, setLatestSwitch] = useState(false)
    const [trendingSwitch, setTrendingSwitch] = useState(true)
    const [followingSwitch, setFollowingSwitch] = useState(false)
    const [artType, setArtType] = useState(0);
    const [category, setCategory] = useState(0);

    const search = () => {

        searchArtPosts(sessionStorage.userProfileId, category, artType, latestSwitch, trendingSwitch, followingSwitch)
    }
    useEffect(() => {
        getFollowing(sessionStorage.userProfileId)
        search()
    }, [category, artType, latestSwitch, followingSwitch])

    const handleLatest = () => {

        setLatestSwitch(true)
        setTrendingSwitch(false)
        setFollowingSwitch(false)

    }
    const handleTrending = () => {
        setTrendingSwitch(true)
        setLatestSwitch(false)
        setFollowingSwitch(false)

    }
    console.log(following)
    const handleFollowing = () => {
        setFollowingSwitch(true)
        setLatestSwitch(false)
        setTrendingSwitch(false)

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


                        {following.length == 0 ? null : followingSwitch == false ?
                            <Button onClick={handleFollowing}>
                                Following
            </Button> : <Button color="primary" >
                                Following
            </Button>}
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

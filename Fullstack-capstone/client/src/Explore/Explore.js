import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import ArtPostList from "../ArtPost/ArtPostList"
import CategoryList from "../Categories/CategoryList"
import { FollowingContext } from "../providers/FollowingProvider";
import { FavoriteContext } from "../providers/FavoriteProvider";





export default function Explore() {
    const { getAllArtPosts, artPosts, searchArtPosts } = useContext(ArtPostContext)
    const { following, getFollowing } = useContext(FollowingContext)
    const { favorites, getFavorites } = useContext(FavoriteContext)
    const [latestSwitch, setLatestSwitch] = useState(false)
    const [trendingSwitch, setTrendingSwitch] = useState(true)
    const [followingSwitch, setFollowingSwitch] = useState(false)
    const [favoriteSwitch, setFavoriteSwitch] = useState(false)
    const [artType, setArtType] = useState(0);
    const [category, setCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const search = () => {

        searchArtPosts(sessionStorage.userProfileId, category, artType, latestSwitch, trendingSwitch, followingSwitch, favoriteSwitch)
    }
    useEffect(() => {

        getFollowing(sessionStorage.userProfileId)
        getFavorites(sessionStorage.userProfileId)
        search()
        setIsLoading(true)
    }, [category, artType, latestSwitch, trendingSwitch, followingSwitch, favoriteSwitch])

    useEffect(() => {
        sleep(400).then(() => setIsLoading(false))
    }, [artPosts, following])
    const handleLatest = () => {
        setFavoriteSwitch(false)
        setLatestSwitch(true)
        setTrendingSwitch(false)
        setFollowingSwitch(false)

    }
    const handleTrending = () => {
        setFavoriteSwitch(false)
        setTrendingSwitch(true)
        setLatestSwitch(false)
        setFollowingSwitch(false)

    }

    const handleFollowing = () => {
        setFavoriteSwitch(false)
        setFollowingSwitch(true)
        setLatestSwitch(false)
        setTrendingSwitch(false)

    }

    const handleFavorites = () => {
        setFavoriteSwitch(true)
        setFollowingSwitch(false)
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
                        {favorites.length == 0 ? null : favoriteSwitch == false ?
                            <Button onClick={handleFavorites}>
                                Favorites
            </Button> : <Button color="primary" >
                                Favorites
            </Button>}
                    </Row>
                    {isLoading ? null : <ArtPostList />}


                </Col>
            </Row>
        </>


    )

}

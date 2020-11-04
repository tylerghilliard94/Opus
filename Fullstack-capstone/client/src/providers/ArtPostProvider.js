import React, { useState, createContext, useContext } from "react";
import { LikeContext } from "./LikeProvider";



import { UserProfileContext } from "./UserProfileProvider";

export const ArtPostContext = createContext();

export function ArtPostProvider(props) {



    const [artPosts, setArtPosts] = useState([]);

    const [artPost, setArtPost] = useState({ UserProfile: {}, Category: {}, ArtType: {} });



    const { getToken, getUserProfileById } = useContext(UserProfileContext);
    const { getLike } = useContext(LikeContext);

    const getAllArtPosts = () => {
        return getToken().then((token) =>
            fetch("/api/artpost", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setArtPosts))
    };
    const getAllRecommendedArtPosts = (id) => {
        return getToken().then((token) =>
            fetch(`/api/artpost/recommended/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then((resp) => {

                    if (resp.length == 0) {

                    }
                    else {
                        setArtPosts(resp)
                    }
                }))
    };

    const getAllArtPostsByUserId = (id) => {
        return getToken().then((token) =>
            fetch(`/api/artpost/user/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setArtPosts))
    };

    const getArtPost = (id) => {

        return getToken().then((token) =>
            fetch(`/api/artpost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then((resp) => {

                getUserProfileById(resp.userProfileId)

                setArtPost(resp)
            }))
    };


    const searchArtPosts = (userId, categoryCriterion, artTypeCriterion, latestSwitch, trendingSwitch, followingSwitch, favoriteSwitch) => {

        return getToken().then((token) =>
            fetch(`/api/artpost/search?UserId=${userId}&CategoryCriterion=${categoryCriterion}&ArtTypeCriterion=${artTypeCriterion}&LatestSwitch=${latestSwitch}&TrendingSwitch=${trendingSwitch}&FollowingSwitch=${followingSwitch}&FavSwitch=${favoriteSwitch}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(resp => resp.json())
                .then(setArtPosts))
    };

    const saveArtPost = (artPost) => {
        return getToken().then((token) =>
            fetch(`/api/artpost`, {
                method: "Post",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(artPost)
            }))
    };

    const editArtPost = (artPost) => {

        return getToken().then((token) =>
            fetch(`/api/artpost`, {
                method: "PUT",
                headers: {

                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(artPost)
            }))
    };

    const deleteArtPost = (id) => {

        return getToken().then((token) =>
            fetch(`/api/artpost/delete/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };

    const addLike = (id, likes) => {

        return getToken().then((token) =>
            fetch(`/api/artpost/addLike/${id}/${likes}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }))
    };
    const removeLike = (id, likes) => {
        return getToken().then((token) =>
            fetch(`/api/artpost/removeLike/${id}/${likes}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }


            }))
    };


    return (
        <ArtPostContext.Provider value={{ getToken, artPost, artPosts, getAllArtPosts, getArtPost, searchArtPosts, saveArtPost, editArtPost, deleteArtPost, addLike, removeLike, getAllArtPostsByUserId, getAllRecommendedArtPosts }}>
            {props.children}
        </ArtPostContext.Provider>
    );
}




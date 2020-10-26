import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const ArtPostContext = createContext();

export function ArtPostProvider(props) {



    const [artPosts, setArtPosts] = useState([]);

    const [artPost, setArtPost] = useState({ UserProfile: {}, Category: {}, ArtType: {} });


    const { getToken } = useContext(UserProfileContext);

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

    const getArtPost = (id) => {
        return getToken().then((token) =>
            fetch(`/api/artpost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setArtPost))
    };


    const searchArtPosts = (categoryCriterion, artTypeCriterion) => {
        return getToken().then((token) =>
            fetch(`/api/artpost/search?CategoryCriterion=${categoryCriterion}&ArtTypeCriterion=${artTypeCriterion}`, {
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(artPost)
            }))
    };

    const editArtPost = (artPost) => {
        return getToken().then((token) =>
            fetch(`/api/artpost`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
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



    return (
        <ArtPostContext.Provider value={{ getToken, artPost, artPosts, getAllArtPosts, getArtPost, searchArtPosts, saveArtPost, editArtPost, deleteArtPost }}>
            {props.children}
        </ArtPostContext.Provider>
    );
}




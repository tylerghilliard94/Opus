import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const FavoriteContext = createContext();

export function FavoriteProvider(props) {





    const [favorite, setFavorite] = useState({});
    const [favorites, setFavorites] = useState([]);


    const { getToken } = useContext(UserProfileContext);



    const getFavorite = (userProfileId, postId) => {

        return getToken().then((token) =>
            fetch(`/api/favorites/${userProfileId}/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setFavorite))
    };

    const getFavorites = (userProfileId) => {

        return getToken().then((token) =>
            fetch(`/api/favorites/${userProfileId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setFavorites))
    };


    const saveFavorite = (like) => {

        return getToken().then((token) =>
            fetch(`/api/favorites`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(like)
            }))
    };


    const deleteFavorite = (id) => {
        return getToken().then((token) =>
            fetch(`/api/favorites/delete/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <FavoriteContext.Provider value={{ getToken, favorite, favorites, getFavorite, getFavorites, saveFavorite, deleteFavorite }}>
            {props.children}
        </FavoriteContext.Provider>
    );
}




import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const LikeContext = createContext();

export function LikeProvider(props) {





    const [like, setLike] = useState({});


    const { getToken } = useContext(UserProfileContext);



    const getLike = (userProfileId, postId) => {
        return getToken().then((token) =>
            fetch(`/api/likes/${userProfileId}/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setLike))
    };

    const saveLike = (like) => {

        return getToken().then((token) =>
            fetch(`/api/likes`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(like)
            }))
    };


    const deleteLike = (id) => {
        return getToken().then((token) =>
            fetch(`/api/likes/delete/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <LikeContext.Provider value={{ getToken, like, setLike, saveLike, deleteLike, getLike }}>
            {props.children}
        </LikeContext.Provider>
    );
}




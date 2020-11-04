import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const FollowingContext = createContext();

export function FollowingProvider(props) {





    const [following, setFollowing] = useState([]);
    const [follow, setFollow] = useState({});


    const { getToken } = useContext(UserProfileContext);



    const getFollowing = (subscriberId) => {

        return getToken().then((token) =>
            fetch(`/api/following/${subscriberId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setFollowing))
    };

    const getFollow = (subscriberId, subscribedToId) => {

        return getToken().then((token) =>
            fetch(`/api/following/${subscriberId}/${subscribedToId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setFollow))
    };

    const saveFollow = (like) => {

        return getToken().then((token) =>
            fetch(`/api/following`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(like)
            }))
    };


    const deleteFollow = (id) => {
        return getToken().then((token) =>
            fetch(`/api/following/delete/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <FollowingContext.Provider value={{ getToken, following, follow, saveFollow, deleteFollow, getFollowing, getFollow }}>
            {props.children}
        </FollowingContext.Provider>
    );
}




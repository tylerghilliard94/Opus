import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export function CommentProvider(props) {



    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState({});


    const { getToken } = useContext(UserProfileContext);

    const getAllComments = (id) => {

        return getToken().then((token) =>
            fetch(`/api/comments/all/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments))
    };

    const getComment = (id) => {
        return getToken().then((token) =>
            fetch(`/api/comments/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setComment))
    };

    const saveComment = (comment) => {

        return getToken().then((token) =>
            fetch(`/api/comments`, {
                method: "Post",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment)
            }))
    };

    const editComment = (comment, id) => {
        return getToken().then((token) =>
            fetch(`/api/comments/${id}`, {
                method: "PUT",
                headers: {

                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }))
    };

    const deleteComment = (id) => {
        return getToken().then((token) =>
            fetch(`/api/comments/delete/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };





    return (
        <CommentContext.Provider value={{ getToken, comment, comments, getAllComments, getComment, saveComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}
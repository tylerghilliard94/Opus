

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { FavoriteContext } from "../providers/FavoriteProvider";







export default function Favorites(props) {

    const { singleUserProfile } = useContext(UserProfileContext)
    const { artPost } = useContext(ArtPostContext)
    const { favorite, getFavorite, saveFavorite, deleteFavorite } = useContext(FavoriteContext)

    const [localFavorite, setLocalFavorite] = useState({ UserProfileId: parseInt(sessionStorage.userProfileId), PostId: artPost.id })

    useEffect(() => {
        if (artPost.userProfileId == singleUserProfile.id && artPost.id != undefined) {
            getFavorite(sessionStorage.userProfileId, artPost.id)
        }
        localFavorite.PostId = artPost.id
    }, [singleUserProfile])

    const handleFavorite = () => {
        saveFavorite(localFavorite)
        props.setRefresh(6)
    }

    const handleUnFavorite = () => {
        deleteFavorite(favorite.id)
        props.setRefresh(5)

    }



    return (
        <>

            {artPost.userProfileId == sessionStorage.userProfileId
                ? null :
                favorite.userProfileId == sessionStorage.userProfileId && favorite.postId == artPost.id
                    ? <Button onClick={handleUnFavorite}>Remove Favorite</Button>
                    : <Button className="SelectButton FavoriteButton" onClick={handleFavorite}>Favorite</Button>}
        </>
    )

}




import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { FollowingContext } from "../providers/FollowingProvider";







export default function ProfileFollowing(props) {

    const { singleUserProfile } = useContext(UserProfileContext)
    const { artPost } = useContext(ArtPostContext)
    const { follow, getFollow, saveFollow, deleteFollow } = useContext(FollowingContext)

    const [localFollow, setLocalFollow] = useState({ SubscriberId: parseInt(sessionStorage.userProfileId), SubscribedToId: singleUserProfile.id })

    useEffect(() => {

        if (singleUserProfile.id != undefined) {
            getFollow(sessionStorage.userProfileId, singleUserProfile.id)
        }
        localFollow.SubscribedToId = singleUserProfile.id
    }, [singleUserProfile, props.refresh])

    const handleFollow = () => {
        saveFollow(localFollow)
        props.setRefresh(4)
    }

    const handleUnFollow = () => {
        deleteFollow(follow.id)
        props.setRefresh(3)

    }



    return (
        <>

            {artPost.userProfileId == sessionStorage.userProfileId
                ? null :
                follow.subscriberId == sessionStorage.userProfileId && follow.subscribedToId == singleUserProfile.id
                    ? <Button onClick={handleUnFollow}>UnFollow</Button>
                    : <Button onClick={handleFollow}>Follow</Button>}
        </>
    )

}


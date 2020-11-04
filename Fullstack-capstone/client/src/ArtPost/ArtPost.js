

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'







export default function ArtPost(props) {









    return (

        <Link to={`/details/${props.post.id}`}><img style={{
            flex: 1,
            width: 200,
            height: 200,
            resizeMode: 'contain'
        }} src={props.post.image} alt={props.post.description} /></Link>

    )

}

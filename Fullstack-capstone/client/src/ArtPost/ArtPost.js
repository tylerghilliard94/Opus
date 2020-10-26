

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'







export default function ArtPost(props) {









    return (

        <Link to={`artpost/${props.post.id}`}><img style={{
            flex: 1,
            width: 150,
            height: 150,
            resizeMode: 'contain'
        }} src={props.post.image} alt={props.post.description} /></Link>

    )

}

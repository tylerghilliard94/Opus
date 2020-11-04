

import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";

import ResizeImage from 'react-resize-image'
import "./ArtPost.css"







export default function ArtPost(props) {









    return (

        <div class="view view-first">
            <Link to={`/details/${props.post.id}`}><img style={{
                flex: 1,
                width: 200,
                height: 200,
                resizeMode: 'contain'
            }} src={props.post.image} alt={props.post.description} />
                <Link to={`/details/${props.post.id}`}></Link> <div class="mask">

                    <h2>{props.post.title}</h2>
                    <p>{props.post.description}</p>
                    <a to={`/details/${props.post.id}`} class="info">Read More</a>  </div></Link>
        </div>

    )

}

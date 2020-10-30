import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button } from "reactstrap";

import HomeCarousel from "./Carousel"





export default function Home() {



    return (
        <>

            <NavLink to="explore"><Button>Explore</Button></NavLink>
            <HomeCarousel />
        </>
    )

}

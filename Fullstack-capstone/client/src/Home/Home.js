import React, { useContext, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { Button } from "reactstrap";





export default function Home() {
    return (

        <NavLink to="explore"><Button>Explore</Button></NavLink>
    )

}

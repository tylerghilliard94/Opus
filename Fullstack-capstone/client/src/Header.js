import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout, activeUser, userTypeId } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div>
        <Navbar className="Navbar" color="dark" dark expand="md">
          <NavbarBrand className="HeaderLogoTag" tag={RRNavLink} to="/"><img className="HeaderLogo" src="https://res.cloudinary.com/dgllrw1m3/image/upload/v1604287659/Opus%20Logo%20color%20fix.png"></img>Opus</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              { /* When isLoggedIn === true, we will render the Home link */}





            </Nav>

            <Nav navbar>
              {isLoggedIn &&
                <NavItem className="ExploreTag">
                  <NavLink tag={RRNavLink} to={`/explore`}>Explore</NavLink>
                </NavItem>
              }

              {isLoggedIn &&
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/profile/${sessionStorage.userProfileId}`}>Profile</NavLink>
                </NavItem>
              }
              {isLoggedIn &&
                <>
                  <NavItem>
                    <a aria-current="page" className="nav-link"
                      style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                  </NavItem>
                </>
              }
              {!isLoggedIn &&
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                  </NavItem>
                </>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );

}

import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const PrimaryFocusContext = createContext();

export function PrimaryFocusProvider(props) {



    const [primaryFoci, setPrimaryFoci] = useState([]);

    const [primaryFocus, setPrimaryFocus] = useState([]);


    const { getToken } = useContext(UserProfileContext);

    const getAllPrimaryFoci = () =>

        fetch("/api/primaryfocus", {
            method: "GET",

        }).then(resp => resp.json())
            .then(setPrimaryFoci);

    const getPrimaryFocus = (id) =>
        fetch(`/api/primaryfocus/${id}`, {
            method: "GET",

        }).then(resp => resp.json()).then(setPrimaryFocus);



    return (
        <PrimaryFocusContext.Provider value={{ getToken, primaryFoci, primaryFocus, getAllPrimaryFoci, getPrimaryFocus }}>
            {props.children}
        </PrimaryFocusContext.Provider>
    );
}




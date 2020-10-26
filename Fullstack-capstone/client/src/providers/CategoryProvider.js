import React, { useState, createContext, useContext } from "react";



import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export function CategoryProvider(props) {



    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState({});


    const { getToken } = useContext(UserProfileContext);

    const getAllCategories = () => {
        return getToken().then((token) =>
            fetch("/api/categories", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories))
    };

    const getCategory = (id) => {
        return getToken().then((token) =>
            fetch(`/api/categories/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setCategory))
    };






    return (
        <CategoryContext.Provider value={{ getToken, category, categories, getAllCategories, getCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}




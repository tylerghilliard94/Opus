import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CategoryContext } from "../providers/CategoryProvider";





export default function CategoryList() {

    const { getAllCategories, categories } = useContext(CategoryContext);
    const { searchArtPosts } = useContext(ArtPostContext);
    const [artType, setArtType] = useState(0);
    const [category, setCategory] = useState(0);
    useEffect(() => {
        getAllCategories()
    }, [])
    useEffect(() => {

        search();
    }, [category, artType])
    const search = () => {
        searchArtPosts(category, artType)
    }
    const handleCategory = (evt) => {
        setCategory(parseInt(evt.target.id))

    }

    const handleArtType = (evt) => {

        setArtType(parseInt(evt.target.id))

    }

    return (
        <>
            <Row>
                <Button id={0} onClick={handleArtType}>
                    All
                    </Button>
                <Button id={1} onClick={handleArtType}>
                    2D
                    </Button>
                <Button id={2} onClick={handleArtType}>

                    3D
                    </Button>
            </Row>
            <Col>
                <Row><Button id={0} onClick={handleCategory}>Show All Categories</Button></Row>
                {categories.map(category => {

                    return <Row><Button id={category.id} onClick={handleCategory}>{category.name}</Button></Row>
                })}
            </Col>
        </>

    )

}

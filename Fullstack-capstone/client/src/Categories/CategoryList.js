import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col } from "reactstrap";
import { ArtPostContext } from "../providers/ArtPostProvider";
import { CategoryContext } from "../providers/CategoryProvider";





export default function CategoryList(props) {

    const { getAllCategories, categories } = useContext(CategoryContext);

    const [categorySelected, setCategorySelected] = useState(0)
    const [artTypeSelected, setArtTypeSelected] = useState(0)


    useEffect(() => {
        getAllCategories()
    }, [])


    const handleCategory = (evt) => {
        setCategorySelected(parseInt(evt.target.id))
        props.setCategory(parseInt(evt.target.id))

    }

    const handleArtType = (evt) => {

        setArtTypeSelected(parseInt(evt.target.id))
        props.setArtType(parseInt(evt.target.id))

    }

    return (
        <>
            <Row className="ArtType">
                {artTypeSelected != 0 ?
                    <Button className="NonSelectedButton" id={0} onClick={handleArtType}>
                        All
                    </Button> : <Button className="SelectedButton"  >
                        All
                    </Button>}
                {artTypeSelected != 1 ?
                    <Button className="NonSelectedButton" id={1} onClick={handleArtType}>
                        2D
                    </Button> : <Button className="SelectedButton"  >
                        2D
                    </Button>}
                {artTypeSelected != 2 ?
                    <Button className="NonSelectedButton" id={2} onClick={handleArtType}>
                        3D
                    </Button> : <Button className="SelectedButton" >
                        3D
                    </Button>}
            </Row>
            <Col className="Category">
                {categorySelected == 0 ?
                    <Row><Button className="SelectedButton" >Show All Categories</Button></Row>
                    : <Row><Button className="NonSelectedButton" id={0} onClick={handleCategory}>Show All Categories</Button></Row>}
                {categories.map(category => {

                    if (categorySelected == category.id) {
                        return <Row><Button className="SelectedButton" id={category.id} onClick={handleCategory}>{category.name}</Button></Row>
                    }
                    else {


                        return <Row><Button className="NonSelectedButton" id={category.id} onClick={handleCategory}>{category.name}</Button></Row>
                    }
                })}
            </Col>
        </>

    )

}

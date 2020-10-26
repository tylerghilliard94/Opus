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
            <Row>
                {artTypeSelected != 0 ?
                    <Button id={0} onClick={handleArtType}>
                        All
                    </Button> : <Button color="primary"  >
                        All
                    </Button>}
                {artTypeSelected != 1 ?
                    <Button id={1} onClick={handleArtType}>
                        2D
                    </Button> : <Button color="primary"  >
                        2D
                    </Button>}
                {artTypeSelected != 2 ?
                    <Button id={2} onClick={handleArtType}>
                        3D
                    </Button> : <Button color="primary" >
                        3D
                    </Button>}
            </Row>
            <Col>
                {categorySelected == 0 ?
                    <Row><Button color="primary" >Show All Categories</Button></Row>
                    : <Row><Button id={0} onClick={handleCategory}>Show All Categories</Button></Row>}
                {categories.map(category => {

                    if (categorySelected == category.id) {
                        return <Row><Button color="primary" id={category.id} onClick={handleCategory}>{category.name}</Button></Row>
                    }
                    else {


                        return <Row><Button id={category.id} onClick={handleCategory}>{category.name}</Button></Row>
                    }
                })}
            </Col>
        </>

    )

}

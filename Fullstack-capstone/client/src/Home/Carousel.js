import React, { useContext, useEffect, useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Spinner

} from 'reactstrap';
import { ArtPostContext } from '../providers/ArtPostProvider';
import { FollowingContext } from '../providers/FollowingProvider';
import { Link } from "react-router-dom"
import "./Home.css"
let items = [

];

const HomeCarousel = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const { getAllArtPosts, artPosts, getAllRecommendedArtPosts } = useContext(ArtPostContext)
    const { getFollowing, following } = useContext(FollowingContext)
    const [counter, SetCounter] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {

        getFollowing(sessionStorage.userProfileId)
        getAllArtPosts();

    }, [])

    useEffect(() => {
        let carouselPics = []
        if (artPosts.length != 0) {

            artPosts.map(artPost => {

                let entry = {
                    src: artPost.image,
                    altText: artPost.title,
                    caption: artPost.description,
                    id: artPost.id
                }
                carouselPics.push(entry)

            })


            items = carouselPics


        }

    }, [artPosts])

    useEffect(() => {
        if (following.length != 0) {
            getAllRecommendedArtPosts(sessionStorage.userProfileId)

        }


        if (counter == 0) {
            setIsLoading(true)
            SetCounter(1)
        }
        else {
            sleep(300).then(() => setIsLoading(false))
        }

    }, [following])

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    console.log(items)
    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
                <Link to={`/details/${item.id}`}><img style={{
                    flex: 1,
                    width: 800,
                    height: 1025,
                    resizeMode: 'contain'
                }} className="carouselImg" src={item.src} alt={item.altText} /></Link>

            </CarouselItem>
        );
    });
    if (isLoading) {
        return <div className="HomeContainer"><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner></div>
    }
    return (
        <Carousel
            className="Carousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

export default HomeCarousel;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Carousel } from 'react-bootstrap';
import { Typography } from '@material-ui/core/';
import './Main.scss'

const image1 = 'https://lighthouse-tc.com/wp-content/uploads/2020/08/e-learning-header-bg.jpg';
const image2 = 'https://production-tcf.imgix.net/app/uploads/2020/03/20155636/dudley_opm-01.png?auto=format%2Ccompress&q=80&fit=crop&w=1200&h=600';
const image3 = 'https://static.voices.com/wp-content/uploads/2019/03/MR-3017-industry-elearning-1.jpg';

const useStyles = makeStyles({
    carousel: {},
    image_one: {
        width: 1370,
        height: 520,
    },
    image_two: {
        width: 1370,
        height: 520,
    },
    image_third: {
        width: 1370,
        height: 520,
    },
    text: {
        marginTop: 40,
    }
});

export default function Main(props){

    const [ toggleState, setToggleState ] = useState(1);

    const toggleTab = (index)=>{
        setToggleState(index);
    }

    const classes = useStyles();

    return(
        <>
            <div>
                <Carousel fade className={classes.carousel}>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_one} src={image1} alt="First slide" />
                        <div class="carousel-caption d-none d-md-block">
                           <h2>TechUni</h2>
                              <h5>
                                  Your Campas All In Your Hands
                              </h5>
                       </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_two}  src={image2} alt="Second slide" />
                        <div class="carousel-caption-2 d-none d-md-block">
                           <h2>A great place to educat,</h2>
                           <h5>Learn and Interact ! </h5>
                       </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_third} src={image3} alt="Third slide" />
                        <div class="carousel-caption-3 d-none d-md-block">
                           <h2> Learning Without Limits</h2>
                              <h5>
                              A classroom for all with the ability to chat and video call with your colleagues.                              </h5>
                       </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className = "container">
                <Typography className={classes.text}>
                Our slogan is 'together for a better future' as we all know when COVID appear and most of the country destroyed its economy because of this disease, the government order to close all the markets and no one goes outside to the street. so most of the children staying at home and play games or sleep, so the Language and culture for most of the children go away and when you ask him questions he doesn't know the answer.
                make the learning easier and anywhere you can take your class and do the assessment that your teacher sign you to do it and everyone grows up with good culture because 'our children the future for the country'.
                </Typography>
            </div>
        </>
    )
}

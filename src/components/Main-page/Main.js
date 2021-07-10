import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Carousel } from 'react-bootstrap';
import { Typography } from '@material-ui/core/';
import { AuthContext } from '../../context/authContext';
import LogMain from './logMain';

const image1 = 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const image2 = 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const image3 = 'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const useStyles = makeStyles({
    carousel: {},
    image_one: {
        width: '100%',
        height: 500,
    },
    image_two: {
        width: '100%',
        height: 500,
    },
    image_third: {
        width: '100%',
        height: 500,
    },
    text: {
        marginTop: 40,
    }
});

export default function Main(props){
    const context = useContext(AuthContext)

    const [ toggleState, setToggleState ] = useState(1);

    const toggleTab = (index)=>{
        setToggleState(index);
    }

    const classes = useStyles();

    return(
    <> 
    { context.loggedIn? (
        <LogMain/>
    ):(
        <>
            <div>
                <Carousel fade className={classes.carousel}>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_one} src={image1} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_two}  src={image2} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img className={classes.image_third} src={image3} alt="Third slide" />
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
</> 
    )
}

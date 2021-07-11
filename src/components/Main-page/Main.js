import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Carousel } from "react-bootstrap";
import { Typography } from "@material-ui/core/";
import { Link } from "react-router-dom";
import "./Main.scss";

const image1 =
  "https://lighthouse-tc.com/wp-content/uploads/2020/08/e-learning-header-bg.jpg";
const image2 =
  "https://production-tcf.imgix.net/app/uploads/2020/03/20155636/dudley_opm-01.png?auto=format%2Ccompress&q=80&fit=crop&w=1200&h=600";
const image3 =
  "https://static.voices.com/wp-content/uploads/2019/03/MR-3017-industry-elearning-1.jpg";

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
  },
});

export default function Main(props) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Carousel fade className={classes.carousel}>
          <Carousel.Item interval={2000}>
            <img className={classes.image_one} src={image1} alt="First slide" />
            <div class="carousel-caption d-none d-md-block">
              <h2>Eraser</h2>
              <h5>Your Campas All In Your Hands</h5>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className={classes.image_two}
              src={image2}
              alt="Second slide"
            />
            <div class="carousel-caption-2 d-none d-md-block">
              <h2>A great place to educat,</h2>
              <h5>Learn and Interact ! </h5>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className={classes.image_third}
              src={image3}
              alt="Third slide"
            />
            <div class="carousel-caption-3 d-none d-md-block">
              <h2> Learning Without Limits</h2>
              <h5>
                A classroom for all with the ability to chat and video call with
                your colleagues.{" "}
              </h5>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="main-heading">Our Company</h3>
              <div className="underline mx-auto"></div>
              <p className={classes.text}>
                Our slogan is 'together for a better future' as we all know when
                COVID appear and most of the country destroyed its economy
                because of this disease, the government order to close all the
                markets and no one goes outside to the street. so most of the
                children staying at home and play games or sleep, so the
                Language and culture for most of the children go away and when
                you ask him questions he doesn't know the answer. make the
                learning easier and anywhere you can take your class and do the
                assessment that your teacher sign you to do it and everyone
                grows up with good culture because 'our children the future for
                the country'.
              </p>
              <Link to="#" className="btn btn-primary shadow">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------Our VMC -----------------------*/}

      <section className="section bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading"> Vision, Mision and Values</h3>
              <div className="underline mx-auto"></div>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Vision</h6>
              <p>
                'Together for a better future' 
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Mission</h6>
              <p>
              Our mission is to provide a free, world‑class education for anyone, anywhere.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Coure Values</h6>
              <p>
                is 'together for a better future' as we all know when COVID
                appear and most
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*----------------- Our Services------------------ */}
      <section className="section  border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading"> Our Services</h3>
              <div className="underline mx-auto"></div>
            </div>

            <div className="col-md-4 ">
              <div className="card shadow">
                <img
                  src="https://img.flaticon.com/icons/png/512/194/194931.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                  className="w-100 border-bottom"
                />
                <div className="card-body">
                  <h6>Personalized learning</h6>
                  <div className="underline "></div>
                  <p>
                  Students practice at their own pace, first filling in gaps in their understanding and then accelerating their learning.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="card shadow">
                <img
                  src="https://i.pinimg.com/originals/8f/a5/03/8fa50358a5be1217f9cbc616ee9b388b.png"
                  className="w-100  border-bottom"
                />
                <div className="card-body">
                  <h6>Tools to empower teachers</h6>
                  <div className="underline "></div>
                  <p>
                  teachers can identify gaps in their students’ understanding, tailor instruction, and meet the needs of every student.                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="card shadow">
                <img
                  src="https://img.flaticon.com/icons/png/512/201/201565.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                  className="w-100 border-bottom"
                />
                <div className="card-body">
                  <h6>You can learn anything</h6>
                  <div className="underline "></div>
                  <p>
                  Build a deep, solid understanding in all materials with the ability to chat , video call with you colleagues as will as your teachers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

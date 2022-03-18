import React, { useEffect } from 'react'
import Boost from './Boost'
import { useParallax, Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { useState } from 'react';
import { transform } from 'framer-motion';
import styles from '../styles/Homepage.module.scss';


const Homepage = ({ count }) => {
    let [h, setH] = useState();
    let [w, setW] = useState(0);
    useEffect(() => {
        setH(window.innerHeight);
        setW(window.innerWidth);
        window.addEventListener('resize', () => {
            setW(window.innerWidth);
            setH(window.innerHeight);
        })
    })

    return (
        <>
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[
                        {
                            speed: -30,
                            children: (
                                <img style={{
                                    position: "absolute",
                                    top: "0%",
                                    // width: "100%",
                                    height: "100%",
                                    minWidth: "1920px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    overflow: "hidden"
                                }}

                                    src='background/space2/space2b.jpg' />
                            )
                        },

                        {
                            speed: -30,
                            children: (
                                <img style={{
                                    position: "absolute",
                                    top: "0%",
                                    // width: "100%",
                                    height: "100%",
                                    minWidth: "1920px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    overflow: "hidden"
                                }}
                                    src='background/space3/design.png' />
                            )
                        },

                        {
                            translateY: [-110, 100],
                            translateX: [180, -70],

                            children: (
                                <img style={{
                                    position: "absolute",
                                    top: "0%",
                                    width: "90vw",
                                    // height: "100%",
                                    minWidth: "1000px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    overflow: "hidden"

                                }}
                                    src='background/space3/group4.png' />
                            )
                        },

                        // {
                        //     translateY: [30, -10],
                        //     children: (
                        //         <img style={{
                        //             position: "absolute",
                        //             top: "0%",
                        //             width: "90vw",
                        //             // height: "100%",
                        //             minWidth: "1000px",
                        //             left: "50%",
                        //             transform: "translateX(-50%)"
                        //         }}
                        //             src='background/space3/group1a.png' />
                        //     )
                        // },

                        {
                            // translateY: [60,80],
                            // translateX: [70, 70],
                            // startScroll: 0,
                            // endScroll:  h,

                            speed: -15,
                            children: (
                                <img style={{
                                    height: "30vh",
                                    minHeight: "200px",
                                    marginLeft: "70vw",
                                    marginTop: "77vh",
                                    overflow: "hidden"
                                }}
                                    // className={`styles.float styles.dim2`}
                                    // className="float dim2"
                                    className={styles.dim2}
                                    src='background/space3/planet2.png' />
                            )
                        },

                        {
                            // translateY: [36, 53],
                            // translateX: [4, 4],
                            // startScroll: 0,
                            // endScroll:  h,
                            speed: -22,
                            children: (
                                <img style={{
                                    height: "15vh",
                                    minHeight: "125px",
                                    marginLeft: "3vw",
                                    marginTop: "24vh",
                                    overflow: "hidden"

                                }}
                                    // className={`styles.float styles.dim3`}
                                    // className="float dim3"
                                    className={styles.dim3}
                                    src='background/space3/planet3.png' />
                            )
                        },

                        {
                            // translateY: [30, 50],
                            // translateX: [50,50],
                            // startScroll: 0,
                            // endScroll:  h,
                            speed: -18,
                            children: (
                                <img style={{
                                    position: "absolute",
                                    height: "18vh",
                                    minHeight: "150px",
                                    left: "30vw",
                                    transform: "translateX(-50%) translateY(50%)",
                                    top: "40vh",
                                    overflow: "hidden"

                                }}
                                    // className={`styles.dim3 styles.float3`}
                                    // className="float dim2"
                                    className={styles.dim5}
                                    src='background/space3/planet5.png' />
                            )
                        },

                        {
                            // translateY: [40, 60],
                            // translateX: [20, 20],
                            speed: -8,
                            children: (
                                <img style={{
                                    height: "38vh",
                                    minHeight: "200px",
                                    marginLeft: "12vw",
                                    marginTop: "55vh",
                                    overflow: "hidden"

                                }}
                                    // className={`styles.float3 styles.dim1`}
                                    // className="float3 dim1"
                                    className={styles.dim1}
                                    src='background/space3/planet1.png' />
                            )
                        },

                        {
                            // translateY: [30, 50],
                            // translateX: [50,50],
                            // startScroll: 0,
                            // endScroll:  h,
                            speed: -16,
                            children: (
                                <img style={{
                                    height: "25vh",
                                    minHeight: "150px",
                                    marginLeft: "60vw",
                                    marginTop: "40vh",
                                    overflow: "hidden"

                                }}
                                    // className={`styles.float1 styles.dim4`}
                                    // className="float1 dim4"
                                    className={styles.dim4}
                                    src='background/space3/planet4.png' />
                            )
                        },

                        {
                            // translateY: [30, 50],
                            // translateX: [50,50],
                            // startScroll: 0,
                            // endScroll:  h,

                            style: {
                                overflow: "hidden"
                            },
                            speed: -3,
                            children: (
                                <img style={{
                                    height: "15vh",
                                    // width:"15vw",
                                    minHeight: "100px",
                                    marginLeft: "-30vw",
                                    marginTop: "100vh",
                                    transform: "translateY(-50%)",
                                    overflow: "hidden",

                                }}

                                    src='background/space3/planet.png' />
                            )
                        },

                        {
                            // translateY: [-5, 5],
                            children: (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translateX(-50%) translateY(-50%)",
                                        overflow: "hidden"
                                    }}>

                                    <h1
                                        style={{
                                            fontSize: "min(5.5vw,60px)",
                                            backgroundColor: "#ddd",
                                            padding: "8px 24px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <span className="Head f4"

                                        > Zone X </span>
                                    </h1>
                                </div>
                            )
                        },


                    ]}

                    className="aspect-[2/1]"
                >

                    <div
                        style={{
                            height: "100vh",
                            width: "100vw",
                            position: "relative",
                        }}>
                        <Boost props={count} />
                    </div>


                </ParallaxBanner>
            </ParallaxProvider >



        </>
    )
}

export default Homepage
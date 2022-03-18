import Link from 'next/link'
import React from 'react'
import { useParallax, Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';


const Door = () => {
  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          {
            speed:-30,
            children: (
              <img style={{
                position: "absolute",
                top: "18%",
                width: "100%",
                height: "120vh",
                minWidth: "1500px",
                left: "50%",
                transform: "translateX(-50%)"
              }}
                src='background/space8/space8.jpg' />
            ),
          },
          {
            children: (


              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                  overflow: "hidden"
                }}>
                <h1 className="sth1"
                  style={{
                    fontSize: "min(5.5vw,60px)",
                    backgroundColor: "#ddd",
                    padding: "8px 24px",
                    borderRadius: "10px",
                  }}>
                  <Link href="/space">
                    <a style={{ textDecoration: "none" }}>
                      {" "}
                      <span className="Head f7"> PLAYGROUND </span>
                    </a>
                  </Link>
                </h1>
              </div>
            ),

          }
        ]}>

        <div className="div1 door">
          <h1 className="sth1"
          >
            <Link href="/space">
              <a style={{ textDecoration: "none" }}>
                {" "}
                <span className="Head f7"> PLAYGROUND </span>
              </a>
            </Link>
          </h1>
        </div>
      </ParallaxBanner>



    </ParallaxProvider>
  )
}
export default Door
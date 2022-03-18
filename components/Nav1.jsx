import React from 'react'
import Link from "next/link";
import styles from '../styles/Nav.module.scss';

const Nav1 = () => {
  return (
    <div
     className={styles.nav}
      // style={{
      //   padding: "1vh 3vw",
      //   width: "80vw",
      //   display: "flex",
      //   position: "absolute",
      //   top: "1%",
      //   justifyContent: "space-between",
      //   // backgroundImage: "linear-gradient(145deg,#000020,#9333d4,#ae0074)",
      //   backgroundColor: "#aaa3",
      //   zIndex: "100",
      //   marginLeft: "50%",
      //   transform: "translateX(-50%)",
      //   borderRadius:"10px",
      //   // minWidth:"360px"
        
      // }}
    >

      <Link href="/">
        <a
          // style={{
            // color: "white",
            // textDecoration: "none",
            // marginLeft: '8%',
            // fontSize: "27px",
            // fontWeight: "500",
            // transform: "translateX(-50%)",
          // }}
          className={styles.anc}
        >Home</a>
      </Link>
    </div>
  )
}

export default Nav1

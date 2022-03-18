import React from 'react'
import styles from "../styles/Boost.module.scss"

const Boost = ({ props }) => {
    return (
        <>
            <div
                className={styles.pow}
            >
                <div className={styles.wrap}>

                    <div className={styles.but}>
                        {/* <div className={styles.num}> {props} </div> */}
                        <div className={styles.ima}>
                            <img src="boost1.png" />
                        </div>
                        <span className={styles.num}>{props}</span>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Boost
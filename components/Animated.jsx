import { motion } from 'framer-motion'
import { useState } from 'react'

const Animated = () => {


    const [anim, setAnim] = useState(false)

    return (

        <>
            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                    height: '40px',
                    width: '40px',
                    backgroundColor: '#140231',
                    borderRadius: '100%',
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                    boxShadow: "0px 0px 10px rgb(147,51,234)",
                }}
                animate={{
                    // y: [-100, 0],
                    // borderRadius: ["20%", "50%"],
                    // rotate: [380, -20],
                    y: [0, 0, 0, 0, 0, -50, -80, -50, 0, 0, 0, 0, 0, 0, 0, 0],
                    // scale: [1, 2, 2, 1, 1],
                    // rotate: [0, 0, 360, 360, 0],
                    // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                // initial={{
                //     opacity: 0.2
                // }}
                transition={{
                    duration: 1,
                    // type: "spring",
                    // stiffness: 600,
                    yoyo: Infinity,
                }}
            >
                <img src="python.png" style={{
                    display: "block",
                    maxWidth: '50%',
                    maxHeight: '50%',
                }} />
            </motion.div>

            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                    height: '50px',
                    width: '50px',
                    margin: "0px 17px",
                    backgroundColor: '#140231',
                    borderRadius: '100%',
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                    boxShadow: "0px 0px 10px rgb(147,51,234)",
                }}
                animate={{
                    // y: [-100, 0],
                    // borderRadius: ["20%", "50%"],
                    // rotate: [380, -20],
                    y: [0, 0, 0, 0, 0, 0, 0, -50, -80, -50, 0, 0, 0, 0, 0, 0],
                    // scale: [1, 2, 2, 1, 1],
                    // rotate: [0, 0, 360, 360, 0],
                    // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                // initial={{
                //     opacity: 0.2
                // }}
                transition={{
                    duration: 1,
                    // type: "spring",
                    // stiffness: 600,
                    yoyo: Infinity,
                }}
            >
                <img src="javascript.png" style={{
                    display: "block",
                    maxWidth: '50%',
                    maxHeight: '50%',
                }} />
            </motion.div>

            <motion.div
                style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                    height: '40px',
                    width: '40px',
                    backgroundColor: '#140231',
                    borderRadius: '100%',
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                    boxShadow: "0px 0px 10px rgb(147,51,234)",
                }}
                animate={{
                    // y: [-100, 0],
                    // borderRadius: ["20%", "50%"],
                    // rotate: [380, -20],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, -50, -80, -50, 0, 0, 0, 0],
                    // scale: [1, 2, 2, 1, 1],
                    // rotate: [0, 0, 360, 360, 0],
                    // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                // initial={{
                //     opacity: 0.2
                // }}
                transition={{
                    duration: 1,
                    // type: "spring",
                    // stiffness: 600,
                    yoyo: Infinity,
                }}
            >
                <img src="nodejs.png" style={{
                    display: "block",
                    maxWidth: '50%',
                    maxHeight: '50%',
                }} />
            </motion.div>

        </>
    )
}

export default Animated




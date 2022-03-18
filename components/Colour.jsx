import { useState } from "react";
import Axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { setInfo } from "../slices/colourSlice";
import Logout from "./Logout";
import styles from '../styles/Colour.module.scss';

const Colour = ({ ulist, setUlist }) => {
    const dispatch = useDispatch();
    const [colour, setColour] = useState(ulist.colour);
    const status = useSelector((state) => state.colour.login);
    const info = useSelector((state) => state.colour.info);

    const changeColour = () => {
        Axios.post(`${process.env.NEXT_PUBLIC_URL}/user/changecol`, {
            colour,
            id: info._id
        }).then(
            async (response) => {
                console.log("done", response.data);
                dispatch(setInfo({
                    colour: colour,
                    confirmpassword: info.confirmpassword,
                    email: info.email,
                    name: info.name,
                    password: info.password,
                    sides: info.sides,
                    __v: info.__v,
                    _id: info._id
                }));
            }).catch(err => console.log(err))
    }

    // const retColour = async(payload)=>{
    //   return{
    //       type:'COLOURS_FETCHED',
    //       payload
    //   }
    // }

    return (
        <div className={styles.area} >
            <div className={styles.card}>
                {!status && <h1
                    className="f5"
                    style={{
                        color: "maroon",
                    // fontSize: "max(18px,min(2vw,30px))"
                    }}
                    >Join Explorers</h1>}
                    {/* <h1>{ulist.length}</h1> */}
                    {status &&
                    // (ulist.map((user)=>{
                    //         return(
                    //             <div key={user.email}>
                    //                 <h3>{user._id}</h3>
                    //                 <h4>{user.colour}</h4>
                    //             </div>
                    //         )
                    //     }))
                    <div className={styles.cardContent}>
                        <Logout />
                        {/* <h3>{info._id}</h3> */}
                        <h4 className="f5"
                            style={{
                                color: "maroon",
                                fontSize: "max(25px,min(2vw,30px))"
                            }}>{info.colour}</h4>
                        <div>
                            <input type="text" placeholder="Change Colour" onChange={(event) => {
                                setColour(event.target.value);
                            }} />
                            <br />
                            <button className={styles.power1} onClick={() => { changeColour() }}>Change</button>
                        </div>
                    </div>
                    }
            </div>
            {/* <div classname={styles.ast} id={styles.ast}></div> */}


            <ul id={styles.ast}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

        </div>
    )
}

export default Colour

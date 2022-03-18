import { useState } from "react";
import { useDispatch } from "react-redux"
import { increment, incrementByAmount } from "../slices/colourSlice";
import styles from "../styles/Change.module.scss";
import { useSelector } from 'react-redux';
import Link from "next/link";

const Change = () => {
    const count = useSelector((state) => state.colour.value);
    const dispatch = useDispatch();
    const [inc, setInc] = useState(0);
    return (
        <div className={styles.card}>
            <div>
                <Link href="/">
                    <a className={styles.inp}>Home</a>
                </Link>
            </div>
            <div>
                <h1>{count}</h1>
                <button className={styles.power} onClick={() => { dispatch(increment()) }}>+</button>
                <input type="number" onChange={(ev) => { setInc(ev.target.value) }} />
            </div>
            <div className={styles.bl}>
                <button className={styles.power} onClick={() => {
                    dispatch(incrementByAmount(parseInt(inc)));
                    console.log(parseInt(inc));
                }}> boost</button>
                <img className={styles.ima} src="boost.png" />
            </div>
        </div>
    )
}

export default Change

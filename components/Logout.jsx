import { useDispatch } from "react-redux";
import { logout } from "../slices/colourSlice";
import styles from "../styles/Logout.module.scss";

const Logout = () => {
    const dispatch = useDispatch();
    return (
        <div
            // className={styles.logoutbutton}
        >
            <button
                className={styles.logoutbutton}
                onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}

export default Logout

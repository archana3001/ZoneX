import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Change from "../components/Change";
import styles from "../styles/Change.module.scss";
const boost = () => {
  const count = useSelector((state) => state.colour.value);

  return (
    <div className={styles.bganim}>
      <Change />
    </div>
  );
};

export default boost;

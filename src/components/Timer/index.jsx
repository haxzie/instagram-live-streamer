import React, { useState } from 'react'
import styles from "./styles.module.scss"

export default function Timer({ seconds }) {

    /**
     * Returns minutes from the given seconds
     */
    const getMinutes = () => {
        if (seconds) {
            const minutes = Math.trunc(seconds/60);
            return minutes < 10 ? `0${minutes}`: `${minutes}`;
        } else {
            return `00`;
        }
    }

    /**
     * returns the seconds part within 60 from the given total seconds
     */
    const getSeconds = () => {
        if (seconds) {
            const ts = seconds%60
            return ts < 10? `0${ts}` : `${ts}`;
        } else {
            return `00`;
        }
    }


    return (
        <div className={styles.timer}>
            <span>{getMinutes()}:{getSeconds()}</span>
        </div>
    )
}

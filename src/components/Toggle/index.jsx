import React from 'react'
import styles from "./styles.module.scss"

export default function Toggle(props) {
    return (
        <input type="checkbox" {...props}></input>
    )
}

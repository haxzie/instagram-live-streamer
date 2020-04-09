import React from 'react'
import styles from "./styles.module.scss"

export default function TextInput(props) {
    return (
        <input className={styles.fancyInput} {...props}/>
    )
}

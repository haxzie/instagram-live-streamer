import React from 'react'
import styles from "./styles.module.scss"

export default function TextInput(props) {
    const data = {...props};
    delete data.forwardRef
    return (
        <input className={styles.fancyInput} ref={props.forwardRef? props.forwardRef: null} {...data}/>
    )
}

"use client"

import styles from "./InputNC.module.css"

export default function InputNC({id, variant, onChange, value, type, placeholder}) {
    return (
        <input className={styles.input} id={id} placeholder={placeholder} onChange={onChange} value={value} type={type}></input>
    )
}
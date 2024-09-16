"use client"

import styles from "./InputLogin.module.css"

export default function Input({id, variant, onChange, value, type, placeholder}) {
    return (
        <input className={styles.input} id={id} placeholder={placeholder} onChange={onChange} value={value} type={type}></input>
    )
}
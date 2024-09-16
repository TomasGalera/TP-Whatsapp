"use client"

import clsx from "clsx"
import styles from "./Input.module.css"

export default function Input({id, variant, onChange, value}) {
    return (
        <input className={
            clsx({
                [styles.input]: true,
                [styles.light]: variant == "light",
                [styles.dark]: variant == "dark",
            })
        } id={id} placeholder="Ingrese el mensaje" onChange={onChange} value={value}></input>
    )
}
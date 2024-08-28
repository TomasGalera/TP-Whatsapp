"use client"

import clsx from "clsx"
import styles from "./Input.module.css"

export default function Input({id, variant}) {
    return (
        <input className={
            clsx({
                [styles.input]: true,
                [styles.primary]: variant == "primary",
                [styles.secondary]: variant == "secondary",
            })
        } id={id} placeholder="Ingrese el mensaje"></input>
    )
}
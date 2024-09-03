"use client"

import clsx from "clsx"
import styles from "./Message.module.css"

export default function Message({variant, name, message}) {
    return (
        <div className={
            clsx({
                [styles.message]: true,
                [styles.primary]: variant == "user",
                [styles.secondary]: variant == "sender",
            })
        }>
            <h6>{name}</h6>
            <p>{message}</p>
        </div>
    )
}
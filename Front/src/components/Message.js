"use client"

import clsx from "clsx"
import styles from "./Message.module.css"

export default function Message({variant, name, message, date, theme}) {
    return (
        <div className={
            clsx({
                [styles.message]: true,
                [styles.primary]: variant == "user" && theme == "light",
                [styles.secondary]: variant == "sender" && theme == "light",
                [styles.primary_dark]: variant == "user" && theme == "dark",
                [styles.secondary_dark]: variant == "sender" && theme == "dark"
            })
        }>
            <h6>{name}</h6>
            <p>{message}</p>
            <p>{date}</p>
        </div>
    )
}
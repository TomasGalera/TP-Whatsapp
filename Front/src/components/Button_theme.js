"use client"

import styles from "./Button_theme.module.css"

export default function Button_theme({onClick}){
    return(
        <button className={styles.button} onClick={onClick}>Modo oscuro</button>
    )
}
"use client"
import clsx from "clsx"
import styles from "./NewChat.module.css"
import Image from "next/image"


export default function NewChat({onClick, variant, message}){
    return(
        <button className={
            clsx({
                [styles.button]: true,
                [styles.variant_oscuro]: variant == "dark",
                [styles.variant_claro]: variant == "light",
                [styles.variant_ok]: variant == "ok",
            })
        } onClick={onClick}><Image
        src="/newChat.png"
        width={30}
        height={30}
        alt="Picture of the author"
      />{message}</button>
    )
}
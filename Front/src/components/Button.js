"use client"
import clsx from "clsx"
import styles from "./Button.module.css"
//PROPS
// export default function Button({props}){
//     return(
//         <button onClick={props.onClick}>Registrarse</button>
//     )
// }

// export default function Button(){

//     function funcionParaEjecutar() {
//         console.log("Hola desde el botón")
//     }

//     return(
//         <button onClick={funcionParaEjecutar}>Registrarse</button>
//     )
// }

export default function Button({onClick, text, variant}){
    return(
        <button className={
            clsx({
                [styles.button]: true,
                [styles.variant_primary]: variant == "primary",
                [styles.variant_secondary]: variant == "secondary",
                [styles.variant_ok]: variant == "ok",
            })
        } onClick={onClick}>{text}</button>
    )
}
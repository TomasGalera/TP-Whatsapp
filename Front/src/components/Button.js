"use client"
import clsx from "clsx"
import styles from "./Button.module.css"
import Image from "next/image"

const imageStyle = {
    height: '50px',
    width: 'auto',
}
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

export default function Button({onClick, variant}){
    return(
        <button className={
            clsx({
                [styles.button]: true,
                [styles.variant_oscuro]: variant == "dark",
                [styles.variant_claro]: variant == "light",
                [styles.variant_ok]: variant == "ok",
            })
        } onClick={onClick}><Image
        src="/enviar.png"
        width={30}
        height={30}
        alt="Picture of the author"
      /></button>
    )
}
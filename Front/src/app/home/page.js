"use client"
import Button from "@/components/Button";
import Title from "@/components/Title"
import Checkbox from "@/components/Checkbox";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"

export default function home(){
    const [cuenta, setCuenta] = useState(0);
    const [nombre, setNombre] = useState("Anonimo");
    const [incrementarText, setIncrementarText] = useState("Incrementar");
    const [checked, setChecked] = useState(false);
    const [variant, setVariant] = useState(false)
    const router = useRouter();

    function incrementar(){
        if(checked === true){
            setCuenta(cuenta - 1);
        } else (
            setCuenta(cuenta + 1)
        )
    }

    function cambiarNombre(){
        setNombre(document.getElementById("ingresoNombre").value)
    }

    function changeChecked(){
        if (checked === false){
            setChecked(true);
            setIncrementarText("Decrementar");
            setVariant(true)
        } else {
            setChecked(false);
            setIncrementarText("Incrementar")
            setVariant(false)
        }
    }

    function handleClick(){
        // Aca va la lógica para redirigir, por ejemplo lógica login
        // Push sirve para guardar el cambio en el historial de navegacion
        if (cuenta >= 10 && cuenta < 15){
            router.push("/ranking")
        }
        // Replace sirve para que no se guarde el historial, util en los login ya que se cierra sesión y no se vuelve a la pantalla de login
        if (cuenta >= 15){
            router.replace("/ranking")
        } else {
            alert("Contador insuficiente")
        }
    }

    useEffect(
        () => {
            // alert("Me ejecuto al principio")

        },
        []
    )
    useEffect(
        ()=>{
            setCuenta(cuenta + 5)
        },[nombre]
    )

    useEffect(() => {
        fetch('http://localhost:3001/saludo')
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
          })
    }, [])

    return(
        <html>
            <head>

            </head>
            <body className={styles.body}>
                <div className={styles.sidebar}>
                    <h3 className="w3-bar-item">Menu</h3>
                    <a href="#" className="w3-bar-item w3-button">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button">Link 3</a>
                </div>
                <div>
                    <Title titulo="Home"/>
                    <h2>Contador: {cuenta}</h2>
                    <h3>Hola {nombre}</h3>
                    <Button onClick={incrementar} text={incrementarText}/>
                    <br/>
                    <input type="text" placeholder="Ingrese nombre" id="ingresoNombre"></input>
                    <br/>
                    <Button onClick={cambiarNombre} text="Modificar"/>
                    <Button variant={cuenta >= 15 ? "ok" : ""} text="Cambiante"/>
                    <Button variant="primary" text="Primario"/>
                    <Button variant="secondary" text="Secundario"/>
                    <Button variant="ok" text="OK"/>
                    <label htmlFor="checkbox1">Decrementar? </label>
                    <Checkbox onClick={changeChecked} name="checkbox1"/>
                    <Button onClick={handleClick} text="Sin Link"/>
                    <Link href={"/ranking"}>
                        <Button text="Con link"/>
                    </Link>
                    {
                        variant == true &&
                        <>
                            <br></br>
                            <br></br>
                            <label>Login - CONDITIONAL RENDERING</label>
                        </>
                    }
                </div>
            </body>
        </html>
    )
}



/* export default function home(){
    let cuenta = 0;
    
    function incrementar(){
        cuenta++;
        document.getElementById("contador").innerHTML = "Contador: " + cuenta;
    }
    return(
        <div>
            <Title titulo="Home"/>
            <h2 id="contador">Contador: {cuenta}</h2>
            <Button onClick={incrementar} text={"Incrementar"}/>
        </div>
    )
} */
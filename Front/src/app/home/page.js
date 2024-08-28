"use client"
import Button from "@/components/Button";
import Title from "@/components/Title"
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export default function home(){
    const [checked, setChecked] = useState(false);
    const [variant, setVariant] = useState(false)
    const router = useRouter();
    const [tema, setTema] = useState("claro")

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

    function modoOscuro() {
        var element = document.body;
        element.classList.toggle(styles.dark_mode);
        if (tema == "claro"){
            setTema("oscuro")
        } else {
            setTema("claro")
        }
    }

    useEffect(
        () => {
            // alert("Me ejecuto al principio")

        },
        []
    )
    /* Se ejecuta cuando cambia una variable
    useEffect(
         ()=>{
             setCuenta(cuenta + 5)
         },[nombre]
    ) */

    useEffect(() => {
        fetch('http://localhost:3001/saludo')
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
          })
    }, [])

    return(
        <>
            <article>
                <div className={styles.sidebar}>
                    <h3 className="w3-bar-item">Menu</h3>
                    <a href="#" className="w3-bar-item w3-button">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button">Link 3</a>
                </div>
                <div >
                    <Title titulo="Home"/>
                    <h2>Contador:</h2>
                    <h3>Hola</h3>
                    <Button onClick={modoOscuro}/>
                    <br/>
                    <input type="text" placeholder="Ingrese nombre" id="ingresoNombre"></input>
                    <br/>
                    <Button  text="Modificar"/>
                    {/* <Button variant={cuenta >= 15 ? "ok" : ""} text="Cambiante"/> */}
                    <Button variant={tema} text="Primario"/>
                    <Button variant={tema} text="Secundario"/>
                    <Button variant={tema} text="OK"/>
                    <label htmlFor="checkbox1">Decrementar? </label>
                    <Checkbox onClick={changeChecked} name="checkbox1"/>
                    <Button onClick={handleClick} text="Sin Link"/>
                    <Link href={"/ranking"}>
                        <Button text="Con link"/>
                    </Link>
                    <Input id={1} variant={"primary"}/>
                    <Input id={2} variant={"secondary"}/>
                    <Input id={3}/>
                    {
                        variant == true &&
                        <>
                            <br></br>
                            <br></br>
                            <label>Login - CONDITIONAL RENDERING</label>
                        </>
                    }
                </div>
            </article>
        </>
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
"use client"
import Button from "@/components/Button";
import Title from "@/components/Title"
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Message from "@/components/Message";
import Button_theme from "@/components/Button_theme";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function home(){
    const [checked, setChecked] = useState(false);
    const [variant, setVariant] = useState(false)
    const [theme, setTheme] = useState("light")
    const [contactName, setContactName] = useState("Nombre Usuario")
    const [actualChat, setActualChat] = useState(null)
    const router = useRouter();
    
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



    const chats = [
        { id: 1, name: "Juan Pérez", messages: [{id:1, variant: "user", message: "Hola como estas?", name:"Tomy"}, {id:2, variant: "other", message: "Hola como estas?", name:"Tomy"}, {id:3, variant: "other", message: "Hola como estas?", name:"Tomy"}]},
        { id: 2, name: "María García", messages: [] },
        { id: 3, name: "Carlos Rodríguez", messages: [] }
    ];
    
    function loadChatList() {
        const chatList = document.getElementById('chatList');
        if (!chatList) return;
        chatList.innerHTML = "";
        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = styles.chats;
            chatItem.textContent = chat.name;
            chatItem.onclick = () => selectChat(chat);
            chatList.appendChild(chatItem);
        });
    }
    
    function selectChat(chat) {
        setContactName(chat.name);
        setActualChat(chat.id)
    }
    
    useEffect(() => {
        loadChatList();
    }, []);




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

    function sendMessage() {
        console.log("hola")
    }

    function modoOscuro() {
        var element = document.body;
        element.classList.toggle(styles.dark_mode);
        if (theme == "light"){
            setTheme("dark")
        } else {
            setTheme("light")
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
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <h2 className={styles.whatsapp}>WhatsApp</h2>
                    <h3 className={styles.chattitle}>Chats</h3>
                    <div id="chatList">

                    </div>
                </div>
                <div className={styles.topbar}>
                    <p className={styles.pheader}>{contactName}</p>
                    <Button_theme onClick={modoOscuro}/>
                </div>
                <div className={styles.chat} id="chat">
                    {/* {chats.message.map((msg) =>
                        <Message id={msg.id} variant={msg.variant} theme={theme} message={msg.message}/>
                    )} */}

                    {chats.map(chat => (
                        chat.messages.length > 0 && chat.id === actualChat ? (
                            chat.messages.map((msg) => (
                                <Message key={msg.id} variant={msg.variant} theme={theme} message={msg.message} name={msg.name}/>
                            ))
                        ) : (
                            <></>
                        )
                    ))}


                    {/* <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="sender" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="sender" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="sender" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="user" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="sender" theme={theme} message={"Hola como estas?"} name="Tomy"/>
                    <Message variant="sender" theme={theme} message={"Hola como estas?"} name="Tomy"/> */}
                    {/* <Button variant={cuenta >= 15 ? "ok" : ""} text="Cambiante"/> */}
                    {/* <Button variant={theme} text="Primario"/>
                    <Button variant={theme} text="Secundario"/>
                    <label htmlFor="checkbox1">Decrementar? </label>
                    <Checkbox onClick={changeChecked} name="checkbox1"/>
                    <Button onClick={handleClick} text="Sin Link"/>
                    <Link href={"/ranking"}>
                        <Button text="Con link"/>
                    </Link>
                    <Input id={2} variant={"primary"}/>
                    <Input id={3} variant={"secondary"}/>
                    <Input id={4}/> */}
                    {
                        variant == true &&
                        <>
                            <br></br>
                            <br></br>
                            <label>Login - CONDITIONAL RENDERING</label>
                        </>
                    }
                </div>
                <div className={styles.bottombar}>
                        <Input id={1} variant={theme}/>
                        <Button onClick={sendMessage} variant={theme}/>
                </div>
            </div>
        </>
    )
}
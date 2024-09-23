"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import Message from "@/components/Message";
import Button_theme from "@/components/Button_theme";
import InputLogin from "@/components/InputLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import clsx from "clsx";
import { Instrument_Sans } from "next/font/google";

export default function home(){
    const [checked, setChecked] = useState(false);
    const [variant, setVariant] = useState(false);
    const [theme, setTheme] = useState("light");
    const [contactName, setContactName] = useState("Nombre Usuario");
    const [actualChat, setActualChat] = useState(null);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [actualUser, setActualUser] = useState([]);

    const router = useRouter();

    const [chats, setChats] = useState([
        { userId: 1, id: 1, name: "Juan Pérez", messages: [{id:1, variant: "user", message: "Hola como estas?", name:"Tomy", chatId: 1}, {id:2, variant: "other", message: "Hola como estas?", name:"Tomy", chatId: 1}, {id:3, variant: "other", message: "Hola como estas?", name:"Tomy", chatId: 1}]},
        { userId: 1, id: 2, name: "María García", messages: [] },
        { userId: 1, id: 3, name: "Carlos Rodríguez", messages: [] },
        { userId: 2, id: 4, name: "Juan Pérez", messages: [{id:1, variant: "user", message: "Hola como estas?", name:"Tomy"}, {id:3, variant: "other", message: "Hola como estas?", name:"Tomy"}]},
        { userId: 2, id: 5, name: "María García", messages: [] },
        { userId: 2, id: 6, name: "Carlos Rodríguez", messages: [] }
    ]);

    let userId = 1
    class Users {
        constructor(username, password) {
            this.id = userId;
            this.username = username;
            this.password = password;
            userId++
        }
    }
    
    let users = [new Users("tomas", "abru"), new Users("a", "a")]

    function register () {
        let i = 0
        while (i < users.length -1 && users[i].username != username && users[i].password != password) {
            i++
        }
        if (users[i].username != username) {
            let register = new Users(username, password)
            users.push(register)
            setActualUser([register.id, register.username])
            alert("Registro realizado correctamente")
            console.log(actualUser)
            setUsername("")
            setPassword("")
        } else {
            alert("El usuario ya existe")
        }
    }

    function login() {
        let i = 0
        while (i < users.length -1 && users[i].username != username && users[i].password != password) {
            i++
        }
        if (users[i].username == username && users[i].password == password) {
            setActualUser([users[i].id, users[i].username])
            alert("Inicio de sesión correcto")
            setUsername("")
            setPassword("")
        } else {
            alert("El usuario o la contraseña son incorrectos")
        }
    }

    function closeSession() {
        setActualUser([])
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function loadChatList() {
        const chatList = document.getElementById('chatList');
        if (!chatList) return;
        chatList.innerHTML = "";
        chats.forEach(chat => {
            if (chat.userId == actualUser[0]) {
                const chatItem = document.createElement('div');
                chatItem.className = styles.chats;
                chatItem.textContent = chat.name;
                chatItem.onclick = () => selectChat(chat);
                chatList.appendChild(chatItem);
            }
        });
    }
    
    function selectChat(chat) {
        setContactName(chat.name);
        setActualChat(chat.id)
    }
    
    useEffect(() => {
        loadChatList();
    }, [actualUser]);


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

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { 
                id: Date.now(), // Se usa Date.now() para asegurar una ID única
                variant: "user",
                message: message.trim(),
                name: actualUser[1]
            };

            insertMessages()

            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === actualChat 
                        ? { ...chat, messages: [...chat.messages, newMessage] }
                        : chat
                )
            );
            setMessage("");
        }
    };

    async function insertMessages(){
        const data = {
            name: actualUser[1],
            userId: actualUser[0],
            message: message.trim(),
            chatId: actualChat
        }

        const response = await fetch('http://127.0.0.1:4000/insertMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Error en la respuesta de la red');

        const result = await response.json();
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

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
        fetch('http://localhost:4000/')
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
          })
    }, [])
    return(
        <>
            {
                actualUser == "" &&
                <>
                    <div className={styles.bodyLogin}>
                        <div className={styles.login}>
                            <h2>Login</h2>
                            <h3>User</h3>
                            <InputLogin type={"text"} placeholder={"Ingrese su usuario"} onChange={handleUsernameChange} value={username}/>
                            <h3>Password</h3>
                            <InputLogin type={"text"} placeholder={"Ingrese su contraseña"} onChange={handlePasswordChange} value={password}/>
                            <div>
                                <button onClick={login}>Login</button>
                                <button onClick={register}>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                actualUser != "" &&
                <>
                    <div className={styles.body}>
                        <div className={
                            clsx({
                                [styles.sidebar]: theme == "light",
                                [styles.sidebar_dark]: theme == "dark"
                            })
                        }>
                            <h2 className={styles.whatsapp}>WhatsApp</h2>
                            <h3 className={styles.chattitle}>Chats</h3>
                            <div id="chatList">

                            </div>
                            <button onClick={closeSession}>Cerrar Sesión</button>
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
                        </div>
                        <div className={styles.bottombar}>
                                <Input id={"mensaje"} variant={theme} onChange={handleMessageChange} value={message}/>
                                <Button onClick={sendMessage} variant={theme}/>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
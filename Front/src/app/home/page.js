"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import Message from "@/components/Message";
import Button_theme from "@/components/Button_theme";
import InputLogin from "@/components/InputLogin";
import NewChat from "@/components/NewChat";
import InputNC from "@/components/InputNC";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import styles from "./page.module.css";
import clsx from "clsx";

export default function home(){
    const [theme, setTheme] = useState("light");
    const [contactName, setContactName] = useState("Nombre Usuario");
    const [actualChat, setActualChat] = useState(null);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [actualUser, setActualUser] = useState([]);
    const [newChatUser, setNewChatUser] = useState("");
    const [newChatName, setNewChatName] = useState("");
    const [newChat, setNewChat] = useState(false);


    let user = ""

    const [chats, setChats] = useState([]);

    async function register () {
        if (username != undefined && username != "" && password != undefined && password != "") {
            const data = {
                username: username,
            }
    
            const response = await fetch('http://localhost:4000/getUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (result === undefined || result.length === 0){
                const data1 = {
                    username: username,
                    password: password
                }
                
                const response1 = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1),
                });
                
                const result1 = await response1.json();
                
                
                if (result1 != undefined || result1.length != 0){
                    setActualUser([result1.user[0].userId, result1.user[0].username])
                    alert("Registro realizado correctamente")
                    setUsername("")
                    setPassword("")
                }
            } else {
                console.log(result)
                alert("El usuario ya existe")
            }
        } else {
            alert("Complete la información")
        }
    }
    
    async function login() {
        if (username != "" && password != "") {
            const data = {
                username: username,
                password: password
            }
            
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) throw new Error('Error en la respuesta de la red');
            const result = await response.json();

            if (result.user){
                setActualUser([result.user[0].userId, result.user[0].username])
                alert("Inicio de sesión correcto")
                setUsername("")
                setPassword("")
            } else {
                alert(result.message)
            }
        } else {
            alert("Complete la información")
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

    async function getChatList() {
        if (actualUser.length !== 0){
            const data = {
                userId: actualUser[0]
            }
            
            const response = await fetch('http://localhost:4000/getChats', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) throw new Error('Error en la respuesta de la red');
            const result = await response.json();
            
            for (let i in result){
                const data1 = {
                    chatId: result[i].chatId,
                }
                
                const response1 = await fetch('http://localhost:4000/getMessagesChat', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1),
                });
                
                if (!response1.ok) throw new Error('Error en la respuesta de la red');
                const result2 = await response1.json();

                result[i].messages = result2.messages
            }

            setChats(result)
        }
    }

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

    useEffect(() => {
        loadChatList();
    }, [chats, newChat]);
    
    function selectChat(chat) {
        socket.emit("leaveRoom", {room:actualChat})
        setContactName(chat.name);
        setActualChat(chat.chatId)
        // getMessages(chat)
        getChatList()
        console.log(chats)
        socket.emit("joinRoom", {room:chat.chatId})
    }
    
    useEffect(() => {
        getChatList();
    }, [actualUser]);
    
    const [newMessage, setNewMessage] = useState()
    
    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                chatId: actualChat,
                message: message.trim(),
                userId: actualUser[0],
                username: actualUser[1]
            };

            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.chatId === actualChat 
                        ? { ...chat, messages: [...chat.messages, newMessage] }
                        : chat
                )
            );

            socket.emit("sendMessage", {message: newMessage})

            setMessage("");
        }
    };

    useEffect(() => {
        if (actualUser[0] != undefined) {
            if (newMessage.message.message.userId != actualUser[0]){
                console.log(newMessage)
                console.log(actualUser[0])
    
                setChats(prevChats => 
                    prevChats.map(chat => 
                        chat.chatId === actualChat 
                            ? { ...chat, messages: [...chat.messages, newMessage.message.message] }
                            : chat
                    )
                );
            }
        }
    },[newMessage])

    async function insertMessages(){
        if (message != "" && message != undefined) {
            const data = {
                chatId: actualChat,
                message: message.trim(),
                userId: actualUser[0]
            }
    
            const response = await fetch('http://127.0.0.1:4000/insertMessage', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) throw new Error('Error al enviar el mensaje');
    
            const result = await response.json();
    
            console.log(result)
    
            sendMessage()
        } else {
            alert("No se puede enviar un mensaje vacío")
        }
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

    async function addChat() {
        if (newChatUser != "" && newChatName != "" && newChatName != actualUser[1]) {
            const data = {
                username: newChatUser,
            }
    
            const response = await fetch('http://localhost:4000/getUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            console.log(result)
            console.log(result[0].userId)
            
            if (result != undefined || result.length != 0){
                const data3 = {
                    name: newChatName,
                    userId: actualUser[0]
                }
        
                const response3 = await fetch('http://127.0.0.1:4000/insertChat', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data3),
                });
        
                if (!response3.ok) throw new Error('Error al enviar el mensaje');
                const result3 = await response3.json();
        
                if (result3) {
                    console.log(result3)
                    const data2 = {
                        chatId: result3.result[0].chatId,
                        userId1: actualUser[0],
                        userId2: result[0].userId
                    }
            
                    const response2 = await fetch('http://127.0.0.1:4000/insertChats_users', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data2),
                    });
            
                    if (!response2.ok) throw new Error('Error al enviar el mensaje');
                    const result2 = await response2.json();
                    console.log(newChatUser)
                    socket.emit("newRoom", {username: newChatUser})
                }
            }
            setNewChat(false)
            getChatList()
        } else {
            alert("Completar la información")
        }
    }

    function handleNewChat() {
        setNewChatName("")
        setNewChatUser("")
        setNewChat(true)
    }

    function cancelNewChat(){
        setNewChatUser("")
        setNewChat(false)
    }

    function emitNewRoom(){
        socket.emit("newRoom", {username: newChatUser})
    }

    const [newRoomUser, setNewRoomUser] = useState()

    useEffect(() => {
        if (newRoomUser != undefined) {
            if (newRoomUser.user === actualUser[1]){
                getChatList()
            }
        }
    }, [newRoomUser]);

    //MARK: Socket
    const { socket, isConnected } = useSocket();
    
    useEffect(() => {
        if(!socket) return;
        
        socket.on("pingAll", (data) => {
            console.log("Me llego el evento pingAll", data)
        });
        
        socket.on("newRoom", (data) => {
            setNewRoomUser(data)
            if (data.user === actualUser[1]){
                console.log("New Room Created", data)
                console.log("New Room Created, User: ", data)
            }
        });
        
        socket.on("newMessage", (data) => {
            if (data.message.message.userId != actualUser[0]){
                console.log("Mensaje de la sala: ", data)
                setNewMessage(data)
            }
        })

        return() => {
            socket.off("message")
        }
    }, [socket, isConnected]);

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
                            <InputLogin type={"password"} placeholder={"Ingrese su contraseña"} onChange={handlePasswordChange} value={password}/>
                            <div>
                                <button onClick={login}>Login</button>
                                <button onClick={register}>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                newChat === true &&
                <>
                    <div className={styles.bodyNewChat}>
                        <div className={styles.newChat}>
                            <h2>Usuario del nuevo chat</h2>
                            <InputNC type={"text"} onChange={(event) => setNewChatUser(event.target.value)} value={newChatUser} placeholder={"Ingrese el usuario"}/>
                            <h2>Nombre del nuevo chat</h2>
                            <InputNC type={"text"} onChange={(event) => setNewChatName(event.target.value)} value={newChatName} placeholder={"Ingrese el nombre"}/>
                            <div>
                                <button onClick={addChat}>Agregar chat</button>
                                <button onClick={cancelNewChat}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                actualUser != "" && newChat == false &&
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
                            <NewChat onClick={handleNewChat} variant={theme}/>
                            <div id="chatList">

                            </div>
                            <button onClick={closeSession} className={
                                clsx({
                                    [styles.closeSession]: theme == "light",
                                    [styles.closeSession_dark]: theme == "dark"
                                })
                            }>Cerrar Sesión</button>
                        </div>
                        <div className={styles.topbar}>
                            <p className={styles.pheader}>{contactName}</p>
                            <Button_theme onClick={modoOscuro}/>
                        </div>
                        <div className={styles.chat} id="chat">
                            {chats.map(chat => (
                                chat.messages.length > 0 && chat.chatId === actualChat ? (
                                    chat.messages.map((msg) => {
                                        if (msg.userId === actualUser[0]) {
                                            user = "user"
                                        } else {
                                            user = "other"
                                        }
                                        return <Message variant={user} theme={theme} message={msg.message} name={msg.username}/>
                                    })
                                ) : (
                                    <></>
                                )
                            ))}
                        </div>
                        <div className={styles.bottombar}>
                            <Input id={"mensaje"} variant={theme} onChange={handleMessageChange} value={message}/>
                            <Button onClick={insertMessages} variant={theme}/>
                        </div>
                    </div>
                </>
            }
            
        </>
    )
}
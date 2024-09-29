"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title"
import { useSocket } from "@/hooks/useSocket"
import { useEffect, useState } from "react";

export default function users(){
    const { socket, isConnected } = useSocket();
    const [message, setMessage] = useState("")
    let userId1 = 1

    useEffect(() => {
        if(!socket) return;

        socket.on("pingAll", (data) => {
            console.log("Me llego el evento pingAll", data)
        });

        socket.on("newMessage", (data) => {
            if (data.message.userId != userId1){
                console.log("Mensaje de la sala: ", data)
            }
        })

        return() => {
            socket.off("message")
        }
    }, [socket, isConnected]);

    function handleClick(){
        socket.emit("pingAll", {message: "Hola soy tomy"})
    }

    function handleJoinChat(){
        socket.emit("joinRoom", {room:"Integilentes"})
    }

    function handleSendMessage(){
        socket.emit("sendMessage", {message: message, userId: userId1})
    }

    // function handlerInput(event) {
    //     setMessage(event.target.value)
    // }

    return(
        <div>
            <Title titulo="Users"/>
            <Button onClick={handleClick} message={"Prueba"}/>
            <Button onClick={handleJoinChat} message={"Conectar"}/>
            <Button onClick={handleSendMessage} message={"Enviar"}/>
            <Button onClick={changeUserId} message={"Usuario"}/>
            {/* <input onChange={handlerInput}/> */}
            <input onChange={(event) => setMessage(event.target.value)}/>
        </div>
    )
}
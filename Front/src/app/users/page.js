"use client"
import Button from "@/components/Button";
import Title from "@/components/Title"
import { useSocket } from "@/hooks/useSocket"
import { useEffect } from "react";

export default function users(){
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if(!socket) return;

        socket.on("pingAll", (data) => {
            console.log("Me llego el evento pingAll", data)
        });

    }, [socket, isConnected]);

    function handleClick(){
        socket.emit("pingAll", {message: "Hola soy tomy"})
    }

    return(
        <div>
            <Title titulo="Users"/>
            <Button onClick={handleClick}/>
        </div>
    )
}
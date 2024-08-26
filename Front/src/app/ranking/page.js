"use client"

import Button from "@/components/Button"
import Title from "@/components/title"

export default function Ranking(){
    function funcionBtn2(){
        console.log("Soy el boton 2")
    }
    return(
        <>
            <div>
                <Title titulo="Ranking"/>
            </div>
            <h1>Ranking 1</h1>
            <h1>Ranking 2</h1>
            <h1>Ranking 3</h1>
            <h1>Ranking 4</h1>
            
            <Button onClick={funcionBtn2} text="Botón 2"></Button>
        </>
    )
}
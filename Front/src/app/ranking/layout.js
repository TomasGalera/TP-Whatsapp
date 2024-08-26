import { Children } from "react"

//Componentes FUNCIONALES
export default function LayoutRanking({children}){
    return(
        <>
            <header>
                <h1>Soy el header</h1>
            </header>
            {children}
            <h2>Soy footer</h2>
        </>
    )
}
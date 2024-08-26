"use client"

export default function Checkbox({onClick, name}){
    return(
        <input type="checkbox" onClick={onClick} name={name}></input>
    )
}
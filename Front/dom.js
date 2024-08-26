async function llamadoAlBackend() {
    let tipoGet = document.getElementById("ingresoTexto").value

    if (tipoGet === "Pilotos") {
        document.getElementById("table").innerHTML = ``
        //Llamo a un pedido Get del servidor
        const response = await fetch('http://localhost:3000/obtenerPilotos',{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        //Tengo que usar el await porque la respuesta del servidor es lenta
        const result = await response.json()

        document.getElementById("table").innerHTML += `
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Escuderia</th>
          <th>Numero</th>
          <th>Nacionalidad</th>
          <th>Nacimiento</th>
          <th>Puntos</th>
          <th>ID</th>
        </tr>`
    
        for (i in result){
            document.getElementById("table").innerHTML += `
            <tr>
                <td>${result[i].nombre}</td>
                <td>${result[i].apellido}</td>
                <td>${result[i].escuderia}</td>
                <td>${result[i].numero}</td>
                <td>${result[i].nacionalidad}</td>
                <td>${result[i].nacimiento}</td>
                <td>${result[i].puntaje_campeonato}</td>
                <td>${result[i].piloto_ID}</td>
            </tr>
            `
        }
    } else if (tipoGet === "GP") {
        document.getElementById("table").innerHTML = ``
        const response = await fetch('http://localhost:3000/obtenerGPS',{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        document.getElementById("table").innerHTML += `
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Pista</th>
        </tr>`
    
        for (i in result){
            document.getElementById("table").innerHTML += `
            <tr>
                <td>${result[i].gp_ID}</td>
                <td>${result[i].nombre}</td>
                <td>${result[i].fecha}</td>
                <td>${result[i].pista}</td>
            </tr>
            `
        }
    } else if (tipoGet === "PilotosXGPS") {
        document.getElementById("table").innerHTML = ``
        const response = await fetch('http://localhost:3000/obtenerPilotosXGPS',{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        document.getElementById("table").innerHTML += `
        <tr>
          <th>Piloto ID</th>
          <th>GP ID</th>
          <th>Posicion</th>
          <th>Tiempo</th>
          <th>Puntos</th>
        </tr>`
    
        for (i in result){
            document.getElementById("table").innerHTML += `
            <tr>
                <td>${result[i].piloto_ID}</td>
                <td>${result[i].gp_ID}</td>
                <td>${result[i].posicion}</td>
                <td>${result[i].tiempo}</td>
                <td>${result[i].puntos}</td>
            </tr>
            `
        }
    }
}

async function envioPost() {
    //Armo un objeto para mandarlo como formato JSON
    const data = {
        input : document.getElementById("ingresoTexto").value
    }

    //Envio un pedido POST con un JSON en el body
    const response = fetch('http://localhost:3000/nombreDelPedido',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })
}
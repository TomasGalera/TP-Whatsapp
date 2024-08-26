var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3001;

const MySql = require('./modulos/mysql.js');

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
	res.status(200).send({
		message: 'Pantalla de inicio'
	});
});

app.get('/saludo', function(req,res){
    console.log(req.query); //Los pedidos get reciben los datos del req.query
    res.send({text: `Hola ${req.query.nombre}, que tal?`});
});

app.get('/obtenerPilotos', async function(req,res){
    console.log(req.query);
	const respuesta = await MySql.realizarQuery('SELECT * FROM Pilotos;');
	console.log({respuesta});
	//Le devuelve al cliente la respuesta de la base de datos
	res.send(respuesta);
})

app.get('/obtenerGPS', async function(req,res){
    console.log(req.query);
	const respuesta = await MySql.realizarQuery('SELECT * FROM GP;');
	console.log({respuesta});
	//Le devuelve al cliente la respuesta de la base de datos
	res.send(respuesta);
})

app.get('/obtenerPilotosXGPS', async function(req,res){
    console.log(req.query);
	const respuesta = await MySql.realizarQuery('SELECT * FROM PilotosXGP;');
	console.log({respuesta});
	//Le devuelve al cliente la respuesta de la base de datos
	res.send(respuesta);
})

app.get('/obtenerPilotosXGP', async function(req,res) {
	// Obtén los valores de los parámetros desde la URL
	const valor1 = req.query.piloto_ID;
	const valor2 = req.query.gp_ID;
	const result = await MySql.realizarQuery(`SELECT * FROM PilotosXGP WHERE nombre = "${valor1}";`);
	console.log(valor1);
	res.send(result);
});

app.get('/obtenerGP', async function(req,res) {
	// Obtén los valores de los parámetros desde la URL
	const valor1 = req.query.nombre;
	const result = await MySql.realizarQuery(`SELECT * FROM GP WHERE nombre = "${valor1}";`);
	console.log(valor1);
	res.send(result);
});

app.post('/insertarPiloto', async function(req, res) {
	const name = req.body.nombre;
	const lastName = req.body.apellido;
	const team = req.body.escuderia;
	const number = req.body.numero;
	const nat = req.body.nacionalidad;
	const birth = req.body.nacimiento;
	const points = req.body.puntos;
	const id = req.body.piloto_ID;
	let value = await MySql.realizarQuery(`SELECT piloto_ID FROM Pilotos WHERE piloto_ID = ${id}`);
	if (value === undefined || value.length === 0) {
		const result = MySql.realizarQuery(`INSERT INTO Pilotos (nombre, apellido, escuderia, numero, nacionalidad, nacimiento, puntaje_campeonato, piloto_ID)
		VALUES ("${name}", "${lastName}", "${team}", ${number}, "${nat}", "${birth}", ${points}, ${id})`);
		res.send({message: 'Piloto agregado a la tabla'});
	} else if (id == value[0].piloto_ID){
		res.send({message: 'El piloto ya existe en la base de datos'});
	};
});

app.post('/insertarGP', async function(req, res) {
	const name = req.body.nombre;
	const date = req.body.fecha;
	const circuit = req.body.pista;
	const id = req.body.gp_ID;
	let value = await MySql.realizarQuery(`SELECT gp_ID FROM GP WHERE gp_ID = ${id}`);
	if (value === undefined || value.length === 0){
		res.send({message:'GP agregado a la tabla'});
		const result = MySql.realizarQuery(`INSERT INTO GP (gp_ID, nombre, fecha, pista)
		VALUES (${id}, "${name}", "${date}", "${circuit}")`);
	} else if (id === value[0].gp_ID) {
		res.send({message:'El GP ya existe en la base de datos'});
	};
});

app.post('/insertarPilotosXGP', async function(req, res) {
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const position = req.body.posicion;
	const time = req.body.tiempo;
	const points = req.body.puntos;
	let value = await MySql.realizarQuery(`SELECT piloto_ID, gp_ID FROM PilotosXGP WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	if (value === undefined || value.length === 0){
		res.send({message:'Piloto por GP agregado a la tabla'});
		const result = MySql.realizarQuery(`INSERT INTO PilotosXGP (piloto_ID, gp_ID, posicion, tiempo, puntos)
		VALUES (${pilotId}, ${gpId}, ${position}, "${time}", ${points})`);
	} else if (pilotId === value[0].piloto_ID && gpId === value[0].gp_ID){
		res.send({message:'El Piloto por GP ya existe en la tabla'});
	};
});

app.put('/actualizarPiloto', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const number = req.body.numero;
	const result = await MySql.realizarQuery(`UPDATE Pilotos SET numero = "${number}" WHERE piloto_ID = ${pilotId}`);
	res.send({message:'Piloto actualizado'});
})

app.put('/actualizarGP', async function(req, res){
	const gpId = req.body.piloto_ID;
	const date = req.body.fecha;
	const result = await MySql.realizarQuery(`UPDATE Pilotos SET fecha = ${date} WHERE piloto_ID = ${gpId}`);
	res.send({message:'GP actualizado'});
})

app.put('/actualizarPilotosXGP', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const points = req.body.puntos;
	const result = await MySql.realizarQuery(`UPDATE PilotosXGP SET puntos = ${points} WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	res.send({message:'Piloto por GP actualizado'});
})

app.delete('/borrarPiloto', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const result = await MySql.realizarQuery(`DELETE FROM Pilotos WHERE piloto_ID = ${pilotId}`);
	res.send({message:'Piloto borrado'});
})

app.delete('/borrarGP', async function(req, res){
	const gpId = req.body.gp_ID;
	const result = await MySql.realizarQuery(`DELETE FROM GP WHERE gp_ID = ${gpId}`);
	res.send({message:'GP borrado'});
})

app.delete('/borrarPilotosXGP', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const result = await MySql.realizarQuery(`DELETE FROM PilotosXGP WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	res.send({message:'Piloto borrado'});
})

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
});

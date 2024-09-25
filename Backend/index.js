// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024

// Cargo librerías instaladas y necesarias
const express = require('express');						// Para el manejo del web server
const bodyParser = require('body-parser'); 				// Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql');				// Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');				// Para el manejo de las variables de sesión

const app = express();									// Inicializo express para el manejo de las peticiones

app.use(bodyParser.urlencoded({ extended: false }));	// Inicializo el parser JSON
app.use(bodyParser.json());

const LISTEN_PORT = 4000;								// Puerto por el que estoy ejecutando la página Web

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: "http://localhost:3000",            	// Permitir el origen localhost:3000
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)<

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.post('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.delete('/login', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
	res.send(null);
});

app.get('/getUsers', async function(req,res) {
	const result = await MySQL.realizarQuery(`SELECT * FROM UsersWA;`);
	res.send(result);
});

app.get('/getChats', async function(req,res) {
	const result = await MySQL.realizarQuery(`SELECT * FROM Chats;`);
	res.send(result);
});

app.get('/getChatsUsers', async function(req,res) {
	const userId = req.body.userId;
	const result = await MySQL.realizarQuery(`SELECT Chats_users.chatId, name FROM Chats_users INNER JOIN Chats ON Chats_users.chatId = Chats.chatId WHERE userId = ${userId};`);
	res.send(result);
});

app.get('/getMessages', async function(req,res) {
	const result = await MySQL.realizarQuery(`SELECT * FROM Messages;`);
	res.send(result);
});

app.post('/insertChat', async function(req, res) {
	const userId = req.body.userId;
	const name = req.body.name;
	try {
		const result = MySQL.realizarQuery(`INSERT INTO Chats (userId, name)
		VALUES ("${userId}", "${name}")`);
		res.send({message: 'Chat agregado a la tabla', result: result});
	  } catch (e) {
		logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
	  }
});

app.post('/insertUser', async function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	try {
		const result = MySQL.realizarQuery(`INSERT INTO UsersWA (username, password)
		VALUES ("${username}", "${password}")`);
		res.send({message: 'Usuario agregado a la tabla', result: result});
	  } catch (e) {
		logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
	  }
});

app.post('/insertMessage', async function(req, res) {
	const userId = req.body.userId;
	const chatId = req.body.chatId;
	const message = req.body.message;
	const name = req.body.name;
	try {
		const result = MySQL.realizarQuery(`INSERT INTO Messages (name, userId, message, chatId)
		VALUES ("${name}", "${userId}", "${message}", ${chatId})`);
		res.send({message: 'Mensasje agregado a la tabla', result: result});
	  } catch (e) {
		logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
	  }
});

io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		socket.join(req.session.room);

		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});
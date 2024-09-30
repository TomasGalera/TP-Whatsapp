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
const cors = require('cors');


const app = express();                                  // Inicializo express para el manejo de las peticiones

app.use(cors());            							// Inicializo express para el manejo de las peticiones

app.use(bodyParser.urlencoded({ extended: false }));	// Inicializo el parser JSON
app.use(bodyParser.json());

const LISTEN_PORT = 4000;								// Puerto por el que estoy ejecutando la página Web

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: ['http://localhost:3000',"http://localhost:3001"],            	// Permitir el origen localhost:3000
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

app.get('/getUsers', async function(req,res) {
	const result = await MySQL.realizarQuery(`SELECT * FROM UsersWA;`);
	res.send(result);
});

app.post('/getUser', async function(req,res) {
	const username = req.body.username
	const result = await MySQL.realizarQuery(`SELECT * FROM UsersWA WHERE username = "${username}";`);
	res.send(result);
});

app.post('/login', async function(req,res) {
	const username = req.body.username
	const password = req.body.password
	const result = await MySQL.realizarQuery(`SELECT * FROM UsersWA WHERE username = "${username}" AND password = "${password}";`);
	if (result === undefined || result.length === 0){
		res.send({message: "Usuario o contraseña incorrecta"})
	} else {
		res.send({user: result, message: "Inicio de sesión correcto"});
		console.log(result)
	}
});

app.post('/register', async function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const result = await MySQL.realizarQuery(`INSERT INTO UsersWA (username, password)
	VALUES ("${username}", "${password}")`);
	const result2 = await MySQL.realizarQuery(`SELECT * FROM UsersWA WHERE username = "${username}";`)
	if (result2 === undefined || result2.length === 0){
		res.send({message: 'Hubo un error al seleccionar el usuario'});
	} else {
		res.send({message: 'Usuario agregado a la tabla', user: result2});
	}
	console.log(result2)
});

app.post('/getChats', async function(req,res) {
	const userId = req.body.userId
	const result = await MySQL.realizarQuery(`SELECT Chats.chatId, userId, name FROM Chats INNER JOIN Chats_users ON Chats_users.chatId = Chats.chatId WHERE userId = ${userId};`);
	res.send(result);
});

app.post('/getChatsUsers', async function(req,res) {
	const userId = req.body.userId;
	const result = await MySQL.realizarQuery(`SELECT Chats_users.chatId, name FROM Chats_users INNER JOIN Chats ON Chats_users.chatId = Chats.chatId WHERE userId = ${userId};`);
	res.send({chats: result});
});

app.get('/getMessages', async function(req,res) {
	const chatId = req.body.chatId
	const result = await MySQL.realizarQuery(`SELECT * FROM Messages`);
	res.send(result);
});

app.post('/getMessagesChat', async function(req,res) {
	const chatId = req.body.chatId;
	const result = await MySQL.realizarQuery(`SELECT Messages.userId, chatId, message, username FROM Messages INNER JOIN UsersWA ON UsersWA.userId = Messages.userId WHERE chatId = ${chatId};`);
	res.send({messages: result});
});

app.post('/insertChat', async function(req, res) {
	const name = req.body.name;
	const userId = req.body.userId
	const result = await MySQL.realizarQuery(`INSERT INTO Chats (name)
	VALUES ("${name}")`);
	const result2 = await MySQL.realizarQuery(`SELECT Chats.chatId FROM Chats INNER JOIN Chats_users WHERE name = "${name}" AND userId = ${userId};`)
	res.send({message: 'Chat agregado a la tabla', result: result2});
});

app.post('/insertChats_users', async function(req, res) {
	const chatId = req.body.chatId;
	const userId1 = req.body.userId1;
	const userId2 = req.body.userId2
	try {
		const result = await MySQL.realizarQuery(`INSERT INTO Chats_users (chatId, userId)
		VALUES (${chatId}, ${userId1})`);
		const result2 = await MySQL.realizarQuery(`INSERT INTO Chats_users (chatId, userId)
		VALUES (${chatId}, ${userId2})`);
		res.send({message: 'Chat agregado a la tabla', result: result});
	  } catch (e) {
		logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
	  }
});

app.post('/insertMessage', async function(req, res) {
	const userId = req.body.userId;
	const chatId = req.body.chatId;
	const message = req.body.message;
	try {
		const result = await MySQL.realizarQuery(`INSERT INTO Messages (userId, message, chatId)
		VALUES ("${userId}", "${message}", ${chatId})`);
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

	socket.on('leaveRoom', data => {
		req.session.room = data.room;
		socket.leave(req.session.room)
	})

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('newRoom', data => {
		req.session.username = data.username
		console.log("New Room: ", data);
		io.emit('newRoom', { event: "New Room Created", user: req.session.username });
	});

	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});
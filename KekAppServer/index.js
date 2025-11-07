const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session')
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use(session({
	genid: (req) => {
		console.log(req.sessionID)
		const newId = uuidv4(); // o uuid vai servir pras sessoes
		console.log("Id novo: ", newId);
		return newId;
	},
	secret: 'segredo uiui',
	resave: false,
	saveUninitialized: true
}))

app.get('/', (req, res) => {
	res.json({ message: 'Backend funcionando! nao se esqueça de ligar o mysql!' });
});

app.post('/login', async (req, res) => {
	const { username, email, password } = req.body;

	console.log('Recebido:', username, email, password);
	try {
		const userData = await prisma.Usuario.findFirst({
			where: {
				username: username
			}
		});
		if (userData) {
			if (userData.password === password) {
				res.json({
					success: true,
					message: `Login feito com ${username}! Email: ${email}, senha: ${password}`
				});
			}
			else {
				res.json({
					success: false,
					message: 'Senha incorreta!'
				});
			}
		}
	}
	catch (error) {
		console.error('Erro ao buscar usuário:', error);
		res.json({
			success: false,
			message: 'Erro no servidor!'
		});
	}
});

app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	console.log('Recebido:', username, email, password);
	try {
		const userExists = await prisma.Usuario.findFirst({
			where: {
				username: username
			}
		});
		if (userExists) {
			return res.json({
				success: false,
				message: 'Nome de usuário já existe!'
			});
		}
		else {
			await prisma.Usuario.create({
				data: {
					username: username,
					email: email,
					password: password
				}
			});
			res.json({
				success: true,
				message: `Usuário ${username} registrado com sucesso!`
			});
		}
	}
	catch (error) {
		console.error('Erro ao registrar usuário:', error);
		res.json({
			success: false,
			message: 'Erro no servidor!'
		});
	}
});
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('beforeExit', async () => {
	await prisma.$disconnect();
});
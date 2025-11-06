const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando! nao se esqueça de ligar o mysql!' });
});

app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log('Recebido:', username, email, password);
  try{
     const Usuario = await prisma.Usuario.findFirst({
      where: { 
      username: username
      }
    });
    if (Usuario){
      if(Usuario.password === password){ 
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

app.post('/registro', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Recebido:', username, email, password);
  try {
    const userExistente = await prisma.Usuario.findFirst({ 
      where: {
        username: username
      }
    });
    if (userExistente) {
      return res.json({
        success: false,
        message: 'Nome de usuário já existe!'
      });
    }
    else{
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
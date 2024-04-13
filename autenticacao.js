const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'seu_secret_jwt_aqui'; 

let users = []; // Simulação de banco de dados em memória

app.use(bodyParser.json());

// Aceita email e senha, faz o hash da senha e armazena o usuário em um array.
app.post('/register', async (req, res) => {
    const { email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = {
        id: users.length + 1,
        email,
        senha: hashedPassword
    };

    users.push(user);
    res.status(201).send('Usuário registrado com sucesso!');
});
//Verifica se o usuário existe e se a senha corresponde. Se verdadeiro, um JWT é gerado e enviado ao usuário.
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(senha, user.senha)) {
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: "Login bem-sucedido!", token });
    } else {
        res.status(401).send('Login falhou!');
    }
});
//Verifica se o usuário existe e, se existir, envia um email de recuperação de senha.
app.post('/recover', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).send("Usuário não encontrado.");
    }
    // Enviar email de recuperação de senha 
    res.send("Email de recuperação enviado.");
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

//A função authenticateToken verifica o JWT fornecido nas requisições para as rotas protegidas, permitindo o acesso somente se o token for válido.
app.get('/private', authenticateToken, (req, res) => {
    res.send('Você está vendo uma página protegida!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());

// Banco de dados simulado para armazenar os pedidos
let pedidos = [];

// Endpoint para realizar um novo pedido
app.post('/pedido', (req, res) => {
    const novoPedido = req.body;
    novoPedido.status = 'Em andamento'; // Define o status inicial do pedido
    pedidos.push(novoPedido);
    res.status(201).json({ message: 'Pedido realizado com sucesso!', pedido: novoPedido });
});


// Endpoint para verificar o status de um pedido
app.get('/pedido/:id', (req, res) => {
    const pedidoId = req.params.id;
    const pedido = pedidos.find(pedido => pedido.id === pedidoId);
    if (!pedido) {
        res.status(404).json({ message: 'Pedido não encontrado.' });
    } else {
        const statusMensagens = {
            'Em andamento': 'Seu pedido está em andamento e será entregue em breve.',
            'Entregue': 'Seu pedido foi entregue com sucesso!',
            
            
        };
        const mensagem = statusMensagens[pedido.status] || 'Status desconhecido.';
        res.status(200).json({ status: pedido.status, message: mensagem });
    }
});


// Endpoint para reclamar sobre erro no endereço de entrega
app.put('/pedido/:id/reclamar', (req, res) => {
    const pedidoId = req.params.id;
    const novoEndereco = req.body.endereco;

    const pedido = pedidos.find(pedido => pedido.id === pedidoId);
    if (!pedido) {
        res.status(404).json({ message: 'Pedido não encontrado.' });
    } else {
        pedido.endereco = novoEndereco;
        res.status(200).json({ message: 'Endereço atualizado com sucesso!', pedido });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

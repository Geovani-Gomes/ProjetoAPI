const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Conexão com o banco de dados 
mongoose.connect('mongodb://localhost:3000/projeto pizzaria', { useNewUrlParser: true });

// Definição do modelo de pedido
const PedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  sabores: { type: Array, required: true },
  tamanho: { type: String, required: true },
  pagamento: { type: String, required: true },
  status: { type: String, default: 'Em Preparação' },
  dataHoraPedido: { type: Date, default: Date.now },
});

const Pedido = mongoose.model('Pedido', PedidoSchema);

// Criação da API Express
const app = express();

// Configuração do body parser para JSON
app.use(bodyParser.json());

// Rota para finalizar compra e salvar pedido
app.post('/pedidos', async (req, res) => {
  const { cliente, sabores, tamanho, pagamento } = req.body;

  // Validação dos dados
  if (!cliente || !sabores || !tamanho || !pagamento) {
    return res.status(400).send('Dados inválidos');
  }

  // Criação do novo pedido
  const novoPedido = new Pedido({ cliente, sabores, tamanho, pagamento });

  // Salvando o pedido no banco de dados
  try {
    await novoPedido.save();
    res.status(201).send({ message: 'Pedido realizado com sucesso!', idPedido: novoPedido._id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar o pedido');
  }
});

// Rota para acompanhar o status do pedido
app.get('/pedidos/:idPedido', async (req, res) => {
  const idPedido = req.params.idPedido;

  // Busca o pedido no banco de dados
  try {
    const pedido = await Pedido.findById(idPedido);
    if (!pedido) {
      return res.status(404).send('Pedido não encontrado');
    }

    res.status(200).send({ status: pedido.status });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o pedido');
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor iniciado na porta 3000!'));

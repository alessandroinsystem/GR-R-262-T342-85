require('dotenv').config();
const express = require('express');
const rotasEstoque = require('./rotas/rotasEstoque');
const authRota = require('./rotas/rotaAuth');
const { getChannel } = require('./messaging/publisher');

const porta = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/auth', authRota);
app.use(rotasEstoque);

app.listen(porta, () => {
  console.log(`servidor em execucao: http://localhost:${porta}`);
  // Aquece a conexão com o broker; se falhar, a API continua funcionando.
  getChannel().catch((e) => console.warn('[api] RabbitMQ indisponível no start:', e.message));
});

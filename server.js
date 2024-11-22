const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuração do servidor
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose
  .connect('mongodb://localhost:27017/notas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de Notas
const NotaSchema = new mongoose.Schema({
  materia: { type: String, required: true, unique: true },
  notaFinal: { type: Number, required: true },
});

const Nota = mongoose.model('Nota', NotaSchema);

// Rotas
app.get('/notas', async (req, res) => {
  try {
    const notas = await Nota.find();
    res.json(notas);
  } catch (err) {
    res.status(500).send('Erro ao buscar notas.');
  }
});

app.post('/notas', async (req, res) => {
  const { materia, notaFinal } = req.body;

  try {
    let nota = await Nota.findOne({ materia });

    if (nota) {
      // Atualiza nota existente
      nota.notaFinal = notaFinal;
    } else {
      // Cria nova nota
      nota = new Nota({ materia, notaFinal });
    }

    await nota.save();
    res.status(200).send('Nota salva com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar nota.');
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

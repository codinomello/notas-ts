const express = require('express');   // expressJS
const mongoose = require('mongoose'); // mongoDB
const bodyParser = require('body-parser');
const cors = require('cors');

// configuração do servidor
const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// conexão com mongoDB
mongoose
    .connect('mongodb://localhost:27017/notas')
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// modelo de notas
const NotaSchema = new mongoose.Schema({
    materia: { type: String, required: true, unique: true },
    notaFinal: { type: Number, required: true },
});

const Nota = mongoose.model('Nota', NotaSchema);

// rotas
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
        let nota = await Nota.findOne({materia});
        if (nota) {
            // atualiza nota existente
            nota.notaFinal = notaFinal;
        } else {
            // cria nova nota
            nota = new Nota({ materia, notaFinal });
        }
    await nota.save();
    res.status(200).send('Nota salva com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao salvar nota.');
    }
});

// inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
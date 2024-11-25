const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

// configuração do servidor
const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// conexão com mongoDB
mongoose
  .connect('mongodb://localhost:27017/notas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// modelo de notas
const NotaSchema = new mongoose.Schema({
  materia: { type: String, required: true, unique: true },
  notaFinal: { type: Number, required: true },
});

const Nota = mongoose.model('Nota', NotaSchema);

// função para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
  }
  
  try {
    const decoded = jwt.verify(token, 'secreta_chave_jwt');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};

// rotas de cadastro e login
app.post('/register', 
  body('username').isLength({ min: 3 }).withMessage('Nome de usuário deve ter no mínimo 3 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Usuário já existe.' });
      }

      user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10), // criptografando a senha
      });

      await user.save();
      res.status(201).json({ msg: 'Usuário registrado com sucesso.' });
    } catch (err) {
      res.status(500).send('Erro no servidor');
    }
  }
);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'secreta_chave_jwt', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// rotas de notas (protegidas por autenticação)
app.post('/notas', verifyToken, async (req, res) => {
  const { materia, notaFinal } = req.body;

  try {
    let nota = await Nota.findOne({ materia });

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

app.get('/notas', verifyToken, async (req, res) => {
  try {
    const notas = await Nota.find();
    res.json(notas);
  } catch (err) {
    res.status(500).send('Erro ao buscar notas.');
  }
});

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
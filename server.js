const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 5000;

const expressVersion = require('express/package.json').version;

// Aquí generamos un objeto JSON de ejemplo
const data = {
  'texto': 'Bienvenido Candidato 01',
  'expressVersion': expressVersion,
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  

  // Utilizamos res.json() para enviar el JSON como respuesta
  res.json(data);
});

app.listen(port, () => {
  console.log(`Servidor Express en el puerto ${port}`);
});
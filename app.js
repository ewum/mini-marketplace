const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', require('./routes/products'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
});
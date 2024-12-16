const express = require('express');
const bodyParser = require('body-parser');
const roomRoutes = require('./routes/rooms');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', roomRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Microservicio de Inventario corriendo en http://localhost:${PORT}`);
});

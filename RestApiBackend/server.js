const express = require('express');
const bodyParser = require('body-parser');
const reservationRoutes = require('./routes/reservations');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', reservationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API REST corriendo en http://localhost:${PORT}`);
});

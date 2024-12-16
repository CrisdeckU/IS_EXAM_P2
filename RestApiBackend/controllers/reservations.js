const axios = require('axios');
const { poolPromise, sql } = require('../database');
const xml2js = require('xml2js');


// Verificar disponibilidad usando el servicio SOAP
const checkAvailability = async (startDate, endDate, roomType) => {
    const soapRequest = `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <tns:CheckAvailability xmlns:tns="http://example.com/availability">
                    <startDate>${startDate}</startDate>
                    <endDate>${endDate}</endDate>
                    <roomType>${roomType}</roomType>
                </tns:CheckAvailability>
            </soap:Body>
        </soap:Envelope>
    `;

    const response = await axios.post(process.env.SOAP_URL, soapRequest, {
        headers: { 'Content-Type': 'text/xml' }
    });

    // Parsear la respuesta XML
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });
    const rooms = parsedData['soap:Envelope']['soap:Body']['tns:CheckAvailabilityResponse']['tns:rooms']['rooms']['room'];

    return Array.isArray(rooms) ? rooms : [rooms]; // Devuelve un array de habitaciones
};

// Crear una nueva reserva
const createReservation = async (req, res) => {
    const { roomType, customerName, startDate, endDate } = req.body;

    try {
        const availableRooms = await checkAvailability(startDate, endDate, roomType);

        if (availableRooms.length === 0) {
            return res.status(400).json({ message: 'No hay habitaciones disponibles.' });
        }

        const roomNumber = availableRooms[0].room_id; // Asignar la primera habitación disponible

        const pool = await poolPromise;
        await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .input('customerName', sql.NVarChar, customerName)
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .input('status', sql.NVarChar, 'Activa')
            .query(`
                INSERT INTO reservations (room_number, customer_name, start_date, end_date, status)
                VALUES (@roomNumber, @customerName, @startDate, @endDate, @status);
            `);

        res.status(201).json({ message: 'Reserva creada exitosamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Consultar una reserva
const getReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('reservationId', sql.Int, id)
            .query('SELECT * FROM reservations WHERE reservation_id = @reservationId;');

        if (!result.recordset.length) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cancelar una reserva
const cancelReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('reservationId', sql.Int, id)
            .query('DELETE FROM reservations WHERE reservation_id = @reservationId;');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        res.json({ message: 'Reserva cancelada exitosamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createReservation, getReservation, cancelReservation };

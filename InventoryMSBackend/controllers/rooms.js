const { poolPromise, sql } = require('../database');

// Registrar una nueva habitación
const registerRoom = async (req, res) => {
    const { roomNumber, roomType, status } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .input('roomType', sql.NVarChar, roomType)
            .input('status', sql.NVarChar, status)
            .query(`
                INSERT INTO rooms (room_number, room_type, status)
                VALUES (@roomNumber, @roomType, @status);
            `);

        res.status(201).json({ message: 'Habitación registrada exitosamente.' });
    } catch (err) {
        if (err.originalError?.info?.message.includes('Violation of UNIQUE KEY')) {
            res.status(400).json({ error: 'El número de habitación ya existe.' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Actualizar el estado de una habitación
const updateRoomStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('roomId', sql.Int, id)
            .input('status', sql.NVarChar, status)
            .query(`
                UPDATE rooms
                SET status = @status
                WHERE room_id = @roomId;
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Habitación no encontrada.' });
        }

        res.json({ message: 'Estado de la habitación actualizado exitosamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerRoom, updateRoomStatus };

const { sql, poolPromise } = require('./database');
const xml2js = require('xml2js');

const getAvailableRooms = async (startDate, endDate, roomType) => {
    const pool = await poolPromise;
    const query = `
        SELECT room_id, room_type, available_date, status
        FROM availability
        WHERE available_date BETWEEN @startDate AND @endDate
          AND room_type = @roomType
          AND status = 'Disponible';
    `;
    const result = await pool.request()
        .input('startDate', sql.Date, startDate)
        .input('endDate', sql.Date, endDate)
        .input('roomType', sql.NVarChar, roomType)
        .query(query);

    // Generar XML manualmente como string
    const builder = new xml2js.Builder({ rootName: 'rooms', xmldec: { version: '1.0', encoding: 'UTF-8' } });
    return builder.buildObject({ room: result.recordset });
};

module.exports = { getAvailableRooms };

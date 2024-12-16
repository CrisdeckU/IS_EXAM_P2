/*
El siguiente script fue desarrollado por Cristopher Chicaiza.

Fecha de creacion: 14-12-2024 16:31
Última versión: 14-12-2024 16:31

**********************************
-- Verificacion de existencia de la base de datos y creacion de la misma
**********************************
*/


USE Master
GO

-- Verificar si la base de datos ya existe; si existe, eliminarla
IF EXISTS(SELECT name FROM sys.databases WHERE name = 'REST_API_DB')
BEGIN
    DROP DATABASE REST_API_DB;
END

CREATE DATABASE REST_API_DB;
GO

USE REST_API_DB;
GO

--CREACIÓN TABLA RESERVATIONS
CREATE TABLE reservations (
    reservation_id INT PRIMARY KEY IDENTITY(1,1), -- Identificador único de reserva
    room_number INT NOT NULL,                     -- Número de habitación reservada
    customer_name NVARCHAR(100) NOT NULL,         -- Nombre del cliente
    start_date DATE NOT NULL,                     -- Fecha de inicio de la reserva
    end_date DATE NOT NULL,                       -- Fecha de fin de la reserva
    status NVARCHAR(20) NOT NULL                  -- Estado de la reserva (e.g., activa, cancelada)
);
GO

--INSERTS DATOS DE PRUEBA
INSERT INTO reservations (room_number, customer_name, start_date, end_date, status)
VALUES 
(101, 'Juan Pérez', '2024-12-20', '2024-12-25', 'Activa'),
(102, 'Ana Gómez', '2024-12-22', '2024-12-27', 'Cancelada');
GO
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
IF EXISTS(SELECT name FROM sys.databases WHERE name = 'SOAP_Service_DB')
BEGIN
    DROP DATABASE SOAP_Service_DB;
END

CREATE DATABASE SOAP_Service_DB;
GO

USE SOAP_Service_DB;
GO

--CREACIÓN TABLA AVAILABILITY
CREATE TABLE availability (
    room_id INT PRIMARY KEY IDENTITY(1,1), -- Identificador único para cada habitación
    room_type NVARCHAR(50) NOT NULL,       -- Tipo de habitación (e.g., simple, doble)
    available_date DATE NOT NULL,          -- Fecha de disponibilidad
    status NVARCHAR(20) NOT NULL           -- Estado (e.g., disponible, ocupado)
);
GO

--INSERTS DATOS DE PRUEBA
INSERT INTO availability (room_type, available_date, status)
VALUES 
('Single', '2024-12-20', 'Disponible'),
('Double', '2024-12-20', 'Disponible'),
('Suite', '2024-12-20', 'Ocupado');
GO
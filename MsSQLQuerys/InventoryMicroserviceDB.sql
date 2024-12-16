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
IF EXISTS(SELECT name FROM sys.databases WHERE name = 'Inventory_Microservice_DB')
BEGIN
    DROP DATABASE Inventory_Microservice_DB;
END

CREATE DATABASE Inventory_Microservice_DB;
GO

USE Inventory_Microservice_DB;
GO

--CREACIÓN DE TRABLA ROOMS
CREATE TABLE rooms (
    room_id INT PRIMARY KEY IDENTITY(1,1), -- Identificador único de la habitación
    room_number INT NOT NULL UNIQUE,       -- Número único de la habitación
    room_type NVARCHAR(50) NOT NULL,       -- Tipo de habitación (e.g., simple, doble)
    status NVARCHAR(20) NOT NULL           -- Estado de la habitación (e.g., disponible, mantenimiento)
);
GO

--INSERTS DATOS DE PRUEBA
INSERT INTO rooms (room_number, room_type, status)
VALUES 
(101, 'Single', 'Disponible'),
(102, 'Double', 'Mantenimiento'),
(103, 'Suite', 'Disponible');
GO

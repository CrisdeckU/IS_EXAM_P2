USE MASTER

-- SOAP SERVICE
SELECT * FROM SOAP_Service_DB.dbo.availability;

-- REST API
SELECT * FROM REST_API_DB.dbo.reservations;

--INVENTORY MICROSERVICE
SELECT * FROM Inventory_Microservice_DB.dbo.rooms;

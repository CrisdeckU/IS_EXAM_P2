# Proyecto IS_P2_EXA: Sistema de Gestión de Reservas Hotelera
### Creado por: Cristopher Chicaiza
Este repositorio contiene la implementación de un sistema integrado de reservas hoteleras que incluye:

1. Servicio Web SOAP: Consulta de disponibilidad de habitaciones.
2. API REST: Gestión de reservas.
3. Microservicio: Gestión del inventario de habitaciones.

## Requisitos Previos
- Node.js (versión 14+)
- SQL Server (con las bases de datos configuradas)
- Git para clonar el repositorio
- Navegador o cliente SOAP/REST como Postman

# Configuración General
1. Clona el repositorio
2. Instala las dependencias en cada carpeta de servicio:
  cd SoapServiceBE
  npm install
  cd ../RestApiBackend
  npm install
  cd ../InventoryMSBackend
  npm install
3. Configura las bases de datos usando los archivos SQL ubicados en MsSQLQuerys (Correr los Scripts en MsSQL Server)
4. Modifica el archivo .env en cada servicio usando el formato, y coloca tus propias credenciales
5. Inicia cada uno de los servicios BackEnd

## Ejecución Individual

### Servicio SOAP: Consulta de Disponibilidad
cd SoapServiceBE
npm start

### API REST: Gestión de Reservas
cd RestApiBackend
npm start

### Microservicio: Gestión del Inventario
cd InventoryMSBackend
npm start

## Ejecución Completa
cd SoapServiceBE && npm start
cd RestApiBackend && npm start
cd InventoryMSBackend && npm start


## Pruebas Documentadas
Para realizar pruebas de los servicios, se recomienda usar Postman o cualquier cliente similar.
SOAP: Envía la solicitud XML al endpoint http://localhost:3000/soap.
REST API: Realiza solicitudes HTTP a los endpoints especificados y usando los puertos elegidos.
(Revisar el documento PDF)

#### Tecnologías Utilizadas
Node.js
Express
SOAP
SQL Server
Axios
Dotenv

#### Autor
Cristopher Chicaza
2024


const express = require('express');
const soap = require('soap');
const { getAvailableRooms } = require('./availabilityService');

const app = express();

const wsdl = `
<definitions name="AvailabilityService"
  targetNamespace="http://example.com/availability"
  xmlns:tns="http://example.com/availability"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns="http://schemas.xmlsoap.org/wsdl/">

  <message name="AvailabilityRequest">
    <part name="startDate" type="xsd:date"/>
    <part name="endDate" type="xsd:date"/>
    <part name="roomType" type="xsd:string"/>
  </message>
  
  <message name="AvailabilityResponse">
    <part name="rooms" type="xsd:any"/>
  </message>
  
  <portType name="AvailabilityPortType">
    <operation name="CheckAvailability">
      <input message="tns:AvailabilityRequest"/>
      <output message="tns:AvailabilityResponse"/>
    </operation>
  </portType>
  
  <binding name="AvailabilityBinding" type="tns:AvailabilityPortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="CheckAvailability">
      <soap:operation soapAction="http://example.com/availability/CheckAvailability"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  
  <service name="AvailabilityService">
    <port name="AvailabilityPort" binding="tns:AvailabilityBinding">
      <soap:address location="http://localhost:3000/soap"/>
    </port>
  </service>
</definitions>
`;

const service = {
    AvailabilityService: {
        AvailabilityPort: {
            CheckAvailability: async (args) => {
                const { startDate, endDate, roomType } = args;

                // Obtener las habitaciones disponibles en formato XML
                const roomsXml = await getAvailableRooms(startDate, endDate, roomType);

                // Retornar el bloque XML como resultado directo
                return {
                    rooms: {
                        $xml: roomsXml // Esto indica que no debe escaparse el XML
                    }
                };
            }
        }
    }
};

app.listen(3000, () => {
    soap.listen(app, '/soap', service, wsdl);
    console.log('SOAP service running at http://localhost:3000/soap');
});

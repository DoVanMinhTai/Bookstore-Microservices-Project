# Book Store

![Swagger UI Screenshot](screenshot/image1.png)


---

## Tech Stack
- Java 17
- Spring Boot 3.4.2
- Next.js
- Keycloak
- Nginx

## Note

This project requires a `.env` file with the following configuration:

### .env

```env
POSTGRES_HOST=postgres  
POSTGRES_PORT=5432  
POSTGRES_USER=admin  
POSTGRES_PASSWORD=admin

SERVER_PORT=80  
ADC_PUBLIC_API_URL=http://api.adc.local  
ADC_SERVICES_BOOK=http://product/product  
ADC_SERVICES_CART=http://cart/cart  
ADC_SERVICES_CUSTOMER=http://customer/customer  
ADC_SERVICES_INVENTORY=http://inventory/inventory  
ADC_SERVICES_LOCATION=http://location/location  
ADC_SERVICES_MEDIA=http://media/media  
ADC_SERVICES_ORDER=http://order/order

URLS=[
  { url: 'http://api.adc.local/product/v3/api-docs', name: 'Product' },
  { url: 'http://api.adc.local/cart/v3/api-docs', name: 'Cart' },
  { url: 'http://api.adc.local/customer/v3/api-docs', name: 'Customer' },
  { url: 'http://api.adc.local/inventory/v3/api-docs', name: 'Inventory' },
  { url: 'http://api.adc.local/location/v3/api-docs', name: 'Location' },
  { url: 'http://api.adc.local/media/v3/api-docs', name: 'Media' },
  { url: 'http://api.adc.local/order/v3/api-docs', name: 'Order' }
]
```
## Installation
```
1. Edit file hosts and add the following records to your host file:
127.0.0.1 api.adc.local
127.0.0.1 pgadmin.adc.local
127.0.0.1 identity
127.0.0.1 storefront
2. Clone the repository: 
git clone https://github.com/DoVanMinhTai/BookStore.git
3. Navigate to the src folder:
cd BookStore/adc
4. Create a .env file inside the adc folder with the structure mentioned above and fill in your own service values.
5. Open terminal of your choice,go to `adc` directory, run `docker compose -f docker-compose.yml up`
6. All the containers up and running then we start source connectors by run script, open any terminal window... go to the adc root folder and type: ./start-source-connectors.sh
6. Login through the Identity API. Use the login API and assign the JWT token as Bearer token in other APIs.
Default account:
Username: admin
Password: admin
```

### You might also want to explore:
1. `http://pgadmin.yas.local/`. Account login: `admin@adc.com` / admin. Register a server: postgres, port 5432, username admin, password admin. The Postgresql server is also exposed to the host machine: servername: localhost, port: 5432, username: admin, password: admin
2. `http://api.adc.local/swagger-ui/` for all the REST API document of all the services
3. `http://identity/` for Keycloak console, account admin/admin

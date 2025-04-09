# 📚 Book Store

![Swagger UI Screenshot](screenshot/image.png)

---

## 📝 Note

This project requires a `.env` file with the following configuration:

### 🛢️ .env

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
###  Installation
- 1. Edit file hosts and add the following records to your host file:
 > 127.0.0.1 api.adc.local
 > 127.0.0.1 pgadmin.adc.local
 > 127.0.0.1 identity
 > 127.0.0.1 storefront
- 2. Clone the reponsitory git clone https://github.com/DoVanMinhTai/BookStore.git
- 3. Open the terminal in project root and change directory to src folder using: cd adc
- 4. Create .env file which has the structured like specified in the note above in the src folder and fill in your own services
- 5. Build the project using the command: docker-compose build
- 6. Please login through the login api in the Identity API and assign the JWT token to the bearer in these APIs (account: admin admin)

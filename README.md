# Don Onofre's Online Store

This project is an online store for Don Onofre, allowing customers to browse products and make payments online using the AdamsPay payment gateway.

Live demo: [https://don-onofre-joel.vercel.app](https://don-onofre-joel.vercel.app)

## Project Overview

Don Onofre's Online Store is a web application that showcases products and services, enabling customers to place orders and make online payments.
The project integrates with AdamsPay for secure payment processing.

### Features

- Product catalog display
- Shopping cart functionality
- Secure checkout process
- Integration with AdamsPay payment gateway
- Order status tracking for both customers and Don Onofre

## Technologies Used

- TypeScript
- React.js
- Next.js
- Tailwindcss
- Supabase for db deployment
- PostgreSQL
- Vercel for deployment
- AdamsPay API for payment processing

## Installation and Setup


```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to the project directory
cd [your-project-name]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your AdamsPay API credentials and other necessary variables

# Run the development server
npm run dev
```
You will need a database connection for the products if you want to deploy it by yourself. 

You can find the sql for your own db inside the project repo.

## Usage

Click on add to cart on the products you want to buy to add to the cart.

When you are ready to checkout click on the cart icon and then on the proceed to checkout button.

If you agree with the quantity and price click on proceed to payment wher you will be redirected to the payment page.

## AdamsPay Integration

This project uses AdamsPay as the payment gateway. The integration follows the AdamsPay documentation to implement the complete payment cycle.

You can find the AdamsPay documentation in here: https://wiki.adamspay.com/start

as well as the API documentation in here: https://wiki.adamspay.com/devzone:api

## Testing

Payments can be simulated using the AdamsPay simulator.

## Deployment

This project is deployed on Vercel.

The Data Base is deployed on Supabase.

# Tienda en Línea de Don Onofre

Este proyecto es una tienda en línea para Don Onofre, que permite a los clientes navegar por los productos y realizar pagos en línea utilizando la pasarela de pagos AdamsPay.

Demo: [https://don-onofre-joel.vercel.app](https://don-onofre-joel.vercel.app)




## Descripción General del Proyecto

La Tienda en Línea de Don Onofre es una aplicación web que muestra productos y servicios, permitiendo a los clientes realizar pedidos y pagos en línea. El proyecto se integra con AdamsPay para un procesamiento seguro de los pagos.

### Características

- Visualización del catálogo de productos
- Funcionalidad de carrito de compras
- Proceso de pago seguro
- Integración con la pasarela de pagos AdamsPay
- Seguimiento del estado de los pedidos tanto para clientes como para Don Onofre

## Tecnologías Utilizadas

- TypeScript
- React.js
- Next.js
- Tailwindcss
- Supabase para el despliegue de la base de datos
- PostgreSQL
- Vercel para el despliegue
- API de AdamsPay para el procesamiento de pagos

## Instalación y Configuración

```bash
# Clonar el repositorio
git clone [url-de-tu-repo]

# Navegar al directorio del proyecto
cd [nombre-de-tu-proyecto]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales de la API de AdamsPay y otras variables necesarias

# Ejecutar el servidor de desarrollo
npm run dev
```

Necesitará una conexion a una base de datos propia si es que quiere correrlo por su cuenta.

Encontrará los comandos para la creación de las tablas sql dentro del repositorio.


## Uso

Haz clic en "agregar al carrito" en los productos que deseas comprar para añadirlos al carrito.
Cuando estés listo para finalizar la compra, haz clic en el icono del carrito y luego en el botón "proceder al pago".
Si estás de acuerdo con la cantidad y el precio, haz clic en "proceder al pago", donde serás redirigido a la página de pago.

## Integración con AdamsPay

Este proyecto utiliza AdamsPay como pasarela de pagos. La integración sigue la documentación de AdamsPay para implementar el ciclo completo de pago.
Puedes encontrar la documentación de AdamsPay aquí: https://wiki.adamspay.com/start
así como la documentación de la API aquí: https://wiki.adamspay.com/devzone:api

## Pruebas

Los pagos pueden simularse utilizando el simulador de AdamsPay.

## Despliegue

Este proyecto está desplegado en Vercel.

La base de datos está desplegada en Supabase.


# REST-API-for-an-e-commerce-marketplace
# E-Commerce Marketplace API

## Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Clone the Repository
bash
git clone https://github.com/your-username/e-commerce-api.git
cd e-commerce-api

## Install Dependencies
bash
Copy code
npm install
## Configure Environment Variables
Create a .env file in the root of your project with the following content:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/e_commerce_db
JWT_SECRET=your-secret-key
Replace your-secret-key with your own secret key for JWT.

### Run the Application
bash
Copy code
npm start
The server will be running at http://localhost:5000.

## API Routes
### Authentication
 ### Register User
Endpoint: POST /api/auth/register
Body:
json
Copy code
{
  "username": "john_doe",
  "password": "your_password",
  "userType": "buyer"
}
 ### Login User
Endpoint: POST /api/auth/login
Body:
json
Copy code
{
  "username": "john_doe",
  "password": "your_password"
}
 ## Buyers
### Get List of Sellers
Endpoint: GET /api/buyer/list-of-sellers

### Get Seller's Catalog
Endpoint: GET /api/buyer/seller-catalog/:seller_id

### Create Order
Endpoint: POST /api/buyer/create-order/:seller_id
Body:
json
Copy code
{
  "items": ["615adbf967a2500012a3bc3d", "615adbf967a2500012a3bc3e"]
}
## Sellers

### Create Catalog
Endpoint: POST /api/seller/create-catalog
Body:
json
Copy code
{
  "items": ["615adbf967a2500012a3bc3d", "615adbf967a2500012a3bc3e"]
}

### Get List of Orders

Endpoint: GET /api/seller/orders

## Products
### Create Product
Endpoint: POST /api/products/create
Body:
json
Copy code
{
  "name": "Laptop",
  "price": 1000
}
### Delete Product
Endpoint: POST /api/products/remove/:productId
Get All Products
Endpoint: GET /api/products




### APIs
Following are a few examples of the API endpoints you should expose.

Auth APIs
POST /api/auth/register

Register a user (accept username, password, type of user - buyer/seller)
POST /api/auth/login

Let a previously registered user log in (e.g. retrieve authentication token)
APIs for buyers

GET /api/buyer/list-of-sellers
Get a list of all sellers
GET /api/buyer/seller-catalog/:seller_id

Get the catalog of a seller by seller_id

POST /api/buyer/create-order/:seller_id

Send a list of items to create an order for seller with id = seller_id
APIs for sellers

POST /api/seller/create-catalog

Send a list of items to create a catalog for a seller

GET /api/seller/orders
Retrieve the list of orders received by a seller

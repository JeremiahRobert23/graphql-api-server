GraphQL Product/Order/Customer API

A GraphQL API for managing Products, Orders, Customers, Employees, Offices, and Payments. This API allows performing CRUD operations on all entities and exploring relationships between them. Built using Apollo Server and Node.js.

🛠 Features

GraphQL Queries

Retrieve all or specific records for Products, Orders, Customers, Employees, Offices, Payments, OrderProducts, and Productlines.

Explore relationships between entities:

Products → Productlines

Orders → Customers → Employees

Payments → Customers

Employees → Offices and subordinates

GraphQL Mutations

Create, update, and delete records for all entities.

In-Memory Database

Sample dataset stored in db.js.

Relationships

Supports nested queries, e.g., fetch orders with their products and customer details.

📦 Technologies Used

Node.js

Apollo Server v5

GraphQL

JavaScript (ES Modules)

Optional: VSCode for development

⚡ Project Structure
graphql-api/
├─ db.js              # Sample in-memory dataset
├─ resolvers.js       # GraphQL resolvers for queries and mutations
├─ schema.js          # GraphQL typedefs (schema)
├─ index.js           # Apollo Server setup
├─ package.json       # Project metadata and dependencies
└─ README.md          # Project documentation

🚀 Installation

Clone this repository:

git clone https://github.com/your-username/graphql-api-server.git
cd graphql-api-server


Install dependencies:

npm install


Start the server:

npm start


Open your browser and navigate to:

http://localhost:4000/


You can also use Apollo Sandbox to test queries and mutations.

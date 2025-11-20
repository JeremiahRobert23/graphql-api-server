// schema.js
export const typeDefs = `#graphql
"""
GraphQL schema for Product/Order/Customer system.
Date fields are Strings for simplicity.
"""

type Productline {
  ID: ID!
  DescInText: String
  DescInHTML: String
  Image: String
  products: [Product!]
}

type Product {
  Code: ID!
  ProductlineID: ID
  Name: String!
  Scale: Int
  Vendor: String
  PdtDescription: String
  QtyInStock: Int!
  BuyPrice: Float
  MSRP: Float
  productline: Productline
  orderProducts: [OrderProduct!]
}

type OrderProduct {
  ID: ID!
  OrderID: ID!
  ProductCode: ID!
  Qty: Int!
  PriceEach: Float!
  product: Product
  order: Order
}

type Order {
  ID: ID!
  CustomerID: ID!
  OrderDate: String
  RequiredDate: String
  ShippedDate: String
  Status: Int
  Comments: String
  customer: Customer
  orderProducts: [OrderProduct!]
}

type Payment {
  CheckNumber: ID!
  CustomerID: ID!
  PaymentDate: String!
  Amount: Float!
  customer: Customer
}

type Customer {
  ID: ID!
  salesRepEmployeeNum: ID
  Name: String
  LastName: String
  FirstName: String
  Phone: String
  Address1: String
  Address2: String
  City: String
  State: String
  PostalCode: Int
  Country: String
  CreditLimit: Float
  salesRep: Employee
  orders: [Order!]
  payments: [Payment!]
}

type Employee {
  ID: ID!
  OfficeCode: ID
  reportsTo: ID
  LastName: String
  FirstName: String
  Extension: String
  Email: String
  JobTitle: String
  office: Office
  manager: Employee
  subordinates: [Employee!]
  customers: [Customer!]
}

type Office {
  Code: ID!
  City: String
  Phone: String
  Address1: String
  Address2: String
  State: String
  Country: String
  PostalCode: Int
  Territory: String
  employees: [Employee!]
}

type Query {
  # Productline
  productlines: [Productline!]
  productline(id: ID!): Productline

  # Product
  products: [Product!]
  product(code: ID!): Product

  # OrderProduct
  orderProducts: [OrderProduct!]
  orderProductById(id: ID!): OrderProduct

  # Order
  orders: [Order!]
  order(id: ID!): Order

  # Payment
  payments: [Payment!]
  payment(checkNumber: ID!): Payment

  # Customer
  customers: [Customer!]
  customer(id: ID!): Customer

  # Employee
  employees: [Employee!]
  employee(id: ID!): Employee

  # Office
  offices: [Office!]
  office(code: ID!): Office
}

# Input types for create/update (subset of fields for clarity)
input ProductlineInput {
  DescInText: String
  DescInHTML: String
  Image: String
}

input ProductInput {
  ProductlineID: ID
  Name: String!
  Scale: Int
  Vendor: String
  PdtDescription: String
  QtyInStock: Int!
  BuyPrice: Float
  MSRP: Float
}

input OrderProductInput {
  OrderID: ID!
  ProductCode: ID!
  Qty: Int!
  PriceEach: Float!
}

input OrderInput {
  CustomerID: ID!
  OrderDate: String
  RequiredDate: String
  ShippedDate: String
  Status: Int
  Comments: String
}

input PaymentInput {
  CheckNumber: ID!
  CustomerID: ID!
  PaymentDate: String!
  Amount: Float!
}

input CustomerInput {
  salesRepEmployeeNum: ID
  Name: String
  LastName: String
  FirstName: String
  Phone: String
  Address1: String
  Address2: String
  City: String
  State: String
  PostalCode: Int
  Country: String
  CreditLimit: Float
}

input EmployeeInput {
  OfficeCode: ID
  reportsTo: ID
  LastName: String
  FirstName: String
  Extension: String
  Email: String
  JobTitle: String
}

input OfficeInput {
  City: String
  Phone: String
  Address1: String
  Address2: String
  State: String
  Country: String
  PostalCode: Int
  Territory: String
}

type Mutation {
  # Productline CRUD
  addProductline(input: ProductlineInput!): Productline
  updateProductline(id: ID!, input: ProductlineInput!): Productline
  deleteProductline(id: ID!): Boolean

  # Product CRUD
  addProduct(input: ProductInput!): Product
  updateProduct(code: ID!, input: ProductInput!): Product
  deleteProduct(code: ID!): Boolean

  # OrderProduct CRUD
  addOrderProduct(input: OrderProductInput!): OrderProduct
  updateOrderProduct(id: ID!, input: OrderProductInput!): OrderProduct
  deleteOrderProduct(id: ID!): Boolean

  # Order CRUD
  addOrder(input: OrderInput!): Order
  updateOrder(id: ID!, input: OrderInput!): Order
  deleteOrder(id: ID!): Boolean

  # Payment CRUD
  addPayment(input: PaymentInput!): Payment
  updatePayment(checkNumber: ID!, input: PaymentInput!): Payment
  deletePayment(checkNumber: ID!): Boolean

  # Customer CRUD
  addCustomer(input: CustomerInput!): Customer
  updateCustomer(id: ID!, input: CustomerInput!): Customer
  deleteCustomer(id: ID!): Boolean

  # Employee CRUD
  addEmployee(input: EmployeeInput!): Employee
  updateEmployee(id: ID!, input: EmployeeInput!): Employee
  deleteEmployee(id: ID!): Boolean

  # Office CRUD
  addOffice(input: OfficeInput!): Office
  updateOffice(code: ID!, input: OfficeInput!): Office
  deleteOffice(code: ID!): Boolean
}
`
// db.js - simple in-memory dataset (expand as needed)
const productlines = [
  { ID: "1", DescInText: "Classic Cars", DescInHTML: "<p>Classic Cars</p>", Image: "classic.jpg" },
  { ID: "2", DescInText: "Motorcycles", DescInHTML: "<p>Motorcycles</p>", Image: "moto.jpg" }
];

const products = [
  { Code: "101", ProductlineID: "1", Name: "1957 Chevy", Scale: 1, Vendor: "AutoArt", PdtDescription: "Classic 1957 Chevy", QtyInStock: 10, BuyPrice: 200.0, MSRP: 350.0 },
  { Code: "102", ProductlineID: "2", Name: "Harley", Scale: 1, Vendor: "MotoCo", PdtDescription: "Harley replica", QtyInStock: 5, BuyPrice: 300.0, MSRP: 600.0 }
];

const orders = [
  { ID: "5001", CustomerID: "3001", OrderDate: "2024-10-01", RequiredDate: "2024-10-10", ShippedDate: "2024-10-03", Status: 1, Comments: "Express" }
];

const orderProducts = [
  { ID: "9001", OrderID: "5001", ProductCode: "101", Qty: 2, PriceEach: 350.0 }
];

const payments = [
  { CheckNumber: "CHK100", CustomerID: "3001", PaymentDate: "2024-10-02", Amount: 700.0 }
];

const customers = [
  { ID: "3001", salesRepEmployeeNum: "4001", Name: "Acme Co", LastName: "Co", FirstName: "Acme", Phone: "555-1111", Address1: "1 Main St", Address2: "", City: "Richmond", State: "VA", PostalCode: 23220, Country: "USA", CreditLimit: 50000.0 }
];

const employees = [
  { ID: "4001", OfficeCode: "10", reportsTo: null, LastName: "Smith", FirstName: "John", Extension: "x101", Email: "john.smith@example.com", JobTitle: "Sales Rep" }
];

const offices = [
  { Code: "10", City: "Richmond", Phone: "555-0000", Address1: "100 Office Park", Address2: "", State: "VA", Country: "USA", PostalCode: 23220, Territory: "NA" }
];

export default { productlines, products, orders, orderProducts, payments, customers, employees, offices };

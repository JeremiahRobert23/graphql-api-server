// resolvers.js
import db from "./db.js";

export const resolvers = {
  Query: {
    // Productlines
    productlines() {
      return db.productlines;
    },
    productline(_, { id }) {
      return db.productlines.find(pl => pl.ID === id);
    },

    // Products
    products() {
      return db.products;
    },
    product(_, { code }) {
      return db.products.find(p => p.Code === code);
    },

    // OrderProducts
    orderProducts() {
      return db.orderProducts;
    },
    orderProductById(_, { id }) {
      return db.orderProducts.find(op => op.ID === id);
    },

    // Orders
    orders() {
      return db.orders;
    },
    order(_, { id }) {
      return db.orders.find(o => o.ID === id);
    },

    // Payments
    payments() {
      return db.payments;
    },
    payment(_, { checkNumber }) {
      return db.payments.find(p => p.CheckNumber === checkNumber);
    },

    // Customers
    customers() {
      return db.customers;
    },
    customer(_, { id }) {
      return db.customers.find(c => c.ID === id);
    },

    // Employees
    employees() {
      return db.employees;
    },
    employee(_, { id }) {
      return db.employees.find(e => e.ID === id);
    },

    // Offices
    offices() {
      return db.offices;
    },
    office(_, { code }) {
      return db.offices.find(o => o.Code === code);
    }
  },

  // Relationship resolvers
  Productline: {
    products(parent) {
      return db.products.filter(p => p.ProductlineID === parent.ID);
    }
  },

  Product: {
    productline(parent) {
      return db.productlines.find(pl => pl.ID === parent.ProductlineID);
    },
    orderProducts(parent) {
      return db.orderProducts.filter(op => op.ProductCode === parent.Code);
    }
  },

  OrderProduct: {
    product(parent) {
      return db.products.find(p => p.Code === parent.ProductCode);
    },
    order(parent) {
      return db.orders.find(o => o.ID === parent.OrderID);
    }
  },

  Order: {
    customer(parent) {
      return db.customers.find(c => c.ID === parent.CustomerID);
    },
    orderProducts(parent) {
      return db.orderProducts.filter(op => op.OrderID === parent.ID);
    }
  },

  Payment: {
    customer(parent) {
      return db.customers.find(c => c.ID === parent.CustomerID);
    }
  },

  Customer: {
    salesRep(parent) {
      return db.employees.find(e => e.ID === parent.salesRepEmployeeNum);
    },
    orders(parent) {
      return db.orders.filter(o => o.CustomerID === parent.ID);
    },
    payments(parent) {
      return db.payments.filter(p => p.CustomerID === parent.ID);
    }
  },

  Employee: {
    office(parent) {
      return db.offices.find(o => o.Code === parent.OfficeCode);
    },
    manager(parent) {
      if (!parent.reportsTo) return null;
      return db.employees.find(e => e.ID === parent.reportsTo);
    },
    subordinates(parent) {
      return db.employees.filter(e => e.reportsTo === parent.ID);
    },
    customers(parent) {
      return db.customers.filter(c => c.salesRepEmployeeNum === parent.ID);
    }
  },

  Office: {
    employees(parent) {
      return db.employees.filter(e => e.OfficeCode === parent.Code);
    }
  },

  // Mutations
  Mutation: {
    /* Productline CRUD */
    addProductline(_, { input }) {
      const nextId = (db.productlines.length ? Math.max(...db.productlines.map(p => Number(p.ID))) + 1 : 1).toString();
      const pl = { ID: nextId, ...input };
      db.productlines.push(pl);
      return pl;
    },
    updateProductline(_, { id, input }) {
      const idx = db.productlines.findIndex(p => p.ID === id);
      if (idx === -1) return null;
      db.productlines[idx] = { ...db.productlines[idx], ...input };
      return db.productlines[idx];
    },
    deleteProductline(_, { id }) {
      const startLen = db.productlines.length;
      db.productlines = db.productlines.filter(p => p.ID !== id);
      return db.productlines.length < startLen;
    },

    /* Product CRUD */
    addProduct(_, { input }) {
      const nextCode = (db.products.length ? Math.max(...db.products.map(p => Number(p.Code))) + 1 : 100).toString();
      const product = { Code: nextCode, ...input };
      db.products.push(product);
      return product;
    },
    updateProduct(_, { code, input }) {
      const idx = db.products.findIndex(p => p.Code === code);
      if (idx === -1) return null;
      db.products[idx] = { ...db.products[idx], ...input };
      return db.products[idx];
    },
    deleteProduct(_, { code }) {
      const startLen = db.products.length;
      db.products = db.products.filter(p => p.Code !== code);
      return db.products.length < startLen;
    },

    /* OrderProduct CRUD */
    addOrderProduct(_, { input }) {
      const nextId = (db.orderProducts.length ? Math.max(...db.orderProducts.map(op => Number(op.ID))) + 1 : 9000).toString();
      const op = { ID: nextId, ...input };
      db.orderProducts.push(op);
      return op;
    },
    updateOrderProduct(_, { id, input }) {
      const idx = db.orderProducts.findIndex(op => op.ID === id);
      if (idx === -1) return null;
      db.orderProducts[idx] = { ...db.orderProducts[idx], ...input };
      return db.orderProducts[idx];
    },
    deleteOrderProduct(_, { id }) {
      const startLen = db.orderProducts.length;
      db.orderProducts = db.orderProducts.filter(op => op.ID !== id);
      return db.orderProducts.length < startLen;
    },

    /* Order CRUD */
    addOrder(_, { input }) {
      const nextId = (db.orders.length ? Math.max(...db.orders.map(o => Number(o.ID))) + 1 : 5000).toString();
      const o = { ID: nextId, ...input };
      db.orders.push(o);
      return o;
    },
    updateOrder(_, { id, input }) {
      const idx = db.orders.findIndex(o => o.ID === id);
      if (idx === -1) return null;
      db.orders[idx] = { ...db.orders[idx], ...input };
      return db.orders[idx];
    },
    deleteOrder(_, { id }) {
      const startLen = db.orders.length;
      db.orders = db.orders.filter(o => o.ID !== id);
      return db.orders.length < startLen;
    },

    /* Payment CRUD */
    addPayment(_, { input }) {
      const p = { ...input };
      db.payments.push(p);
      return p;
    },
    updatePayment(_, { checkNumber, input }) {
      const idx = db.payments.findIndex(p => p.CheckNumber === checkNumber);
      if (idx === -1) return null;
      db.payments[idx] = { ...db.payments[idx], ...input };
      return db.payments[idx];
    },
    deletePayment(_, { checkNumber }) {
      const startLen = db.payments.length;
      db.payments = db.payments.filter(p => p.CheckNumber !== checkNumber);
      return db.payments.length < startLen;
    },

    /* Customer CRUD */
    addCustomer(_, { input }) {
      const nextId = (db.customers.length ? Math.max(...db.customers.map(c => Number(c.ID))) + 1 : 3000).toString();
      const c = { ID: nextId, ...input };
      db.customers.push(c);
      return c;
    },
    updateCustomer(_, { id, input }) {
      const idx = db.customers.findIndex(c => c.ID === id);
      if (idx === -1) return null;
      db.customers[idx] = { ...db.customers[idx], ...input };
      return db.customers[idx];
    },
    deleteCustomer(_, { id }) {
      const startLen = db.customers.length;
      db.customers = db.customers.filter(c => c.ID !== id);
      return db.customers.length < startLen;
    },

    /* Employee CRUD */
    addEmployee(_, { input }) {
      const nextId = (db.employees.length ? Math.max(...db.employees.map(e => Number(e.ID))) + 1 : 4000).toString();
      const e = { ID: nextId, ...input };
      db.employees.push(e);
      return e;
    },
    updateEmployee(_, { id, input }) {
      const idx = db.employees.findIndex(e => e.ID === id);
      if (idx === -1) return null;
      db.employees[idx] = { ...db.employees[idx], ...input };
      return db.employees[idx];
    },
    deleteEmployee(_, { id }) {
      const startLen = db.employees.length;
      db.employees = db.employees.filter(e => e.ID !== id);
      return db.employees.length < startLen;
    },

    /* Office CRUD */
    addOffice(_, { input }) {
      const nextCode = (db.offices.length ? Math.max(...db.offices.map(o => Number(o.Code))) + 1 : 10).toString();
      const o = { Code: nextCode, ...input };
      db.offices.push(o);
      return o;
    },
    updateOffice(_, { code, input }) {
      const idx = db.offices.findIndex(o => o.Code === code);
      if (idx === -1) return null;
      db.offices[idx] = { ...db.offices[idx], ...input };
      return db.offices[idx];
    },
    deleteOffice(_, { code }) {
      const startLen = db.offices.length;
      db.offices = db.offices.filter(o => o.Code !== code);
      return db.offices.length < startLen;
    }
  }
};

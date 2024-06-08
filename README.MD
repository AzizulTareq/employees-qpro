# Employee Hierarchy API

## Description

This project is an Employee Hierarchy API built with Express.js and MySQL. It allows users to:

- Fetch the hierarchical structure of employees based on their positions.
- Add new employees to the database.
- Authenticate using JWT.

## Features

- **JWT Authentication:** Secure your endpoints with JWT tokens.
- **Employee Hierarchy:** Retrieve hierarchical data of employees.
- **Add Employees:** Insert new employee records into the database.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12.x or higher)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AzizulTareq/employees-qpro.git
   cd employees-qpro
   ```

2. **Install the dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a .env file in the project root

   ```bash
   DATABASE_URL=mysql://user:password@localhost:3306/employees_db_dev
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up the database:**
   Ensure MySQL is running and execute the following to create the database and table:

   ```bash
    CREATE DATABASE employees_db_dev;
    USE employees_db_dev;
    CREATE TABLE Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    positionId INT NOT NULL,
    positionName VARCHAR(255) NOT NULL,
    parentId INT
   );
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

6. **Seed the database (Optional):**
   If you want to add some demo data to the database, create a seed.js file and run it:

   ```bash
   node seed.js
   ```

7. **Testing the API with Postman:**
   Login and obtain JWT Token:

- Method: POST
- URL: http://localhost:3000/api/login

**Body**

```bash
{
  "username": "admin",
  "password": "password"
}
```

- Copy the accessToken from the response.

8. **Add a new employee:**
   Login and obtain JWT Token:

- Method: POST
- URL: http://localhost:3000/api/login
  **Header**
- Authorization: Bearer your_jwt_token

**Body**

```bash
{
  "name": "Jane Doe",
  "positionId": 2,
  "positionName": "Senior Software Engineer",
  "parentId": 1
}

```

- Copy the accessToken from the response.

9. **Fetch employee hierarchy:**

- Method: GET
- URL: http://localhost:3000/api/employees/1
  **Header**
- Authorization: Bearer your_jwt_token

## Logging

1. **Use a Logging Library:**
   Integrate a logging library like winston to manage different levels of logs (info, warn, error).

```bash
npm install winston
```

2. **Configure Logging:**
   Create a logger.js file to configure the logger:

```bash
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;
```

3. **Use the Logger:**
   Replace console.log with the logger in your application:
   ```bash
   const logger = require('./logger');
   logger.info('Server running at http://localhost:3000');
   logger.error('Failed to create employee');
   ```

## Monitoring

1. **Use a Monitoring Tool:**
   Integrate a tool like Prometheus with Grafana for metrics collection and visualization.

2. **Integrate Metrics Collection:**
   Use express-prom-bundle for Prometheus metrics collection in your Express application:
   ```bash
   npm install express-prom-bundle
   ```
3. **Set Up Metrics Middleware:**
   ```bash
   const promBundle = require("express-prom-bundle");
   const metricsMiddleware = promBundle({ includeMethod: true });
   app.use(metricsMiddleware);
   ```
4. **Set Up Alerts:**
   Configure Prometheus and Grafana to set up alerts for critical metrics (e.g., high error rates, latency).

By implementing structured logging and monitoring, you can ensure your application remains reliable, and you can quickly identify and resolve issues as they arise.

## Optimization

To ensure that the API can support 5000 simultaneous calls and handle 1 million records with a response time of less than a second, we need to consider several optimization techniques across different layers of the application. Here's a comprehensive approach.

- Indexing in database to reduce the data retriving time.
- Optimize SQL queries to minimize the load on the database. Use EXPLAIN to analyze query performance.
- Use a connection pool to manage database connections efficiently.
- Implement caching to reduce database load and speed up responses. Use Redis for caching hierarchical data.
- Use a load balancer (e.g., NGINX, HAProxy) to distribute incoming traffic across multiple instances of your API.
- Deploy your application in a cloud environment that supports auto-scaling (e.g., AWS, Azure, GCP).

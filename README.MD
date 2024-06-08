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
   git clone https://github.com/yourusername/employee-hierarchy-api.git
   cd employee-hierarchy-api
   ```

2. **Set up environment variables:**

   ```bash
   DATABASE_URL=mysql://user:password@localhost:3306/employees_db_dev
   JWT_SECRET=your_jwt_secret
   ```

3. **Set up the database:**
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

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Seed the database (Optional):**
   If you want to add some demo data to the database, create a seed.js file and run it:

   ```bash
   node seed.js
   ```

6. **Testing the API with Postman:**

# Login and obtain JWT Token:

# Method: POST

- URL: http://localhost:3000/api/login

**Body**

```bash
{
  "username": "admin",
  "password": "password"
}
```

- Copy the accessToken from the response.

7. **Add a new employee:**

# Login and obtain JWT Token:

# Method: POST

- URL: http://localhost:3000/api/login
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

8. **Fetch employee hierarchy:**

# Method: GET

- URL: http://localhost:3000/api/employees/1
- Authorization: Bearer your_jwt_token

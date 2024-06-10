const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const { promisify } = require("util");
require("dotenv").config();

const app = express();
const port = 3000;
const user = {
  username: "admin",
  // password: await bcrypt.hash("password", 10),
};
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

const Employee = sequelize.define(
  "Employee",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    positionId: { type: DataTypes.INTEGER, allowNull: false },
    positionName: { type: DataTypes.STRING, allowNull: false },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "Employees",
  }
);

const authenticateJWT = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization === true);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(new AppError("you are not login ", 401));
  }
  console.log(`process.env.JWT_SECRET`, process.env.JWT_SECRET);
  if (token) {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("40", decode);
    if (user.username === decode.username) {
      next();
    }
  } else {
    res.sendStatus(401);
  }
};

// Helper function to build hierarchy
const buildHierarchy = async (parentId) => {
  const employees = await Employee.findAll({ where: { parentId } });
  return Promise.all(
    employees.map(async (employee) => ({
      id: employee.id,
      name: employee.name,
      positionId: employee.positionId,
      positionName: employee.positionName,
      children: await buildHierarchy(employee.id),
    }))
  );
};

app.get("/api/employees/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  console.log(85, id);
  const hierarchy = await buildHierarchy(id);
  res.json(hierarchy);
});

app.post("/api/employees", authenticateJWT, async (req, res) => {
  const { name, positionId, positionName, parentId } = req.body;

  try {
    const newEmployee = await Employee.create({
      name,
      positionId,
      positionName,
      parentId,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Dummy user
  const user = {
    username: "admin",
    password: await bcrypt.hash("password", 10),
  };

  if (
    username === user.username &&
    (await bcrypt.compare(password, user.password))
  ) {
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;

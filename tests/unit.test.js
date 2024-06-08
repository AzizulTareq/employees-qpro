const { Sequelize, DataTypes } = require("sequelize");
const { expect } = require("@jest/globals");

describe("Employee Model", () => {
  const sequelize = new Sequelize("sqlite::memory:", { logging: false });

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

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("should create an employee", async () => {
    const employee = await Employee.create({
      name: "John Doe",
      positionId: 1,
      positionName: "CTO",
      parentId: null,
    });

    expect(employee.name).toBe("John Doe");
  });
});

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/users", (req, res) => {
  try {
    prisma.user.findMany().then((users) => {
      const data = {
        code: 200,
        message: "Success",
        data: users,
      };
      res.json(data);
    });
  } catch (error) {
    const data = {
      code: 500,
      message: "Internal Server Error",
      data: error,
    };
    res.json(data);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

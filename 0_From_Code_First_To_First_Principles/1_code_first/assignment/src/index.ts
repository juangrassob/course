import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/user/new", async (req, res) => {
  const { email, username, firstName, lastName } = req.body.data;

  if (!email || !username || !firstName || !lastName) {
    return res
      .status(400)
      .json({ success: false, error: "Missing mandatory fields." });
  }

  const conflictUsers = await prisma.user.findMany({
    where: { email, username },
  });

  if (conflictUsers.length) {
    return res.status(400).json({
      success: false,
      error: "The email or username are already taken.",
    });
  }

  await prisma.user.create({
    data: { email, username, firstName, lastName },
  });

  return res.status(201).json({ success: true });
});

app.put("/user/edit/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const { email, username, firstName, lastName } = req.body.data;

  if (email || username) {
    return res.status(400).json({
      success: false,
      error: "You can't modify the email and username fields.",
    });
  }

  if (!firstName && !lastName) {
    return res.status(400).json({
      success: false,
      error: "You must at least modify one field.",
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "The user was not found",
    });
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName,
      lastName,
    },
  });

  return res.status(200).json({ success: true });
});

app.get("/user", async (req, res) => {
  if (!req?.query?.email) {
    return res.status(400).json({
      success: false,
      error: "You must specify a user email.",
    });
  }

  const email = String(req.query.email);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "The user was not found",
    });
  }

  return res.status(200).json({ success: true, data: { user } });
});

const APP_PORT = 3000;
const APP_URL = "127.0.0.1";

app.listen(APP_PORT, () =>
  console.log(`App listening at: http://${APP_URL}:${APP_PORT}`)
);

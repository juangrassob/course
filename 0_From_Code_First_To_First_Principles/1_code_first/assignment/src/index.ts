import express from "express";

const app = express();

app.use(express.json());

app.post("/user/new", (req, res) => {
  const { email, username, firstName, lastName } = req.body.data;

  if (!email || !username || !firstName || !lastName) {
    return res
      .status(400)
      .json({ success: false, error: "Missing mandatory fields." });
  }

  return res.status(201).json({ success: true });
});

app.put("/user/edit/:userId", (req, res) => {
  const { email, username, firstName, lastName } = req.body.data;

  if (email) {
    return res
      .status(400)
      .json({ success: false, error: "You can't modify the email field." });
  }

  if (!username && !firstName && !lastName) {
    return res.status(400).json({
      success: false,
      error: "You must at least modify one field.",
    });
  }

  return res.status(200).json({ success: true });
});

app.get("/user", (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "You must specify a user email.",
    });
  }

  return res.status(200).json({ success: true, data: { user: {} } });
});

const APP_PORT = 3000;
const APP_URL = "127.0.0.1";

app.listen(APP_PORT, () =>
  console.log(`App listening at: http://${APP_URL}:${APP_PORT}`)
);

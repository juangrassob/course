import express from "express";

const app = express();

app.use(express.json());

app.post("/user/new", (req, res) => {
  res.status(201).json({ success: true });
});
app.put("/user/edit/:userId", (req, res) => {
  res.status(200).json({ success: true });
});
app.get("/user", (req, res) => {
  res.status(200).json({ success: true, data: { user: {} } });
});

const APP_PORT = 3000;
const APP_URL = "127.0.0.1";

app.listen(APP_PORT, () =>
  console.log(`App listening at: http://${APP_URL}:${APP_PORT}`)
);

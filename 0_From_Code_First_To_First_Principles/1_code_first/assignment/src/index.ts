import express from "express";

const app = express();

app.use(express.json());

const APP_PORT = 3000;
const APP_URL = "127.0.0.1";

app.listen(APP_PORT, () =>
  console.log(`App listening at: http://${APP_URL}:${APP_PORT}`)
);

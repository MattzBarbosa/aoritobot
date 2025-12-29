import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "aorus-bot";

// health check
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// webhook verification (Meta)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// receive WhatsApp events
app.post("/webhook", (req, res) => {
  res.sendStatus(200);
  console.log("EVENT RECEIVED:", JSON.stringify(req.body, null, 2));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Bot running on port", port);
});

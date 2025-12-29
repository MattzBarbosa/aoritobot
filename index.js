import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "aorito123"; // TEM que ser igual ao da Meta

// 🔐 Verificação do Webhook (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// 📩 Receber eventos (POST)
app.post("/webhook", (req, res) => {
  console.log("EVENT RECEIVED:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Bot running on port", port);
});

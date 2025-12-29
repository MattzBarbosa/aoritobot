import express from "express";

const app = express();

// Twilio manda x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/webhook", (req, res) => {
  const msg = req.body.Body || "";

  console.log("Mensagem recebida:", msg);

  let reply = "Não entendi 😅";

  if (msg.toLowerCase() === "oi") reply = "Fala! 😎";
  if (msg.toLowerCase() === "help") reply = "Comandos: oi, help, status";
  if (msg.toLowerCase() === "status") reply = "Bot online 🚀";

  res.type("text/xml");
  res.send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Bot rodando na porta", port);
});

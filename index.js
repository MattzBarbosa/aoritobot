import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const msg = req.body.Body;
  const from = req.body.From;

  console.log("Mensagem recebida:", msg, "de", from);

  // resposta simples
  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>Recebi: ${msg}</Message>
    </Response>
  `);
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Bot rodando na porta", port);
});

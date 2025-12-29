app.post("/webhook", (req, res) => {
  const msg = req.body.Body?.toLowerCase() || "";

  let reply = "Não entendi 😅";

  if (msg === "oi") reply = "Fala! 😎";
  if (msg === "help") reply = "Comandos: oi, help, status";
  if (msg === "status") reply = "Bot online 🚀";
  if (msg === "victor") reply = "Mamador 🍆🍆🍆";

  res.type("text/xml");
  res.send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
});

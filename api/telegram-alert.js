export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { tipo, nombre, correo, telefono, plan, precio, payment_id } = req.body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const emoji = tipo === "pago" ? "🟢" : "🟠";
    const titulo = tipo === "pago" ? "PAGO APROBADO PATAN TV" : "NUEVO LEAD PATAN TV";

    const text = `${emoji} ${titulo}

👤 Cliente: ${nombre || ""}
📦 Plan: ${plan || ""}
💰 Precio: $${Number(precio || 0).toLocaleString("es-CL")}
📧 Correo: ${correo || ""}
📱 WhatsApp: ${telefono || ""}
${payment_id ? "🧾 Payment ID: " + payment_id : ""}`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Error enviando alerta Telegram",
      detail: error.message
    });
  }
}

export default async function handler(req, res) {
  try {
    const XTREAM_URL = process.env.XTREAM_URL;
    const XTREAM_USER = process.env.XTREAM_USER;
    const XTREAM_PASS = process.env.XTREAM_PASS;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const CATEGORY_ID = "228";

    if (!XTREAM_URL || !XTREAM_USER || !XTREAM_PASS || !TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({
        ok: false,
        error: "Faltan variables de entorno",
        required: [
          "XTREAM_URL",
          "XTREAM_USER",
          "XTREAM_PASS",
          "TELEGRAM_TOKEN",
          "TELEGRAM_CHAT_ID"
        ]
      });
    }

    const xtreamApiUrl =
      `${XTREAM_URL}/player_api.php?username=${encodeURIComponent(XTREAM_USER)}` +
      `&password=${encodeURIComponent(XTREAM_PASS)}` +
      `&action=get_live_streams&category_id=${CATEGORY_ID}`;

    const xtreamResponse = await fetch(xtreamApiUrl);
    const events = await xtreamResponse.json();

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(200).json({
        ok: false,
        message: "No hay eventos deportivos disponibles hoy."
      });
    }

    const cleanEvents = events
      .slice(0, 35)
      .map((event) => {
        const rawName = event.name || "Evento sin nombre";

        const cleanedName = rawName
          .replace(/\n/g, " ")
          .replace(/\r/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        return `• ${cleanedName}`;
      });

    const message =
`🔥 EVENTOS DE HOY | PATAN SPORTS HUB

${cleanEvents.join("\n")}

📺 Disponible en PATAN SPORTS HUB
😎 No seas Patán… disfruta del contenido.`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    const telegramData = await telegramResponse.json();

    return res.status(200).json({
      ok: true,
      telegram_sent: telegramData.ok,
      telegram_response: telegramData,
      total_events: events.length,
      preview: message
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
  

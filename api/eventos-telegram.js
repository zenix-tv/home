export default async function handler(req, res) {
  try {
    const XTREAM_URL = process.env.XTREAM_URL;
    const XTREAM_USER = process.env.XTREAM_USER;
    const XTREAM_PASS = process.env.XTREAM_PASS;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const CATEGORY_ID = "228";

    const url = `${XTREAM_URL}/player_api.php?username=${XTREAM_USER}&password=${XTREAM_PASS}&action=get_live_streams&category_id=${CATEGORY_ID}`;

    const response = await fetch(url);
    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(200).json({ ok: false, message: "No hay eventos disponibles" });
    }

    const cleanEvents = events
      .slice(0, 30)
      .map((e) => {
        let name = e.name || "";
        name = name.replace(/^\d{1,2}:\d{2}\s*[-|]?\s*/g, "");
        return `• ${name}`;
      });

    const message =
`🔥 EVENTOS DE HOY | PATAN SPORTS HUB

${cleanEvents.join("\n")}

📺 Disponible en PATAN SPORTS HUB
😎 No seas Patán… disfruta del contenido.`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    const tgData = await tgResponse.json();

    return res.status(200).json({
      ok: true,
      sent: tgData.ok,
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

    export default async function handler(req, res) {
  try {
    const XTREAM_URL = process.env.XTREAM_URL;
    const XTREAM_USER = process.env.XTREAM_USER;
    const XTREAM_PASS = process.env.XTREAM_PASS;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const CATEGORY_ID = "228";
    const HEADER_IMAGE_URL = "https://www.patan.tv/file_00000000ddcc71f48e02b1504fe3995d.png";

    const ANDROID_APP_URL = process.env.ANDROID_APP_URL || "https://www.patan.tv/app";
    const WEB_PLAYER_URL = process.env.WEB_PLAYER_URL || "https://www.patan.tv";
    const SUPPORT_URL = process.env.SUPPORT_URL || "https://t.me/patantv";

    if (!XTREAM_URL || !XTREAM_USER || !XTREAM_PASS || !TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({
        ok: false,
        error: "Faltan variables de entorno"
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

    const cleanEvents = events.slice(0, 35).map((event) => {
      const name = (event.name || "Evento sin nombre")
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return `• ${name}`;
    });

    const message =
`🔥 EVENTOS DE HOY | PATAN SPORTS HUB

${cleanEvents.join("\n")}

📲 Elige cómo quieres verlo:
Android TV / Móvil o Web para PC.

😎 No seas Patán… disfruta del contenido.`;

    const photoResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          photo: HEADER_IMAGE_URL,
          caption: "🔥 EVENTOS DE HOY | PATAN SPORTS HUB"
        })
      }
    );

    const photoData = await photoResponse.json();

    const messageResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          reply_markup: {
            inline_keyboard: [
              [{ text: "📱 Abrir App Android", url: ANDROID_APP_URL }],
              [{ text: "💻 Ver en PC / Web", url: WEB_PLAYER_URL }],
              [{ text: "🛠 Soporte PATAN TV", url: SUPPORT_URL }]
            ]
          }
        })
      }
    );

    const messageData = await messageResponse.json();

    return res.status(200).json({
      ok: true,
      photo_sent: photoData.ok,
      photo_response: photoData,
      message_sent: messageData.ok,
      message_response: messageData,
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

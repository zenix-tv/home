export default async function handler(req, res) {
  try {
    const baseUrl = `https://${req.headers.host}`;

    const response = await fetch(`${baseUrl}/api/telegram-alert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tipo: "lead",
        nombre: "PRUEBA PATAN",
        correo: "test@patan.tv",
        telefono: "56900000000",
        plan: "TEST",
        precio: 9990
      })
    });

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      status: response.status,
      telegram_response: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}

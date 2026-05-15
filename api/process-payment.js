export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { nombre, correo, telefono, plan } = req.body;

    const planes = {
      "1mes": {
        title: "PATAN 1 MES",
        price: 9990
      },
      "3meses": {
        title: "PATAN 3 MESES",
        price: 24990
      },
      "12meses": {
        title: "PATAN 12 MESES",
        price: 69990
      }
    };

    const planData = planes[plan] || planes["1mes"];

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
        },

        body: JSON.stringify({

          items: [
            {
              title: planData.title,
              quantity: 1,
              currency_id: "CLP",
              unit_price: planData.price
            }
          ],

          payer: {
            name: nombre,
            email: correo,
            phone: {
              number: telefono
            }
          },

          back_urls: {
            success: "https://www.patan.tv/pago-exitoso.html",
            failure: "https://www.patan.tv/pago-error.html",
            pending: "https://www.patan.tv/pago-pendiente.html"
          },

          auto_return: "approved"

        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const body = req.body;

    const cliente = body.cliente || {};

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "X-Idempotency-Key": `${Date.now()}-${Math.random()}`
      },
      body: JSON.stringify({
        transaction_amount: Number(body.transaction_amount),
        token: body.token,
        description: body.description,
        installments: Number(body.installments),
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuer_id,
        
payer: {
  email: body.payer.email,
  identification: {
    type: "RUT",
    number: body.payer.identification.number
  }
},
metadata: {
          cliente_nombre: cliente.nombre || "",
          cliente_correo: cliente.correo || "",
          cliente_telefono: cliente.telefono || "",
          cliente_plan: cliente.plan || "",
          cliente_precio: cliente.precio || ""
        }
      })
    });

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Error procesando pago",
      detail: error.message
    });
  }
}

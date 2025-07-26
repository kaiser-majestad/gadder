const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del transportador con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Función para enviar correo de bienvenida
const enviarBienvenida = async (email, nombre, tipo) => {
  // Limpieza de datos
  email = String(email || '').trim();
  nombre = String(nombre || '').trim();
  tipo = String(tipo || '').trim();

  // Validación básica
  const validarEmail = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!validarEmail(email)) {
    console.error("❌ Email inválido:", `"${email}"`);
    return;
  }

  console.log(`📧 Enviando correo de bienvenida a ${nombre} (${email}) como ${tipo}`);

  const mensajeHtml = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Bienvenido a Gadder</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f0f0f5; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.1);">
            
            <tr>
              <td align="center" style="background-color: #0d47a1; padding: 40px 20px;">
                <img src="https://i.postimg.cc/kMTVKR0T/horse.webp" width="90" height="auto" alt="Logo Gadder" style="margin-bottom: 15px;" />
                <h1 style="color: white; font-size: 26px; margin: 0;">¡Bienvenido/a a Gadder, ${nombre}!</h1>
                <p style="color: #e0e0e0; font-size: 14px; margin-top: 10px;">El lugar donde tu rendimiento cobra vida 💪</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 35px 30px; color: #333;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  🎉 Felicidades por formar parte de esta gran familia deportiva.
                </p>
                <p style="font-size: 15px; line-height: 1.6;">
                  Ahora como <strong>${tipo.toUpperCase()}</strong> podrás disfrutar de herramientas diseñadas para potenciar tu rendimiento.
                </p>
                <p style="font-size: 15px; line-height: 1.6;">
                  Gadder es un ecosistema creado para transformar tu entrenamiento en una experiencia medible, planificada y eficiente.
                </p>
                <p style="font-size: 15px; line-height: 1.6;">
                  Controla tu progreso, registra tus logros, evalúa tus métricas, previene lesiones y conéctate con tu equipo. ¡Entrena con propósito!
                </p>
                <p style="font-size: 15px; line-height: 1.6;">
                  ¡Nos alegra tenerte con nosotros! 💥
                </p>

                <div style="text-align: center; margin: 35px 0;">
                  <a href="https://gadder.com" target="_blank"
                    style="background-color: #0d47a1; color: white; padding: 14px 32px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; font-size: 15px;">
                    Explorar Gadder
                  </a>
                </div>

                <img src="https://i.imgur.com/4ZKZATC.png" alt="Entrenamiento" width="100%" style="border-radius: 8px;" />

                <p style="font-size: 13px; text-align: center; color: #999; margin-top: 25px;">
                  💙 Equipo Gadder <br />
                  <em>"Tu rendimiento, nuestra misión"</em>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Gadder - Plataforma Deportiva" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Bienvenido a Gadder",
      html: mensajeHtml
    });
    console.log("✅ Correo enviado exitosamente");
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};

module.exports = { enviarBienvenida };

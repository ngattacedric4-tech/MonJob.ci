export async function sendTelegramNotification(message: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID doivent etre definis dans .env.local");
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'envoi de la notification: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification Telegram:", error);
  }
}

export const config = {
  runtime: 'edge', // Menggunakan Edge Runtime agar streaming lebih cepat
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { question } = await req.json();

  const payload = {
    chatId: "6c35194a-a004-4efe-980a-df317eb105b7",
    model: "claude-haiku-4-5-20251001",
    messages: [
      { id: "fcebb6f5-2d7c-42c0-a177-ced59262c453", role: "user", content: question },
      { id: "4aad5888-14ec-4dbb-9d1f-ac8b243565e3", role: "system", content: "" }
    ],
    personaId: "claude-haiku-4-5-landing",
    stream: true,
    temperature: 0.5,
  };

  const response = await fetch('https://api.overchat.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Platform': 'web',
      'Origin': 'https://overchat.ai'
    },
    body: JSON.stringify(payload)
  });

  // Mengirim balik stream dari Overchat ke browser pengguna
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}

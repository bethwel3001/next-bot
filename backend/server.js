require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300
      })
    });
    const { choices } = await r.json();
    res.json({ answer: choices[0].message.content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

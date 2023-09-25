const axios = require("axios");

const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

const PORT = process.env.PORT || 5000;

// Proxy endpoint for OpenAI API
app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body;

    // OpenAI API settings
    const openaiApiKey = "YOUR_OPENAI_API_KEY_HERE";
    const openaiApiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
    };

    try {
        const response = await axios.post(openaiApiUrl, { prompt, max_tokens: 100 }, { headers });
        res.json({ generatedText: response.data.choices[0].text });
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        res.status(500).json({ error: "Failed to generate text" });
    }
});
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

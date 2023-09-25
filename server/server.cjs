const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

const LOG_FILE = path.join(__dirname, 'api_logs.csv');

function logApiCall(prompt, response) {
    // Cleaning and formatting the content for CSV
    const formattedPrompt = prompt.replace(/(\r\n|\n|\r|,)/gm, ";");
    const formattedResponse = JSON.stringify(response).replace(/(\r\n|\n|\r|,)/gm, ";");
    
    const logEntry = `${new Date().toISOString()},"${formattedPrompt}","${formattedResponse}"\n`;

    // Ensure CSV header only if file doesn't exist
    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, 'timestamp,prompt,response\n');
    }

    fs.appendFileSync(LOG_FILE, logEntry);
    console.log("Logged API call to file");
}

app.post('/api/openai', async (req, res) => {
    console.log('Received POST request on /api/openai');
    try {
        const { prompt } = req.body;

        const payload = {
            model: "ft:gpt-3.5-turbo-0613:pivot-research::82PZVBlQ",
            messages: [
                {
                    role: "system",
                    content: "You are an Expert AI Prompt Engineer. Your Task is to optimize the input prompts for easy comprehension by a GPT model. If the input prompt requires subjective reasoning or up-to-date data that a model probably does not possess; Firstly optimize the prompt, after which you will encourage additional info from the input user in a section titled 'Prompt Suggestions'. If the prompt begins or ends with the special character '[f]', you should also include a short list of the 'Good User Practices' that the original input prompt incorporated, as well as a short list of 'Future Prompt Suggestions' which includes a few ways to improve similar prompts in the future at the end of the response."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        };

        const apiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        // Log the API call
        logApiCall(prompt, apiResponse.data);

        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error);
        if (error.response && error.response.status === 401) {
            res.status(401).send('Unauthorized: Please check your OpenAI API key.');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import { useState } from "react";
import axios from "axios";

import styles from "./RefinedPromptForm.module.css";

const RefinedPromptForm = ({ setParentApiResponse }) => {
    const [apiResponse, setApiResponse] = useState("");

    const callBackend = async () => {
        try {
            let promptInput = document.getElementById("promptInput").value;
            const isFuturePromptChecked = document.getElementById("futurePromptCheckbox").checked;
            
            const response = await axios.post('http://localhost:5500/api/openai', {
                prompt: promptInput,
                isFuturePrompt: isFuturePromptChecked
            });
            
            // Log the raw API response to the console
            console.log("API response:", JSON.stringify(response.data, null, 2));
            
            if (response.data && response.data.choices && response.data.choices.length > 0) {
                const assistantResponse = response.data.choices[0].message;
                if (assistantResponse && assistantResponse.role === 'assistant') {
                    setParentApiResponse(assistantResponse.content);
                }
            }
            
                      
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    };

    return (
        <div className={styles.inputSection}>
            <div className={styles.inputHeader}>
                <h3 className={styles.generateRefinedPrompt}>Generate Refined Prompt</h3>
                <div className={styles.options}>
                    <div className={styles.FuturePromptCheckbox}>
                        <input id="futurePromptCheckbox" className={styles.FuturePromptCheckboxChild} type="checkbox" defaultChecked />
                        <div className={styles.generateFuturePrompt}>Generate Future Prompt Recommendations</div>
                    </div>
                </div>
            </div>
            <textarea id="promptInput" className={styles.input} placeholder="Enter Prompt Here..." />
            <button id="generate_btn" className={styles.button} onClick={callBackend}>
                <b className={styles.generate}>Generate</b>
            </button>
            
        </div>
    );
};

export default RefinedPromptForm;


import React, { useState } from 'react';
import styles from "./GPTResponseScreen.module.css";

const GPTResponseScreen = ({ apiResponse }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleCopyClick = () => {
    copyToClipboard(apiResponse);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Text successfully copied to clipboard");
      })
      .catch(err => {
        console.log("Could not copy text: ", err);
      });
  };

  return (
    <div className={styles.outputSectionParent}>
      <div className={styles.outputSection}>
        <h3 className={styles.aiOptimizedPrompt}>A.I. Optimized Prompt</h3>
        <textarea id="output1" className={styles.input} value={apiResponse} readOnly placeholder="Output" />
        <button id="copy_btn" className={styles.button} onClick={handleCopyClick}>
          <b className={styles.generate}>Copy Optimized Prompt</b>
        </button>
        {showPopup && <div className={styles.popup}>Copied to clipboard!</div>}
      </div>
      <div className={styles.outputSection1}>
        <h3 className={styles.aiOptimizedPrompt}>Future Prompt Suggestions</h3>
        <textarea id="output2" className={styles.input} placeholder="Output" />
      </div>
    </div>
  );
};

export default GPTResponseScreen;

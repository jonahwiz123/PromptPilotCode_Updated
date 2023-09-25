import RefinedPromptForm from "../components/RefinedPromptForm";
import GPTResponseScreen from "../components/GPTResponseScreen";
import styles from "./PromptPilotPage.module.css";
import { useState } from "react";

const PromptPilotPage = () => {
  const [apiResponse, setApiResponse] = useState("");

  return (
    <div className={styles.promptPilotPage}>
      <main className={styles.aiPromptPilot}>
        <header className={styles.headerSection}>
          <div className={styles.headerElementsRow}>
            <img
              className={styles.headerElementsRowChild}
              alt="Prompt Pilot Logo"
              src="/PP Logo@2x.png"
            />
            <h2 id="customTitle" className={styles.aiPromptPilot1} style={{fontFamily: "Chi-Town"}}>Prompt Pilot</h2>

          </div>
        </header>
        <div className={styles.bodySection}>
          <RefinedPromptForm setParentApiResponse={setApiResponse} />
          <GPTResponseScreen apiResponse={apiResponse} />
        </div>
      </main>
    </div>
  );
};

export default PromptPilotPage;

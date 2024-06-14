import React, { useState } from "react";
import styles from "./MessageInput.module.css";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Type a message"
      />
      <div className={styles.buttonsContainer}>
        <button type="button" className={styles.fileButton}>
          +
        </button>
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

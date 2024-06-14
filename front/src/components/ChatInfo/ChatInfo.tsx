import React from "react";
import styles from "./ChatInfo.module.css";
import { useUser } from "../../UserContext";

interface ChatInfoProps {
  onClose: () => void;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ onClose }) => {
  const { chattingUser } = useUser();

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
      <div className={styles.userInfo}>
        <img
          src={chattingUser.icon}
          alt={chattingUser.name}
          className={styles.userIcon}
        />
        <h2>{chattingUser.name}</h2>
      </div>
    </div>
  );
};

export default ChatInfo;

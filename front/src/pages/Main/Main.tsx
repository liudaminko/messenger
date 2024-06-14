import { useState } from "react";
import styles from "./Main.module.css";
import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatInfo from "../../components/ChatInfo/ChatInfo";

const Main: React.FC = () => {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const handleUserClick = () => {
    setShowChatInfo(true);
  };

  const handleCloseChatInfo = () => {
    setShowChatInfo(false);
  };

  const handleChatClick = (id: number) => {
    setActiveChatId(id);
  };

  return (
    <div className={styles.container}>
      <Sidebar onChatClick={handleChatClick} />
      <div
        className={`${styles.chatContainer} ${
          showChatInfo ? styles.chatContainerSmall : ""
        }`}
      >
        <Chat onUserClick={handleUserClick} activeChatId={activeChatId} />
      </div>
      {showChatInfo && <ChatInfo onClose={handleCloseChatInfo} />}
    </div>
  );
};

export default Main;

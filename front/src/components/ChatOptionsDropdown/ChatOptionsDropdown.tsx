import { useState } from "react";
import styles from "./ChatOptionsDropdown.module.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"; // Import the ConfirmationModal component

interface ChatOptionsProps {
  activeChatId: number | null;
}

const ChatOptionsDropdown: React.FC<ChatOptionsProps> = ({ activeChatId }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const dropdownOptions = {
    options: [
      { id: 1, title: "mute notifications", icon: "/mute.png" },
      { id: 2, title: "view profile", icon: "/profile.png" },
      { id: 3, title: "change wallpaper", icon: "/theme.png" },
      { id: 4, title: "clear history", icon: "/clean.png" },
      { id: 5, title: "delete chat", icon: "/trash.png" },
    ],
  };

  const handleOptionClick = async (chatId: number | null, title: string) => {
    if (!chatId) return;

    if (title === "mute notifications") {
      console.log("mute notifications for chat ", chatId);
    } else if (title === "view profile") {
      console.log("show user's profile");
    } else if (title === "change wallpaper") {
      console.log(
        "showing modal window to choose from wallpapers for chat background"
      );
    } else if (title === "clear history" || title === "delete chat") {
      setModalConfig({
        title: `Confirm ${title}`,
        message: `Are you sure you want to ${title}? This action cannot be undone.`,
        onConfirm: () => handleConfirmOptionClick(chatId, title),
      });
      setShowModal(true);
    }
  };

  const handleConfirmOptionClick = async (
    chatId: number | null,
    title: string
  ) => {
    if (!chatId) return;

    setShowModal(false);

    if (title === "clear history") {
      try {
        const response = await fetch(
          `http://localhost:8080/message/deleteAll/${chatId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to clear chat history");
        }

        console.log("Chat history cleared successfully");
      } catch (error) {
        console.error("Error clearing chat history:", error);
      }
    } else if (title === "delete chat") {
      try {
        const response = await fetch(`http://localhost:8080/chat/${chatId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete chat");
        }

        console.log("Chat deleted successfully");
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      {dropdownOptions.options.map((option) => (
        <div
          key={option.id}
          className={styles.dropdownItem}
          onClick={() => handleOptionClick(activeChatId, option.title)}
        >
          <img src={option.icon} alt={`${option.title} icon`} />
          <p>{option.title}</p>
        </div>
      ))}
      {showModal && (
        <ConfirmationModal
          title={modalConfig.title}
          message={modalConfig.message}
          onConfirm={modalConfig.onConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ChatOptionsDropdown;

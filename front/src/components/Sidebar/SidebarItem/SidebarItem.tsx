import { ChatIcon } from "../../ChatIcon/ChatIcon";
import styles from "../Sidebar.module.css";

import { format, isToday, isWithinInterval, subDays } from "date-fns";

interface SidebarItemProps {
  itemId: number;
  onClick: (id: number) => void;
  iconUrl?: string;
  name: string;
  isSelected?: boolean;
  lastMessage?: string;
  lastMessageDate?: Date;
}

export const SidebarItem = ({
  itemId,
  onClick,
  iconUrl,
  name,
  isSelected = false,
  lastMessage,
  lastMessageDate,
}: SidebarItemProps) => {
  const getLastMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (
      isWithinInterval(date, { start: subDays(new Date(), 6), end: new Date() })
    ) {
      return format(date, "EEEE");
    } else {
      return format(date, "dd/MM/yyyy");
    }
  };

  const truncateMessage = (message: string, maxLength: number) => {
    if (message != null)
      return message.length > maxLength
        ? `${message.slice(0, maxLength)}...`
        : message;
  };

  return (
    <div
      key={itemId}
      className={`${styles.chatItem} ${isSelected ? styles.active : ""}`}
      onClick={() => onClick(itemId)}
    >
      <ChatIcon iconUrl={iconUrl} id={itemId} name={name} size={50} />
      <div className={styles.chatInfo}>
        <div className={styles.chatHeader}>
          <div className={styles.chatName}>{name}</div>
          <div className={styles.lastMessageTime}>
            {lastMessageDate && getLastMessageTime(new Date(lastMessageDate))}
          </div>
        </div>
        <div className={styles.lastMessage}>
          {lastMessage && truncateMessage(lastMessage, 28)}
        </div>
      </div>
    </div>
  );
};

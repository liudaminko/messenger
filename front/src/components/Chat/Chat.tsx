import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import MessageInput from "../MessageInput/MessageInput";
import { format, isSameDay, isThisYear, isYesterday, parseISO } from "date-fns";
import ChatOptionsDropdown from "../ChatOptionsDropdown/ChatOptionsDropdown";
import { useSearch } from "../../SearchContext";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ChatIcon } from "../ChatIcon/ChatIcon";

interface Message {
  id: number;
  message: string;
  senderId: number;
  sendTime: string;
}

interface User {
  id: number;
  firstName: string;
  profilePicture: string;
}

interface ShortChatInfo {
  id: number;
  name: string;
  profilePicture: string;
  members: number[];
}

interface ChatProps {
  onUserClick: () => void;
  activeChatId: number | null;
}

const Chat: React.FC<ChatProps> = ({ onUserClick, activeChatId }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chattingUser, setChattingUser] = useState<User | null>(null);
  const storedUserId = localStorage.getItem("userId");
  const parsedUserId = storedUserId ? Number(storedUserId) : null;

  const { searchTerm, setIsSearchActive, isSearchActive } = useSearch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [shortChatInfo, setShortChatInfo] = useState<ShortChatInfo>();
  const [actionButtons, setActionButtons] = useState({
    chatSearchActive: false,
    phoneCallActive: false,
    videoCallActive: false,
    chatSettingsActive: false,
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!storedUserId) {
      navigate("/");
    } else if (parsedUserId) {
      fetchUserData(parsedUserId, setCurrentUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (typeof activeChatId == "number") {
      fetchMessages(activeChatId);
      fetchShortChatInfo(activeChatId);
      makeSocketConnection();
    }
    console.log(activeChatId);
  }, [activeChatId]);

  useEffect(() => {
    if (shortChatInfo && shortChatInfo.members.length === 2) {
      const chattingUserId = shortChatInfo.members.find(
        (memberId) => memberId !== parsedUserId
      );
      if (chattingUserId) {
        fetchUserData(chattingUserId, setChattingUser);
      }
    }
  }, [shortChatInfo]);

  const fetchUserData = async (
    userId: number,
    setUser: (user: User) => void
  ) => {
    try {
      const response = await fetch(`http://localhost:8080/user/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMessages = async (chatId: number) => {
    console.log("FETCHING MESSAGES FOR CHAT", chatId);
    try {
      const response = await fetch(
        `http://localhost:8080/message/${chatId}/messages`
      );
      const data = await response.json();
      console.log(data);
      setMessages(data);
      console.log(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchShortChatInfo = async (chatId: number) => {
    console.log("FETCHING MESSAGES FOR CHAT", chatId);
    try {
      const response = await fetch(`http://localhost:8080/chat/${chatId}`);
      const data = await response.json();
      console.log(data);
      setShortChatInfo(data);
      console.log(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (newMessage: string) => {
    if (typeof activeChatId !== "number") return;

    const message = {
      message: newMessage,
      senderId: parsedUserId,
      chatId: activeChatId,
    };

    try {
      const response = await fetch(`http://localhost:8080/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (socket) {
        socket.emit("messageSendToUser", message);
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    fetchMessages(activeChatId);
  };

  const handleActionButtonClick = (action: keyof typeof actionButtons) => {
    if (action === "chatSearchActive") {
      setIsSearchActive(true);
    } else if (action === "chatSettingsActive") {
      setDropdownVisible(!dropdownVisible);
    }
    setActionButtons((prevButtons) => ({
      ...prevButtons,
      [action]: !prevButtons[action],
    }));
  };

  const makeSocketConnection = () => {
    if (socket) {
      return;
    }
    const newSocket = io("http://localhost:2003", {
      query: { chatId: activeChatId },
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket");
    });

    const eventName = "chat" + activeChatId;
    newSocket.on(eventName, (message) => {
      console.log("on send and message user triggered!", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);
  };

  const getFormattedDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    const date = parseISO(dateString);
    const now = new Date();

    if (isSameDay(date, now)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisYear(date)) {
      return format(date, "MMMM d");
    } else {
      return format(date, "MMMM d, yyyy");
    }
  };

  let lastMessageDate: string | null = null;

  const filteredMessages = messages.filter((message) =>
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        {shortChatInfo && (
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={onUserClick}
          >
            <ChatIcon
              id={shortChatInfo?.id}
              name={shortChatInfo?.name}
              iconUrl={chattingUser?.profilePicture}
              size={40}
            />
            <h3>{shortChatInfo?.name}</h3>
          </div>
        )}

        <div className={styles.chatActionsContainer}>
          <img
            src={isSearchActive ? "/search-blue.png" : "/search-grey.png"}
            alt="chat search"
            className={styles.actionIcon}
            onClick={() => handleActionButtonClick("chatSearchActive")}
          />
          <img
            src={
              actionButtons.phoneCallActive
                ? "/phone-blue.png"
                : "/phone-grey.png"
            }
            alt="phone call"
            className={styles.actionIcon}
            onClick={() => handleActionButtonClick("phoneCallActive")}
          />
          <img
            src={
              actionButtons.videoCallActive
                ? "/camera-blue.png"
                : "/camera-grey.png"
            }
            alt="video call"
            className={styles.actionIcon}
            onClick={() => handleActionButtonClick("videoCallActive")}
          />
          <img
            src={
              actionButtons.chatSettingsActive
                ? "/more-blue.png"
                : "/more-grey.png"
            }
            alt="chat settings"
            className={styles.actionIcon}
            onClick={() => handleActionButtonClick("chatSettingsActive")}
          />
        </div>
        {dropdownVisible && <ChatOptionsDropdown activeChatId={activeChatId} />}
      </div>
      <div className={styles.chatBody}>
        {filteredMessages.map((message) => {
          const sender =
            message.senderId === parsedUserId ? currentUser : chattingUser;
          const messageDate = getFormattedDate(message.sendTime);
          const showDate = messageDate !== lastMessageDate;
          lastMessageDate = messageDate;

          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className={styles.dateBubble}>
                  <span>{messageDate}</span>
                </div>
              )}
              <div
                className={
                  message.senderId === parsedUserId
                    ? styles.myMessageContainer
                    : styles.otherMessageContainer
                }
              >
                <div className={styles.messageContainer}>
                  {sender && (
                    <img
                      src={sender.profilePicture}
                      alt={sender.firstName}
                      className={styles.messageIcon}
                    />
                  )}
                  <div
                    className={
                      message.senderId === parsedUserId
                        ? styles.myMessage
                        : styles.otherMessage
                    }
                  >
                    <div className={styles.messageText}>{message.message}</div>
                  </div>
                </div>

                <div
                  className={
                    message.senderId === parsedUserId
                      ? styles.myMessageFooter
                      : styles.otherMessageFooter
                  }
                >
                  {shortChatInfo &&
                    shortChatInfo.members &&
                    shortChatInfo.members.length > 2 &&
                    sender && (
                      <span className={styles.messageSender}>
                        {sender.firstName}
                      </span>
                    )}
                  <span className={styles.messageTime}>
                    {message.sendTime &&
                      format(parseISO(message.sendTime), "hh:mm a")}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;

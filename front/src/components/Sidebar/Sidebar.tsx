import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import SearchBar from "../SearchBar/SearchBar";

import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";
import { useSearch } from "../../SearchContext";
import { fetchUser, fetchUserById } from "../../lib/userService";
import { SidebarItem } from "./SidebarItem/SidebarItem";

interface Chat {
  id: number;
  name: string;
  icon?: string;
  members: number[];
  lastMessage: string;
  lastMessageDate: Date;
}

interface SidebarProps {
  onChatClick: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatClick }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [chats, setChats] = useState<Chat[]>([]);
  const [foundUser, setFoundUser] = useState<any>(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const storedUserId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (typeof storedUserId === "string") {
      fetchUserById(storedUserId).then((user) => setCurrentUser(user));
    }
  }, [storedUserId]);

  useEffect(() => {
    if (searchTerm && storedUserId) {
      fetchChatsByMessage(storedUserId, searchTerm).then((data) =>
        setChats(data)
      );
      chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      fetchUser(searchTerm)
        .then((data) => setFoundUser(data))
        .catch(() => {
          setFoundUser(null);
          console.log("no user found with this phone: " + searchTerm);
        });
    } else {
      fetchChats();
    }
  }, [searchTerm]);

  const fetchChatsByMessage = async (userId: string, pattern: string) => {
    const response = await fetch(
      `http://localhost:8080/message/${userId}/messages/search?pattern=${pattern}`
    );
    const data: Chat[] = await response.json();
    return await Promise.all(
      data.map(async (chat) => {
        const otherUserId =
          chat.members.find((id) => `${id}` !== storedUserId) + "";
        const profilePicture = (await fetchUserById(otherUserId))
          .profilePicture;
        chat.icon = profilePicture;
        return chat;
      })
    );
  };

  const fetchChats = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/user/${storedUserId}`
      );
      const data: Chat[] = await response.json();
      const formattedData = await Promise.all(
        data.map(async (chat) => {
          const otherUserId =
            chat.members.find((id) => `${id}` !== storedUserId) + "";
          const profilePicture = (await fetchUserById(otherUserId))
            .profilePicture;
          console.log(`pfp of user ${otherUserId}: ${profilePicture}`);
          return {
            ...chat,
            lastMessageDate: new Date(chat.lastMessageDate),
            icon: (await fetchUserById(otherUserId)).profilePicture || "",
          };
        })
      );
      setChats(formattedData);
      console.log(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleChatClick = (id: number) => {
    setActiveChatId(id);
    setSearchTerm("");
    console.log(id);
    onChatClick(id);
  };

  const onUserClick = async () => {
    const existingChat = chats.find((chat) =>
      chat.members.includes(foundUser.id)
    );

    if (existingChat) {
      handleChatClick(existingChat.id);
      setFoundUser(null);
      return;
    }

    fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${currentUser.firstName} & ${foundUser.firstName}`,
        members: [storedUserId, foundUser.id],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChats([data, ...chats]);
        handleChatClick(data.id);
        setFoundUser(null);
      })
      .catch((error) => console.error("Error creating chat:", error));
  };

  return (
    <div className={styles.container}>
      <SettingsSidebar />
      <div className={styles.chatsContainer}>
        <div className={styles.header}>
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className={styles.chatList}>
          {foundUser && (
            <>
              <p className="w-full text-left">Found user:</p>
              <SidebarItem
                itemId={foundUser.id}
                onClick={onUserClick}
                name={foundUser.phoneNumber}
                isSelected={false}
                iconUrl={foundUser.profilePicture}
              />
            </>
          )}
          <p className="w-full text-left">Chats:</p>
          {chats.map((chat) => (
            <SidebarItem
              itemId={chat.id}
              onClick={handleChatClick}
              iconUrl={chat.icon}
              name={chat.name}
              isSelected={chat.id === activeChatId}
              lastMessage={chat.lastMessage}
              lastMessageDate={chat.lastMessageDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

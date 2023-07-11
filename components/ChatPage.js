import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import ChatComponent from "./ChatComponent";
import { styles } from "../utils/styles";
import socket from "../utils/socket";
import MessageComponent from "./MessageComponent";

const ChatPage = ({ route, navigation }) => {
  const { room } = route.params;
  const room_id = parseInt(room.id);
  console.log(room_id);
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      text: "Hello guys, welcome!",
      time: "07:50",
      user: "Tomer",
    },
    {
      id: "2",
      text: "Hi Tomer, thank you! 😇",
      time: "08:50",
      user: "David",
    },
  ]);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(socket.UID);
  const userName = socket.username;

  const handleRoomMessage = (data) => {
    const { room_id, message, user, timestamp } = data;

    // 현재 화면에 표시된 채팅방의 ID와 일치하는 경우에만 메시지를 업데이트합니다
    if (room_id === route.params.room.id) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          id: generateID(),
          text: message,
          time: timestamp,
          user: user,
        },
      ]);
    }
  };

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    console.log({
      message,
      room_id: room_id,
      user,
      timestamp: { hour, mins },
    });
    socket.emit("newMessage", {
      message,
      room_id: room_id,
      user,
      timestamp: { hour, mins },
    });
    setMessage("");
    console.log("refresh");
  };

  useLayoutEffect(() => {
    socket.emit("findRoom", room_id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={userName} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatPage;

import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import axios from "axios";
import socket from "../utils/socket";

const users = [
  {
    name: "이름",
    avatar_url:
      "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
    messages: ["", "디자인", "UI", "백엔드"],
  },
];

const tagColors = {
  열정: "#FF5733",
  공부: "#FF5733",
  프론트: "#C70039",
  백: "#C70039",
  앱: "#900C3F",
  웹: "#FFC300",
  게임: "#71269c",
};

const ChatList = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  console.log(socket.UID);
  useLayoutEffect(() => {
		// function fetchGroups() {
		// 	fetch("http://localhost:3000/api")
		// 		.then((res) => res.json())
		// 		.then((data) => setRooms(data))
		// 		.catch((err) => console.error(err));
		// }
		// fetchGroups();
    socket.emit("needroomsList", socket.UID);
    socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socket]);

	useEffect(() => {
		socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socket]);

  return (
    <ScrollView>
      {rooms.map((room, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => navigation.navigate("ChatPage", {room})}
        >
          {/* <Avatar source={{ uri: user.avatar_url }} /> */}
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {room.id}
            </ListItem.Title>
            <ListItem.Subtitle>{room.messages[room.messages.length - 1].text}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    // 그림자 효과
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 2 },
  },
  title: {
    fontWeight: "bold", // 제목을 굵게 설정
    marginBottom: 10, // 제목 아래에 마진 추가
  },
  tag: {
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ChatList;

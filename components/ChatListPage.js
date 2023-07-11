import React, { Component, useState, useEffect } from "react";
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

const users = [
  {
    name: "이름",
    avatar_url:
      "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름1",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름2",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름3",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름4",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름5",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },

  {
    name: "이름5",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름5",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름6",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
  },
  {
    name: "이름7",
    avatar_url: "사진 URL",
    tags: ["열정", "디자인", "UI", "백엔드"],
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
  return (
    <ScrollView>
      {users.map((user, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => navigation.navigate("ChatPage")}
        >
          <Avatar source={{ uri: user.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {user.name}
            </ListItem.Title>
            <ListItem.Subtitle>subtitle</ListItem.Subtitle>
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

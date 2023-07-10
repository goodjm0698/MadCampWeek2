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
  프론트: "#C70039",
  앱: "#900C3F",
  디자인: "#581845",
  UI: "#FFC300",
  UX: "#FF5733",
  백엔드: "#C70039",
  데이터베이스: "#900C3F",
  테스팅: "#581845",
  디버깅: "#FFC300",
};

const ProfileList = () => {
  return (
    <ScrollView>
      {users.map((user, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: user.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: "15",
                fontWeight: "bold",
                fontfamily: "lucida grande",
              }}
            >
              {user.name}
            </ListItem.Title>
            <View style={styles.tagContainer}>
              {user.tags.map((tag, index) => (
                <Text
                  key={index}
                  style={[styles.tag, { backgroundColor: tagColors[tag] }]}
                >
                  {tag}
                </Text>
              ))}
            </View>
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

export default ProfileList;

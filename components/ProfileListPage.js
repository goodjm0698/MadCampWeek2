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

//

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

const ProfileList = ({ navigation }) => {
  const [profs, setProfs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/profilelist")
      .then((response) => {
        setProfs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <ScrollView>
      {profs.map((user, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => navigation.navigate("ProfilePage")}
        >
          <Avatar source={{ uri: user.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {user.username}
            </ListItem.Title>
            <View style={styles.tagContainer}>
              {(user.tags || "").split(",").map((tag, index) => (
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

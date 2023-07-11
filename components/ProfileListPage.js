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
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

//

const tagColors = {
  열정: "#FF5733",
  공부: "#0E0F37",
  프론트: "#C70039",
  백: "#0A3711",
  앱: "#900C3F",
  웹: "#FFC300",
  게임: "#71269c",
};

const ProfileList = ({ navigation }) => {
  const [profs, setProfs] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://172.10.5.90:443/profilelist")
  //     .then((response) => {
  //       setProfs(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get("http://172.10.5.90:443/profilelist")
        .then((response) => {
          setProfs(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []) // UID가 변경될 때마다 useEffect를 다시 실행합니다.
  );
  return (
    <ScrollView>
      {profs.map((user, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => navigation.navigate("ProfilePage", { user })}
        >
          <Avatar
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
            }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {user.name}
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

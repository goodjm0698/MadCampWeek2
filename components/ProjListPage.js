import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";

const tagColors = {
  열정: "#FF5733",
  공부: "#0E0F37",
  프론트: "#C70039",
  백: "#0A3711",
  앱: "#900C3F",
  웹: "#FFC300",
  게임: "#71269c",
};

const ProjList = ({ navigation }) => {
  const [projs, setProjs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/projects")
      .then((response) => {
        setProjs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <FlatList
      data={projs}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProjPost", { item })}
          >
            <Text style={styles.title}>'{item.name}' 님의 프로젝트</Text>
            <View style={{ width: 80 }}>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.info}
              </Text>
            </View>
            {
              <View style={styles.tagContainer}>
                {(item.tags || "").split(",").map((tag, index) => (
                  <Text
                    key={index}
                    style={[styles.tag, { backgroundColor: tagColors[tag] }]}
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            }
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2} // 한 줄에 두 개의 항목이 표시되도록 설정
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    padding: 5,
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
  tagContainer: {
    flexDirection: "row", // 태그를 한 줄로 나열
    flexWrap: "wrap", // 태그가 화면 너비를 넘어갈 경우 다음 줄로 이동
  },
  tag: {
    padding: 5,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    margin: 5,
    color: "white",
    fontSize: 10,
  },
});

export default ProjList;

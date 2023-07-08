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
import TextInput from "./TextInput";
import { theme } from "../core/theme";
import axios from "axios";
import { ListItem } from "react-native-elements";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  //... 추가로 리스트 아이템을 넣어주세요
];

const ProjList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/projects")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={list}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default ProjList;

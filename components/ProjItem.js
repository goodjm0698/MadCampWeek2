import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInput from "./TextInput";
import { theme } from "../core/theme";
import axios from "axios";

const ProjItem = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Todo List</Text>
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.text}</Text>
      ))}
    </View>
  );
};

export default ProjItem;

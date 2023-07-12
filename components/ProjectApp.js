import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";

const ProjectApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    try {
      await axios.post("http://localhost:3000/projects", { text: newTodo });
      setNewTodo("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [newTodo]);

  return (
    <View>
      <Text>Todo List</Text>
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.text}</Text>
      ))}
      <TextInput
        placeholder="Enter a new todo item"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <Button title="Add" onPress={addTodo} />
    </View>
  );
};

export default ProjectApp;

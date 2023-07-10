import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

import axios from "axios";
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

const ProjPost = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.author}>Author</Text>
      <View style={styles.tagContainer}>
        {["열정", "백엔드", "앱", "디자인"].map((tag, index) => (
          <View
            key={index}
            style={[styles.tag, { backgroundColor: tagColors[tag] }]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.content}>contents</Text>
      </View>
      <Button color="warning" title="1대1 채팅방" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 10,
  },
  author: {
    fontSize: 20,
    color: "#888",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tag: {
    marginRight: 5,
    color: "#007BFF",
  },
  tagText: {
    color: "#fff",
    fontSize: 15,
  },
  content: {
    fontSize: 20,
    marginBottom: 20,
  },
  contentContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    height: 200,
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    alignSelf: "stretch",
  },
});

export default ProjPost;

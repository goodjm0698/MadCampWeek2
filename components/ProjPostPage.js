import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

import axios from "axios";
import socket from "../utils/socket";

const tagColors = {
  열정: "#FF5733",
  공부: "#0E0F37",
  프론트: "#C70039",
  백: "#0A3711",
  앱: "#900C3F",
  웹: "#FFC300",
  게임: "#71269c",
};

const ProjPost = ({ navigation, route }) => {
  const { item } = route.params;
  console.log(item);
  let room = {id: null, name: item.name, messages: []};
  console.log(room);
  useEffect(()=>{
    console.log(socket.UID, item.UID);
  },[]);

  const handleChatRoom = () => {
    socket.emit("wantRoomid", [socket.UID, item.UID]);
    socket.off("Roomid"); // 기존에 등록된 "Roomid" 이벤트 리스너 제거
    socket.off("newRoom"); // 기존에 등록된 "newRoom" 이벤트 리스너 제거
    socket.off("foundRoom");
    socket.on("Roomid", (id)=>{
      console.log(id);
      if (id == undefined){
        console.log("noroom");
        socket.emit("createRoom", [socket.UID, item.UID]);
        socket.on("newRoom", (id) =>{
          console.log(id);
          room.id = id;
        })
      }
      else{
        room.id = id;
        socket.emit("findRoom", [id]);
        socket.on("foundRoom", (message)=>{
          room.messages = message;
        });
      }
    });
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>'{item.name}' 님의 프로젝트</Text>
        <View style={styles.tagContainer}>
          {(item.tags || "").split(",").map((tag, index) => (
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
          <Text style={styles.content}>{item.info}</Text>
        </View>
      </View>
      <Button
        color="warning"
        title="1대1 채팅방"
        onPress={()=>{handleChatRoom(); setTimeout(() => {
          navigation.navigate("ChatPage", {room});
        }, 500);}}
      />
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
    justifyContent: "space-between",
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
    borderRadius: 10, // 모서리를 둥글게 만들어줍니다.
    backgroundColor: "#eee", // 배경색을 설정해줍니다. 원하는 색상으로 변경 가능합니다.
    padding: 10, // 안쪽 패딩을 추가해줍니다.
  },
  tag: {
    marginRight: 5,
    color: "#fff", // 태그의 글자색을 흰색으로 변경합니다.
    backgroundColor: "#007BFF", // 태그의 배경색을 설정합니다.
    borderRadius: 10, // 태그의 모서리를 둥글게 만듭니다.
    paddingHorizontal: 8, // 좌우 패딩을 추가하여 글자가 태그의 가장자리에 붙지 않게 합니다.
    paddingVertical: 3, // 상하 패딩을 추가하여 글자가 태그의 상하단에 붙지 않게 합니다.
    fontSize: 10, // 글자 크기를 설정합니다. 필요에 따라 조정할 수 있습니다.
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  content: {
    fontSize: 15,
    marginBottom: 20,
  },
  contentContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    height: 200,
    padding: 20,
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

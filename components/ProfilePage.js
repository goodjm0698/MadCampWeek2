import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
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

const ProfilePage = ({ navigation, route }) => {
  const [prof, setProf] = useState([]);
  const { user } = route.params;
  console.log(user.UID);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          "http://172.10.5.90:443/profile",
          { params: { UID: user.UID } },
          { withCredentials: true }
        )
        .then((response) => {
          setProf(response.data[0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []) // UID가 변경될 때마다 useEffect를 다시 실행합니다.
  );

  const profile = {
    name: "김재민",
    avatar:
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    gender: "Male",
    school: "Korea Univ.",
    class: "Class 1",
    tags: ["열정", "디자인", "UI", "프론트"],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("ProfileEdit", { prof })}
      >
        <FontAwesome name="pencil" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: profile.avatar }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{prof.name}</Text>
        <View style={styles.separator} />
        <View style={styles.tagContainer}>
          {(prof.tags || "").split(",").map((tag, index) => (
            <View
              style={[styles.tag, { backgroundColor: tagColors[tag] }]}
              key={index}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="birthday-cake"
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.info}>Age: {prof.age}</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="transgender"
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.info}>Gender: {prof.gender}</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="school"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.info}>School: {prof.school}</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="class"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.info}>Class: {prof.class}</Text>
        </View>
      </View>
      <Button color="warning" title="1대1 채팅방" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  info: {
    fontSize: 15,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tag: {
    padding: 5,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    margin: 5,
  },
  tagText: {
    color: "white",
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ProfilePage;

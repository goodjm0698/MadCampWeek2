import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "@rneui/themed";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileEdit = () => {
  const profile = {
    name: "김재민",
    avatar:
      "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
    age: 22,
    gender: "Male",
    school: "Korea Univ.",
    class: "Class 1",
    tags: ["열정", "디자인", "UI", "프론트"],
  };
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

  const [name, setName] = useState("김재민");
  const [age, setAge] = useState("22");
  const [gender, setGender] = useState("Male");
  const [school, setSchool] = useState("Korea Univ.");
  const [classNum, setClassNum] = useState("Class 1");
  const [tags, setTags] = useState('["열정", "디자인", "UI", "프론트"]');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log("clicked")}
      >
        <FontAwesome name="pencil" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: profile.avatar }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{profile.name}</Text>
        <View style={styles.separator} />
        <View style={styles.tagContainer}>
          {profile.tags.map((tag, index) => (
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
          <TextInput style={styles.input} value={age} onChangeText={setAge} />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="transgender"
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="school"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
          />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="class"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            style={styles.input}
            value={classNum}
            onChangeText={setClassNum}
          />
        </View>
      </View>
      <Button
        color="warning"
        title="Save Profile"
        onPress={() => console.log("save")}
      />
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
  input: {
    fontSize: 15,
    marginVertical: 0,
  },
});

export default ProfileEdit;

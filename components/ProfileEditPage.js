import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "@rneui/themed";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const ProfileEdit = ({ navigation, route }) => {
  const profile = {
    name: "김재민",
    avatar:
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/prof-2935527_1280.png",
    age: 22,
    gender: "Male",
    school: "Korea Univ.",
    class: "Class 1",
    tags: ["열정", "디자인", "UI", "프론트"],
  };
  const tagColors = {
    열정: "#FF5733",
    공부: "#0E0F37",
    프론트: "#C70039",
    백: "#0A3711",
    앱: "#900C3F",
    웹: "#FFC300",
    게임: "#71269c",
  };

  const { prof } = route.params;
  console.log(prof.UID);

  const [name, setName] = useState(prof.name);
  const [age, setAge] = useState(prof.age + "");
  const [gender, setGender] = useState(prof.gender);
  const [school, setSchool] = useState(prof.school);
  const [classNum, setClassNum] = useState(prof.class + "");
  const [tags, setTags] = useState((prof.tags || "").split(","));
  const [selectedTags, setSelectedTags] = useState({
    웹: false,
    앱: false,
    게임: false,
    프론트: false,
    백: false,
    열정: false,
    공부: false,
  });
  useEffect(() => {
    const newTags = { ...selectedTags };
    for (const tag of tags) {
      newTags[tag] = true;
    }
    setSelectedTags(newTags);
  }, []);

  const handlePress = (tagName) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };

  const onClickSave = async () => {
    try {
      await axios.post("http://localhost:3000/profileedit", {
        UID: prof.UID,
        name: name,
        gender: gender,
        age: age,
        school: school,
        classNum: classNum,
        selectedTags: selectedTags,
      });
    } catch (error) {
      console.log("err: profileeddit");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: profile.avatar }} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.separator} />
        {/* <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <View
              style={[styles.tag, { backgroundColor: tagColors[tag] }]}
              key={index}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View> */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Object.keys(selectedTags).map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags[tag]
                  ? { backgroundColor: tagColors[tag] }
                  : styles.unselected,
              ]}
              onPress={() => handlePress(tag)}
            >
              <Text style={styles.text}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="birthday-cake"
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={{ fontSize: 15 }}>Age: </Text>
          <TextInput style={styles.input} value={age} onChangeText={setAge} />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="transgender"
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={{ fontSize: 15 }}>Gender: </Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="school"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={{ fontSize: 15 }}>School: </Text>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
          />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="class"
            size={15}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={{ fontSize: 15 }}>Class: </Text>
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
        onPress={() => {
          onClickSave();
          setTimeout(() => {
            navigation.navigate("ProfileList");
          }, 500);
        }}
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
  },
  selected: {
    backgroundColor: "#000",
  },
  unselected: {
    backgroundColor: "#aaa",
  },
  text: {
    color: "#fff",
  },
});

export default ProfileEdit;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import axios from "axios";

// ... tagColors, styles 등 기존의 코드 ...

const ProjAdd = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(user);

  const [name, setName] = useState("김재민");
  const [info, setInfo] = useState("");
  const [selectedTags, setSelectedTags] = useState({
    웹: false,
    앱: false,
    게임: false,
    프론트: false,
    백: false,
    열정: false,
    공부: false,
  });

  const tagColors = {
    열정: "#FF5733",
    공부: "#0E0F37",
    프론트: "#C70039",
    백: "#0A3711",
    앱: "#900C3F",
    웹: "#FFC300",
    게임: "#71269c",
  };

  const onSave = async () => {
    try {
      await axios.post("http://172.10.5.90:443/projects", {
        UID: user.UID,
        name: user.username,
        info: info,
        selectedTags: selectedTags,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      console.log("add page");
    }
  };

  const handlePress = (tagName) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>'{user.username}' 님의 프로젝트</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 10,
            borderRadius: 10, // 모서리를 둥글게 만들어줍니다.
            backgroundColor: "#eee", // 배경색을 설정해줍니다. 원하는 색상으로 변경 가능합니다.
            padding: 10,
          }}
        >
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
        <Text style={styles.fieldLabel}>Info:</Text>

        <TextInput
          style={styles.fieldInput}
          placeholder="내용을 작성하세요"
          multiline={true}
          value={info}
          onChangeText={setInfo}
        />
      </View>
      <Button color="warning" title="Add Project" onPress={onSave} />
    </ScrollView>
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
    borderRadius: 10, // 모서리를 둥글게 만들어줍니다.
    backgroundColor: "#eee", // 배경색을 설정해줍니다. 원하는 색상으로 변경 가능합니다.
    padding: 10, // 안쪽 패딩을 추가해줍니다.
  },
  tag: {
    margin: 4,
    padding: 6,
    borderRadius: 5,
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
  fieldLabel: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  fieldInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    borderColor: "grey",
  },
});

export default ProjAdd;

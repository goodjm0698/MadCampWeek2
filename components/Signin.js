import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { theme } from "../core/theme";
import axios from "axios";
import Logo from "../assets/Logo.png";
import { Picker } from "@react-native-picker/picker";

const Signin = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [selectedValue, setSelectedValue] = useState("1분반");
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

  const handlePress = (tagName) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };

  const onClickSignin = async () => {
    try {
      await axios.post("http://localhost:3000/signin", {
        id: id,
        password: password,
        sex: sex,
        name: name,
        age: age,
        school: school,
        selectedValue: selectedValue,
        selectedTags: selectedTags,
      });
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.header}>몰 캠{"\n"}마 켓</Text>
      <TextInput
        placeholder={"아이디"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setId(text)}
        value={id}
        style={styles.input}
      />
      <TextInput
        placeholder={"비밀번호"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={styles.input}
      />
      <TextInput
        placeholder={"이름"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder={"성별"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setSex(text)}
        value={sex}
        style={styles.input}
      />
      <TextInput
        placeholder={"나이"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setAge(text)}
        value={age}
        style={styles.input}
      />
      <TextInput
        placeholder={"학교"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setSchool(text)}
        value={school}
        style={styles.input}
      />
      <Picker
        selectedValue={selectedValue}
        style={{
          height: 40,
          width: "80%",
          borderColor: theme.colors.primary, // 주황색 테두리
          borderWidth: 0,
          borderBottomWidth: 1.5,
        }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="1분반" value="1" />
        <Picker.Item label="2분반" value="2" />
        <Picker.Item label="3분반" value="3" />
        <Picker.Item label="4분반" value="4" />
      </Picker>
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
      <Button
        buttonStyle={{
          backgroundColor: theme.colors.primary, // 주황색 배경
          borderRadius: 15, // 둥근 모서리
          paddingVertical: 10, // 상하 패딩
          paddingHorizontal: 20, // 좌우 패딩
        }}
        titleStyle={{
          color: "#fff", // 텍스트 색상을 흰색으로
          fontSize: 16, // 텍스트 크기
          fontWeight: "bold", // 볼드체
        }}
        containerStyle={{
          marginVertical: 10, // 버튼 사이 간격
        }}
        title="회원 가입"
        onPress={() => {
          onClickSignin();
          setTimeout(() => {
            console.log("signin");
            navigation.goBack();
          }, 500);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  header: {
    fontSize: 25,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingBottom: 12,
  },
  input: {
    width: "75%",
    height: 35,
    borderColor: theme.colors.primary, // 주황색 테두리
    borderBottomWidth: 1.5,
    padding: 5, // 텍스트와 테두리 사이의 여백
    fontSize: 15,
    marginVertical: 5,
  },
  tag: {
    margin: 5,
    padding: 7,
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
});

export default Signin;

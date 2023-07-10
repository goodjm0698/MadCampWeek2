import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInput from "./TextInput";
import { theme } from "../core/theme";
import axios from "axios";
import Logo from "../assets/Logo.png";

const Login = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    try {
      await axios
        .post("http://localhost:3000/login", {
          id: id,
          password: password,
        })
        .then((response) => {
          if (response.data.success) {
            // 서버에서 로그인 성공 응답을 받으면 홈 화면으로 리다이렉트
            navigation.navigate("Main");
          } else {
            // 로그인 실패, 에러 메시지 표시
            alert("Invalid username or password");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.header}>몰캠마켓</Text>
      <TextInput
        placeholder={"아이디"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setId(text)}
        value={id}
        underlineColorAndroid="#f000"
        blurOnSubmit={false}
      />
      <TextInput
        placeholder={"비밀번호"}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="#f000"
        blurOnSubmit={false}
      />
      <Button title="LogIn" onPress={onClickLogin} />
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
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  inputText: {
    flex: 1,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

export default Login;

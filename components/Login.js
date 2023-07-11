import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";
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
            console.log(response.data.UID);
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
        title="로그인"
        onPress={onClickLogin}
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
  input: {
    width: "75%",
    height: 40,
    borderColor: theme.colors.primary, // 주황색 테두리
    borderBottomWidth: 1.5,
    padding: 10, // 텍스트와 테두리 사이의 여백
    fontSize: 16,
    marginVertical: 5,
  },
  inputText: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

export default Login;

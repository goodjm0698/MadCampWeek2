import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  Picker,
} from "react-native";
import TextInput from "./TextInput";
import { theme } from "./core/theme";
import axios from "axios";

const Signin = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [selectedOption, setSelectedOption] = useState();

  const onClickSignin = async () => {
    try {
      await axios.post("http://localhost:3000/signin", {
        id: id,
        password: password,
        sex: sex,
        selectedOption: selectedOption,
      });
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    console.log(selectedOption);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.header}>회원가입</Text>
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
        <TextInput
          placeholder={"성별"}
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => setSex(text)}
          value={sex}
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <Picker
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}
        >
          <Picker.Item label="1분반" value="1분반" />
          <Picker.Item label="2분반" value="2분반" />
          <Picker.Item label="3분반" value="3분반" />
          <Picker.Item label="4분반" value="4분반" />
        </Picker>
      </View>
      <Button title="SignIn" onPress={onClickSignin} />
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

export default Signin;

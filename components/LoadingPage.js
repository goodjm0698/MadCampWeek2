import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import Logo from "../assets/Logo.png";
import { theme } from "../core/theme";
import { Button } from "@rneui/themed";

const LoadingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.text}>몰 캠{"\n"}마 켓</Text>
      <Button
        color="warning"
        title="로그인"
        titleStyle={{ fontWeight: "bold" }}
        containerStyle={{
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        color="warning"
        title="회원 가입"
        titleStyle={{ fontWeight: "bold" }}
        containerStyle={{
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Signin")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 15,
    fontSize: 40,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default LoadingPage;

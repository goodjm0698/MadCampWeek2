import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ProjectApp from "./components/ProjectApp";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Main from "./components/Main";
import ProjPage from "./components/ProjPage";
import ProjListPage from "./components/ProjListPage";
import ProjPostPage from "./components/ProjPostPage";
import ProfileEditPage from "./components/ProfileEditPage";
import Chat from "./components/Chat";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import io from "socket.io-client"; // 소켓 클라이언트 라이브러리 임포트

const socket = io("http://localhost:3000", { transports: ["websocket"] }); // 소켓 클라이언트 객체 생성 및 서버 주소 설정

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Chat"
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ProjectApp" component={ProjectApp} />
          <Stack.Screen name="ProjListPage" component={ProjListPage} />
          <Stack.Screen name="ProjPostPage" component={ProjPostPage} />
          <Stack.Screen name="ProfileEditPage" component={ProfileEditPage} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "#EEE",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
});

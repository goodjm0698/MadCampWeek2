import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ProjectApp from "./components/ProjectApp";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Main from "./components/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import io from "socket.io-client"; // 소켓 클라이언트 라이브러리 임포트
import LoadingPage from "./components/LoadingPage";

// const socket = io("http://localhost:3000", { transports: ["websocket"] }); // 소켓 클라이언트 객체 생성 및 서버 주소 설정

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}

          initialRouteName="Loading"
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Loading" component={LoadingPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ProjectApp" component={ProjectApp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

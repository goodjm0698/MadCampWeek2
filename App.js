import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TodoApp from "./components/TodoApp";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="TodoApp" component={TodoApp} />
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

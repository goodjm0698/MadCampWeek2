import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProjList from "./ProjListPage";
import ProjPost from "./ProjPostPage";
import ProjPage from "./ProjPage";
import axios from "axios";
import ProfileList from "./ProfileListPage";
import ProfilePage from "./ProfilePage";
import ProfileEdit from "./ProfileEditPage";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fb8c00",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="ProjPage"
        component={ProjPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerTitle: (props) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center", // 추가
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/Logo.png")}
              />
              <Text style={{ marginLeft: 10 }}>프로젝트 페이지</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={ProfileList}
        options={{
          title: "채팅",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
          ),
          headerTitle: (props) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center", // 추가
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/Logo.png")}
              />
              <Text style={{ marginLeft: 10 }}>채팅 페이지</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: "프로필",
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={size} />
          ),
          headerTitle: (props) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center", // 추가
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/Logo.png")}
              />
              <Text style={{ marginLeft: 10 }}>프로필 페이지</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProjList from "./ProjListPage";
import ProjPost from "./ProjPostPage";
import axios from "axios";
import ProfileList from "./ProfileListPage";
import ProfilePage from "./ProfilePage";
import ChatPage from "./ChatPage";
import ChatList from "./ChatListPage";
import ProfileEdit from "./ProfileEditPage";
import ProjAdd from "./ProjAddPage";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProjStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileList" component={ProfileList} />
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
      <ProfileStack.Screen name="ProfileEdit" component={ProfileEdit} />
    </ProfileStack.Navigator>
  );
}
function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatList" component={ChatList} />
      <ChatStack.Screen name="ChatPage" component={ChatPage} />
    </ChatStack.Navigator>
  );
}
function ProjNavigator() {
  return (
    <ProjStack.Navigator>
      <ProjStack.Screen name="ProjList" component={ProjList} />
      <ProjStack.Screen name="ProjPost" component={ProjPost} />
      <ProjStack.Screen name="ChatPage" component={ChatPage} />
    </ProjStack.Navigator>
  );
}

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
        component={ProjNavigator}
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
        component={ChatNavigator}
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
        component={ProfileNavigator}
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

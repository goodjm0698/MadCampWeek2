import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjList from "./ProjListPage"; // 아이템 리스트 컴포넌트
import ProjPost from "./ProjPostPage";

const ProjStack = createStackNavigator();

const ProjPage = () => {
  return (
    <ProjStack.Navigator
      presentation="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProjStack.Screen name="ProjPost" component={ProjPost} />
      <ProjStack.Screen name="ProjList" component={ProjList} />
    </ProjStack.Navigator>
  );
};

export default ProjPage;

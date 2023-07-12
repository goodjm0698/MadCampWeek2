import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";

export default function MessageComponent({ item, user }) {
const status = item.user !== user;
  
const dateString = item.time;

// 문자열을 Date 객체로 변환
const date = new Date(dateString);

// 날짜, 시간, 분, 초를 추출
const year = date.getFullYear();
const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// 출력 형식에 맞게 조합
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            style={styles.mavatar}
          />
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
            }
          >
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{`${formattedDate} ${formattedTime}`}</Text>
      </View>
    </View>
  );
}

import React, { useState } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { View } from "react-native";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar:
          "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
      },
    },
    {
      _id: 2,
      text: "right",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native",
        avatar:
          "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
      },
    },
    {
      _id: 3,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar:
          "https://cdn.pixabay.com/photo/2023/06/18/04/57/crimson-collared-tanager-8071235_1280.jpg",
      },
    },
  ]);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#ffa500",
          },
          left: {
            backgroundColor: "white",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} alwaysShowSend>
        <View>
          <IconButton icon="send-circle" size={20} />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
    />
  );
};

export default ChatPage;

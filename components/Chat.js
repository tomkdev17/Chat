import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({route, navigation}) => {
    
    const [messages, setMessages ] = useState([]);
    const {name, backgroundColor} = route.params;
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    };

    useEffect(() => {
        setMessages([
            {
              _id: 1,
              text: "Hello developer",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            {
                _id: 2,
                text: 'You have entered the chat',
                createdAt: new Date(),
                system: true,
            },
          ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({title: name}); 
    }, [name, navigation]);

    const renderBubble = (props) => {
        return <Bubble 
            {...props}
            wrapperStyle = {{
                right: {
                    backgroundColor: '#000'
                },
                left: {
                    backgroundColor: '#FFF'
                }
            }}
        />
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}        
                user={{
                    _id : 1
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})
export default Chat ; 
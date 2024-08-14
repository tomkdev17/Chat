import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';

const Chat = ({route, navigation, db}) => {
    
    const [messages, setMessages ] = useState([]);
    const {name, backgroundColor, userID} = route.params;

    //Adds messages to Firestore DB 
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    };

    useEffect(() => {
        //Queries Firestore DB for all new messages
        const q = query(
            collection(db, 'messages'), 
            orderBy('createdAt', 'desc'), 
            // where('uid', '==', userID)
            );
        const unsubMessages = onSnapshot(q, (chats) => {
            let newMessages = [];
            chats.forEach(chat => {
                newMessages.push({
                    id: chat.id, 
                    ...chat.data(),
                    createdAt: new Date(chat.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages);
        })
        //Ensures that the messages query does not fire if not needed
        return () => {
            if(unsubMessages) unsubMessages();
        }

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
                    _id : userID,
                    name : name
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }
})
export default Chat ; 

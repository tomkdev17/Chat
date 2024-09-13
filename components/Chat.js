import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import MapView from 'react-native-maps';

import CustomActions from './CustomActions';

const Chat = ({route, navigation, db, isConnected, storage}) => {
    
    const [messages, setMessages ] = useState([]);
    const {name, backgroundColor, userID} = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    };

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    let unsubMessages ; 
    useEffect(() => {
        if(isConnected === true) {
            //Prevents multiple instances of snapshot listeners
            if(unsubMessages) unsubMessages();
            unsubMessages = null;

            //Queries Firestore DB for all new messages
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (chats) => {
                let newMessages = [];
                chats.forEach(chat => {
                    newMessages.push({
                        id: chat.id, 
                        ...chat.data(),
                        createdAt: new Date(chat.data().createdAt.toMillis())
                    })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            })
        } else loadCachedMessages();

        navigation.setOptions({title: name}); 

        //Ensures that the messages query does not fire if not needed
        return () => {
            if(unsubMessages) unsubMessages();
        };
    }, [name, navigation, isConnected]);

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

    const renderInputToolbar = (props) => {
        if(isConnected) return <InputToolbar {...props} /> ; 
        else return null;
    }

    const renderCustomActions = (props) => {
        return <CustomActions onSend={onSend} storage={storage} userID={userID} {...props} />;
    }

    // Renders mapView for location messages
    const renderCustomView = (props) => {
        const {currentMessage} = props;
        if (currentMessage.location) {
            return(
                <MapView
                    style={{width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3}}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
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

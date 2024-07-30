import { StyleSheet, View, Text, Button } from 'react-native';
import { useEffect } from 'react';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const Chat = ({route, navigation}) => {
    
    const {name, backgroundColor} = route.params;

    useEffect(() => {
        navigation.setOptions({title: name}); 
    }, [name, navigation]);

    return (
        <View style={[styles.container, {backgroundColor}]}>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: background
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Chat ; 
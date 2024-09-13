import { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import Start from './components/Start';
import Chat from './components/Chat';


const Stack = createNativeStackNavigator();

export default function App() {
  
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyBVqPIsj27zoAgmmwzVCaYDELJ7sSFo85s",
    authDomain: "chat-app-2a9bd.firebaseapp.com",
    projectId: "chat-app-2a9bd",
    storageBucket: "chat-app-2a9bd.appspot.com",
    messagingSenderId: "367493884642",
    appId: "1:367493884642:web:e682070fbfca6ed893ccbb"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Enables offline capability
  useEffect(() => {
    if(connectionStatus.isConnected === false) {
      Alert.alert('Connection has been lost!');
      disableNetwork(db);
    } else if(connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen 
          name='Start'
          component={Start}
          options={{headerShown: false}}
        />
        <Stack.Screen name='Chat'>
          {props => <Chat 
            isConnected={connectionStatus.isConnected}
            db={db} 
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

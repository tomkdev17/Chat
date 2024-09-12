import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({wrapperStyle, iconTextStyle, onSend, storage, userID}) => {

    const actionSheet = useActionSheet();

    const shareLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions.granted) {
            const location = await Location.getCurrentPositionAsync();
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert('Location could not be fetched');
        } else Alert.alert('Permission to access location has not been granted');
    }

    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1]; 
        return `${userID}-${timeStamp}-${imageName}`; 
    };
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({image: imageURL});
        })
    }
    const choosePhoto = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissions.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if(!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri);
            } 
        } else Alert.alert("Access to photos hasn't been granted");
    }

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if(permissions.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if(!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else Alert.alert("Camera access hasn't been granted");
    }
    const onActionPress = () => {
        const options = ['Choose a photo', 'Take a photo', 'Share Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        actionSheet.showActionSheetWithOptions(
            {options, cancelButtonIndex},
            async (buttonIndex) => {
                switch(buttonIndex){
                    case 0:
                        choosePhoto();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2: 
                        shareLocation();
                        return;
                    default: 
                }
            }
        )
    }; 

    return(
        <TouchableOpacity 
        accessible={true}
        accessibilityLabel='More Options'
        accessibilityHint='Opens a menu with options to send a photo or your current location.'
        accessibilityRole='Button'
        style={styles.container} 
        onPress={onActionPress}
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

export default CustomActions ; 
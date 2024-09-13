import { useState } from 'react'; 
import { getAuth, signInAnonymously } from 'firebase/auth';
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput, 
    TouchableOpacity, 
    ImageBackground, 
    KeyboardAvoidingView, 
    Platform,
    Alert, 
} from 'react-native'; 


const Start = ({navigation}) => {

    const auth = getAuth();
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState(colors[0]);

    //Uses Firebase anonymous authentication
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
               navigation.navigate('Chat', {name: name, backgroundColor: background, userID: result.user.uid});
               Alert.alert('Signed in succesfully!');
            })
            .catch((error) => {
                Alert.alert('Unable to sign in at this time');
            })
    }

    return (
        <View style={styles.parent}>
          <ImageBackground source={require("../assets/background-image.png")} style={styles.bgImage}>
            <Text style={styles.title} >RendezYou</Text>
            <View style={styles.container} >
                <TextInput 
                    value={name}
                    onChangeText={setName}
                    placeholder='Your Name'
                    style={styles.textInput}
                    placeholderTextColor='rgba(117, 112, 131, 0.5)'
                />
                <View style={styles.colorChoose}>
                    <Text style={styles.colorChooseText}>Choose Background Color:</Text>
                    <View style={styles.colorButton}>
                        {colors.map((color, index) => 
                            <TouchableOpacity 
                                accessible={true}
                                accessibilityLabel='Change background color of chat'
                                accessbilityHint='There are four color options to customize the look of the chat'
                                key={index}
                                style={[
                                    styles.colorButton,
                                    {
                                        backgroundColor: color,
                                        borderWidth: background === color ? 3 : 0,
                                        borderColor: background === color ? 'rgba(117, 112, 131, 0.5)' : 'transparent',
                                    },
                                ]}
                                onPress = {() => setBackground(color)}
                            />
                        )}
                    </View>
                    
                </View>
                <TouchableOpacity 
                    accessible={true}
                    accessibilityLabel='Enter the chat'
                    accessibilityHint='Leaves the home screen for the Chat screen'
                    onPress={signInUser} style={styles.button}>
                    <Text style={styles.buttonText}>Enter the Chat</Text>
                </TouchableOpacity>

                {/* The keybaord avoiding view is supposed to help with the keyboard covering up UI elements but the android emulator still struggles ? */}
                {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : <KeyboardAvoidingView behavior="height" />}
            </View>
        </ImageBackground>  
        </View>
        
    );
};

const styles = StyleSheet.create({
    //commented out percentage based styles were meant to adhere to the project design specs
    parent: {
        flex: 1, 
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        fontSize: 55, 
        fontWeight: '600', 
        color: '#FFFFFF',
        marginTop: 175,
        // marginVertical: '33%', 
        textAlign: 'center'
    },
    container: {
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 40,
        marginTop: 250,
        marginBottom: 50,
        // marginHorizontal: '6%',
        // marginTop:'50%',
        // marginBottom:'10%',
        // width: "88%",
        // height: '44%',
        // width: 50,
        // height:'100',
        borderRadius: 15,
        backgroundColor: '#fff'
    },
    textInput: {
        // width: "88%",
        width: 300, 
        padding: 15, 
        borderWidth: 1, 
        borderRadius: 15,
        marginTop: 5, 
        marginBottom: 15, 
        textAlign: 'center',
        // fontWeight: '300',
    },
    button: { 
        backgroundColor: '#757083',
        width: 300, 
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }, 
    buttonText: {
        color: '#ffffff',
        fontSize: 16, 
    },
    bgImage: {
        flex: 1, 
        justifyContent: 'center',
        height:'100%',
        width:'100%',
    }, 
    colorChoose:{
        width: 300,
        padding: 15, 
        marginBottom: 20, 
        textAlign: 'left',
    },
    colorChooseText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        marginBottom: 15,
    },
    colorButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        width: 50, 
        height: 50, 
        borderRadius: 30, 
        marginRight: 15,
    }, 
});

export default Start ; 
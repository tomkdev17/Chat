# Chat (RendezYou) 

At this point in my career I've done a few projects using React, however this is my very first project using React Native. It's been fun exploring the differences between React and it's Native counterpart. 

Please check the package.json file for a complete list of all dependencies, however here is a brief description of the main dependencies: 

## Development Environment 

### Node
This app is created with Expo (v51.0.20) which (at the creation of this app) only supports node 16 or less. If you're running a higher version of node you'll have to downgrade. To downgrade your node run the following commands : 

`nvm install 16.19.0`
`nvm use 16.19.0`
`nvm alias default 16.19.0`

*The last command is not available to Windows users at the time of creation. 

### Expo

After you've downgraded node you can download the expo cli with the following command : 

`npm install -g expo-cli`

You'll also need to create an Expo [account](https://expo.dev/) .

Expo offers a mobile app for development/testing called Expo Go which you can use to run this project in realtime on your personal device, however you can also use an emulator ([Android Studio](https://developer.android.com/studio/install?gad_source=1&gclid=CjwKCAjwxY-3BhAuEiwAu7Y6s7yRv11CKh-m9KyZURbyVUVZg-MB9PqOxpWXtWR2ZK7HibZPSRCqdhoCC9QQAvD_BwE&gclsrc=aw.ds), [Xcode](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) )

To run this project using Expo, navigate to the project in your terminal and run the following command :

`npx expo start`

Expo will show a menu of commands you can then use to open the project in your emulator. The project will be running and accesible in the Expo Go app, however you will have to start your emulator/simulator prior to running these commands in order to open the project. 

### Firebase

Chat's information is stored using [Google Firebase](https://firebase.google.com/) . A google account is required to create a Firebase account. 

Once you've created your Firebase account, you'll need to create a new project and create a firestore db to store your messages (reminder to allow read/write access which can be found under the rules tab). 

You'll also need to use Firebase Cloud Storage in order to store photos. You'll find the link to Storage under the Build tab in your Firebase project and you'll have to initialize it the same way as you did the firebase db. 

The final element that Chat requires of Firebase is Anonymous Authentication. This can be enabled by clicking on Authentication in your Project's build menu, then selecting Anonymous, and clicking enable. 

Once you've set up Firebase with these three elements, head over to the project settings where you will find a section called 'Your Apps'. Click on the Firestore for Web button (</>) to register your app. This will generate the configuration code for your database that you will have to paste into your App.js file in place of the existing configuration code. 



## Thanks for checking out my Chat project!
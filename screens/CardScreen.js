
import React from 'react'
import {View, Text, Image, Button, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight, Dimensions, Touchable, Alert, ScrollView} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import axios from 'axios';

export default class ProfileScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        uid: "",
        currentPassword: "",
        newPassword: "",
        newEmail: "",
    }
    

    componentDidMount() {
        const { email, displayName, uid } = firebase.auth().currentUser;
        
        this.setState({ email, displayName, uid });
    }

    onSignoutPress = () => {
      firebase.auth().signOut();
    }

    reauthenticate = (currentPassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    }
  
    // Changes user's password...
    onChangePasswordPress = () => {
      this.reauthenticate(this.state.currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPassword).then(() => {
          Alert.alert("Password was changed");
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }
  
    // Changes user's email...
    onChangeEmailPress = () => {
      this.reauthenticate(this.state.currentPassword2).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(this.state.newEmail).then(() => {
          Alert.alert("Email was changed");
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }

    addRestaurant = () => {
      axios
      .post('https://qrcard-server.herokuapp.com/user', {
        name: this.state.name,
        category: this.state.category,
        lat: this.state.lat,
        long: this.state.long,
        adress: this.state.uid,
        card: this.state.card
      })
      .then(function (response) {
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
    }

    render() {
        return (
          <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>

          <View style={styles.form}>

          <TextInput style={styles.input} value={this.state.name}
            placeholder="Name" autoCapitalize="none"
            onChangeText={(text) => { this.setState({name: text}) }}
          />

          <TextInput style={styles.input} value={this.state.category}
            placeholder="Category" autoCapitalize="none"
            onChangeText={(text) => { this.setState({category: text}) }}
          />

          <TextInput style={styles.input} value={this.state.lat}
            placeholder="Latitude" autoCapitalize="none"
            onChangeText={(text) => { this.setState({lat: text}) }}
          />

          <TextInput style={styles.input} value={this.state.long}
            placeholder="Longitude" autoCapitalize="none"
            onChangeText={(text) => { this.setState({long: text}) }}
          />

          <TextInput
            style={styles.input2} value={this.state.card}
            underlineColorAndroid="transparent"
            placeholder="Card"
            numberOfLines={10}
            multiline={true}
            onChangeText={(text) => { this.setState({card: text}) }}
          />

          <TouchableOpacity style={styles.button} onPress={this.addRestaurant}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Add a card</Text>
          </TouchableOpacity>                 
                
        </View>
        </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1EEEE"
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    header:{
      backgroundColor: "#305049",
      height:100,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "#F1EEEE",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop: 30
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#F1EEEE",
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:5,
      backgroundColor: "#305049",
    },
    button: {
      backgroundColor: "#305049",
      borderRadius: 4,
      height: 52,
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center"
    },  
    logout: {
      color: "red",
      marginTop: 15,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    },  
    input: {
      borderBottomColor: "#8A8F9E",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      marginTop: 20,
      color: "#161F3D"
    },
    input2: {
      borderBottomColor: "#8A8F9E",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      marginTop: 20,
      color: "#161F3D",
      height: 150
    },
    form: {
      marginBottom: 48,
      marginHorizontal: 30
    },
    inputTitle: {
      color: "#8A8F9E",
      fontSize: 10,
      textTransform: "uppercase"
    },
  });
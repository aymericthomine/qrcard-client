
import React from 'react'
import {View, Text, Image, Button, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight, Dimensions, Touchable, Alert, ScrollView} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as firebase from 'firebase'

export default class ProfileScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        currentPassword: "",
        newPassword: "",
        newEmail: "",
    }
    

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
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
      .post('http://localhost:3000/user', {
        name: this.state.name,
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
          
          <View style={styles.menu} > 


          <Image source={require('../images/aymeric.png')} style={ styles.logoMenu } />

          <View style={styles.form} > 

          <Text style={{marginBottom: 20, fontSize: 15, color: "#305049"}}>Name : {this.state.displayName}</Text> 
          <Text style={{marginBottom: 30, fontSize: 15, color: "#305049"}}>Email : {this.state.email}</Text>                    
          </View>
      
          </View>

          <View style={styles.form}>

          <View>
  
          <TextInput style={styles.input} value={this.state.currentPassword}
            placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => { this.setState({currentPassword: text}) }}
          />
  
          <TextInput style={styles.input} value={this.state.newPassword}
            placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => { this.setState({newPassword: text}) }}
          />
  
          <TouchableOpacity style={styles.button} onPress={this.onChangePasswordPress}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Change Password</Text>
          </TouchableOpacity>

          </View>
  
          <View style={{ marginTop: 32 }}>

          <TextInput style={styles.input} value={this.state.newEmail}
            placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
            onChangeText={(text) => { this.setState({newEmail: text}) }}
          />

          <TextInput style={styles.input} value={this.state.currentPassword2}
            placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => { this.setState({currentPassword2: text}) }}
          />
  
          <TouchableOpacity style={styles.button} onPress={this.onChangeEmailPress}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Change Email</Text>
          </TouchableOpacity>

          </View>

          <View style={{ marginTop: 32 }}>
          </View>

          </View>
          <Text style={styles.logout} onPress={this.onSignoutPress}>Logout</Text>

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
    menu: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
  },
    form: {
      marginBottom: 10,
      marginHorizontal: 30
    },
    inputTitle: {
      color: "#8A8F9E",
      fontSize: 10,
      textTransform: "uppercase"
    },
    logoMenu: {
      width: 80,
      height: 80,
      marginBottom: 50,
      marginLeft: 10,
      marginRight: 30,
  },
  });
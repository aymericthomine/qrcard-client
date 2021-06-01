import React from 'react';
import {View, Text, Image, Button, StyleSheet, TouchableOpacity, TouchableHighlight, Dimensions, Touchable} from 'react-native'
import * as firebase from 'firebase'
import Animated from 'react-native-reanimated';
import axios from 'axios';

export default class DashboardScreen extends React.Component {
  
    
    state = {
        email: "",
        displayName: "",
        uid: "",
        text: "1",
        mapRegion: { latitude: 48.866667, longitude: 2.333333, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        hasLocationPermissions: false,
        locationResult: null,
        restaurants: [],
        users: [],
        id: 1

    }


    componentDidMount() {
        const { email, displayName, uid } = firebase.auth().currentUser;

        this.setState({ email, displayName, uid });
 
        axios.get(`https://qrcard-server.herokuapp.com/users/`+ this.state.id).then(response => response.data)
    .then((data) => {
      this.setState({ users: data })
     })
        
    }



    render() {

   

        return (
          
            <View style={styles.container}>

                <Text style={styles.greeting}> Hello { this.state.displayName }.</Text>

                <View style={styles.container}>

                </View>

                <View style={styles.menu3} > 
                <Image source={require('../images/stat.png')} style={ styles.logoMenu3 } />
                <Image source={require('../images/3.png')} style={ styles.logoMenu1 } />
                </View>

                <View style={styles.menu2} > 
                <Text style={styles.titleMenu}> MY CARD (ID : { this.state.id })</Text>
                <Text style={styles.titleMenu2}> NAME : Burger STREET</Text>
                <Text style={styles.menuContent}> {this.state.users}</Text>
                </View>

                <View style={styles.menu} > 
                
                <Text style={{ marginLeft: 25, marginRight: 25, marginTop: 5}} onPress={() => this.props.navigation.navigate("Profile")}> 
                <Image source={require('../images/profile.png')} style={ styles.logoMenuSmall } />
                </Text>

                <Text onPress={() => this.props.navigation.navigate("Card")}> 
                <Image source={require('../images/add-card.png')} style={ styles.logoMenu } />
                </Text>

                <Text style={{ marginLeft: 25, marginRight: 25, marginTop: 5}} onPress={() => this.props.navigation.navigate("QRCode")}> 
                <Image source={require('../images/qrcode.png')} style={ styles.logoMenuSmall } />
                </Text>


                </View>
            


            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#305049",
      alignItems: "center",
      justifyContent: "center",
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: '#ffffff'
    },
    menuContent: {
        marginTop: 32,
        marginBottom: 50,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: '#305049'
    },
    titleMenu: {
        fontSize: 28,
        marginTop: 15,
        marginBottom: 5,
        fontWeight: "400",
        textAlign: "center",
        color: '#305049',
        fontWeight: "bold"
    },
    titleMenu2: {
        fontSize: 15,
        marginBottom: 20,
        fontWeight: "400",
        textAlign: "center",
        color: '#305049',
        backgroundColor: "#DCEDD0",
        padding: 3,
        fontWeight: "bold"
    },
    menu: {
        flexDirection: "row-reverse",
        width: 250,
        height: 72,
        borderRadius: 30,
        marginBottom: 50,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
    },
    menu2: {
        width: 330,
        height: 300,
        borderRadius: 30,
        marginBottom: 50,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
    },
    menu3: {
        flexDirection: "row-reverse",
        width: 330,
        height: 130,
        borderRadius: 30,
        marginBottom: 50,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
    },
    logoMenu3: {
        width: 100,
        height: 100,
    },
    logoMenu: {
        width: 80,
        height: 80,
    },
    logoMenu1: {
        width: 100,
        height: 100,
        marginRight: 50
    },
    logoMenuSmall: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    }
});
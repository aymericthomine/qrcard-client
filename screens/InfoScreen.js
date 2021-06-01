import React from 'react'
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`QRCARD is the best app to scan card in restaurants.`}</Text>
                <Text style={styles.title}>{`It supports more than 10 types such as : EQS, QR Code, Data Matrix, Quick Code, EAN8, Code39 and Code128.`}</Text>
                <Text style={styles.title3}>{`Key features:`}</Text>
                <Text style={styles.title2}>{`- Scan a QRCARD`}</Text>
                <Text style={styles.title2}>{`- Share to friends`}</Text>
                <Text style={styles.title2}>{`- Create a QRCARD`}</Text>
                <Text style={styles.title2}>{`- Localisation of restaurants`}</Text>

                <Text style={styles.title4}>{`Terms of Service: http:qrcard-server.herokuapp.com/termsofservice`}</Text>
                <Text style={styles.title}>{`Privacy Policy: http:qrcard-server.herokuapp.com/privacypolicy`}</Text>

                <Text style={styles.greeting}>{`Copyright © 2021 QRCARD. All rights reserved.`}</Text>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginLeft: 20,
        marginTop: 200,
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center",
        color: '#305049'
    },
    title: {
        marginLeft: 20,
        marginTop: 50,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left",
        color: '#305049'
    },
    title2: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left",
        color: '#305049'
    },
    title3: {
        marginTop: 50,
        marginLeft: 20,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left",
        color: '#305049'
    },
    title4: {
        marginTop: 50,
        marginLeft: 20,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left",
        color: '#305049'
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
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
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#305049",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});
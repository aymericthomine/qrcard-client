import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Share, Image} from 'react-native';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
 
class QRScreen extends Component {
  state = {
    text: '1',
  };



  saveQRCode = () => {
    this.svg.toDataURL(this.callback);
  };



callback(dataURL) {
    console.log(dataURL);
    let shareImageBase64 = {
      title: 'React Native',
      message: "Discover my digital card now !",
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    Share.share(shareImageBase64).catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputTitle}>

        <Text style={{ color: "white"}}>TAP ID OF YOUR CARD</Text>
        </View>
      
        <TextInput
        style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />

          <TouchableHighlight onPress={this.onClick}>
        <View             style={{ marginTop: 100}}
>
          <QRCode
            value={this.state.text.length > 0 ? `https://qrcard-server.herokuapp.com/users/`+this.state.text: "qrcard-server.herokuapp.com/users"}
            size={200}
          getRef={c => (this.svg = c)}
        />
        <TouchableOpacity onPress={this.saveQRCode} style={{ marginTop: 150, marginBottom: 100}}>
        <View style={styles.inputTitle}>
            <Image source={require('../images/share.png')} style={ styles.logoMenu } />
            <Text style={{ color: "white", marginRight: 10}}>SHARE QR CODE</Text>
        </View>

        </TouchableOpacity>
        </View>
      </TouchableHighlight>
      </View>
    );
  };
}
 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        width: 20,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    inputTitle: {
      color: "white",
      fontSize: 20,
      backgroundColor: "#305049",
      padding: 10,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "row-reverse",
  },
  logoMenu: {
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
}
});
 
AppRegistry.registerComponent('QRScreen', () => QRScreen);
 
module.exports = QRScreen;

import React from 'react';
import {View, Text, Image, Button, StyleSheet, TouchableOpacity, TouchableHighlight, Dimensions, Touchable} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as firebase from 'firebase'
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default class HomeScreen extends React.Component {
  
    state = {
        
        mapRegion: { latitude: 48.866667, longitude: 2.333333, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        hasLocationPermissions: false,
        locationResult: null,
        users: [] 
    }


    componentDidMount() {

        this.getLocationAsync();
        fetch('http://qrcard-server.herokuapp.com/users')
        .then(res => res.json())
        .then(data => {
        this.setState({ users: data })


      })
      .catch(console.error)
    }

    handleMapRegionChange = (mapRegion) => {
        this.setState({ mapRegion });
    };

    

    async getLocationAsync() {

        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
          this.setState({ hasLocationPermissions: true });
          const location = await Location.getCurrentPositionAsync({});
          this.setState({ locationResult: JSON.stringify(location) });

          this.setState({
            mapRegion: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            },
          });
        } else {
          alert("Location permission not granted");
        }
    }

    mapMarkers = () => {
        return this.state.users.map((user) => <Marker
          key={user.id}
          coordinate={{ latitude: parseFloat(user.lat), longitude: parseFloat(user.long) }}
          title={user.name}
          description={"ID:" + user.id + " | CATEGORY: " + user.category}
        >
        
        <View>
            <Image source={require('../images/qrcard-home.png')} 
            style={{
            width: 60,
            height: 60
            }} />
        </View>
        
        </Marker >)
      }



    render() {
        return (
          
            <View style={styles.container}>


                <View style={styles.container}>
                    <MapView 
                        style={styles.mapStyle}
                        region={this.state.mapRegion}
                        onRegionChange={this.handleMapRegionChange}
                        ><MapView.Marker coordinate={this.state.mapRegion}>
                        <View>
                          <Image source={require('../images/pin2.png')} 
                          style={{
                        width: 80,
                        height: 80
                        }} />
                        </View>
                      </MapView.Marker >
                      {this.mapMarkers()}
                    </MapView>
                </View>

                <View style={styles.menu} > 

                <Text style={{  marginLeft: 30, marginBottom: 40 }} onPress={() => this.props.navigation.navigate("Login")}> 
                <Image source={require('../images/user-home.png')} style={ styles.logoMenuSmall } />
                </Text>

                <TouchableHighlight
                    style = {{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.2,
                        height: Dimensions.get('window').width * 0.2,
                        backgroundColor:'#305049',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 50,
                    }} onPress={() => this.props.navigation.navigate("Scan")}>

                    <Image source={require('../images/scan.png')} 
                    style={{
                        width: 50,
                        height: 50,
                    }}/>
                </TouchableHighlight>
                <Text style={{  marginRight: 30, marginBottom: 40 }} onPress={() => this.props.navigation.navigate("Info")}> 
                <Image source={require('../images/info.png')} style={ styles.logoMenuSmall } />
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
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      marginTop: 200
    },
    logoMenuSmall: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    menu: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
    }
});
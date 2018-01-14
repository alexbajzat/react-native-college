import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default class LocationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            deltas: {
                longitudeDelta: 0.3,
                latitudeDelta: 0.3
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={
                        {
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                            longitudeDelta: this.state.deltas.longitudeDelta,
                            latitudeDelta: this.state.deltas.latitudeDelta
                        }
                    }>
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                        }
                        }
                    />

                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
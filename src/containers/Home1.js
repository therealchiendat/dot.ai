import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polyline} from 'google-maps-react';
import api from "./Resources/sensitive/api.json";
import trip0 from "./Resources/trips/2016-07-02--11-56-24.json";
import trip1 from "./Resources/trips/2016-07-02--13-09-31.json";
import "./Home.css";
var i;
export class Home extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  render() {
    const coords=[{lat:trip0.coords[0].lat,lng:trip0.coords[0].lng}];
    const coords1=[{lat:trip1.coords[0].lat,lng:trip1.coords[0].lng}];
    for (i=1; i<trip0.coords.length; i++) {
      coords.push({lat:trip0.coords[i].lat,lng:trip0.coords[i].lng});
      coords1.push({lat:trip1.coords[i].lat,lng:trip1.coords[i].lng});
    }
    const style = {
      width: 'auto',
      height: '80vh',
      position: 'relative'
    }

    return (
      <div container style={style}>
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          zoom={10}
          initialCenter= {{lat:trip0.coords[0].lat,lng:trip0.coords[0].lng}}
          >
        <Marker onClick={this.onMarkerClick}
                name={'Location tag'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        <Polyline
          path={coords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
        <Polyline
          path={coords1}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      </Map>
      </div>
    )
  }
}
 export default GoogleApiWrapper({
   apiKey: api.name
 })(Home)

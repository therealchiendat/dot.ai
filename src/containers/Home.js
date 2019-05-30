import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polyline} from 'google-maps-react';
import api from "./Resources/sensitive/api.json";
import "./Home.css";

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

    const style = {
      width: 'auto',
      height: '100vh',
      position: 'relative'
    }
    return (

      <div container style={style}>
      <Map google={this.props.google}
          onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'Location tag'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    )
  }
}
 export default GoogleApiWrapper({
   apiKey: api.name
 })(Home)

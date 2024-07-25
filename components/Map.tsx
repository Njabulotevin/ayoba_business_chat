import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapBox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";

const accessToken =
  "pk.eyJ1IjoibmphYnVsb3RldmluIiwiYSI6ImNseXZnODVqazFmZXYyam9pbGdxd2JyOG0ifQ.FWsYnu5aHSo57tI6m3qMrg";

MapBox.setAccessToken(accessToken);
const Map = () => {
  return (
    <MapView style={{ flex: 1 }}>
      <Camera followZoomLevel={16} followUserLocation={true} />
      <LocationPuck />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});

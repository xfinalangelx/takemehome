import React, { useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { loadSelections } from "../selectionActions";
import { useDispatch, useSelector } from "react-redux";

function MapResults() {
  const dispatch = useDispatch();

  const selectionHistory = useSelector(
    (state) => state.selections.selectionHistory
  );
  useEffect(() => {
    dispatch(loadSelections());
  }, []);

  useEffect(() => {
    //console.log(selectionHistory);
  }, [selectionHistory]);

  let place = null;

  selectionHistory.length !== 0
    ? (place =
        selectionHistory[selectionHistory.length - 1].result.geometry.location)
    : (place = { lat: 40.0, lng: -122.4194 });
  return place;
}

const Map = withGoogleMap(() => (
  <GoogleMap defaultZoom={8} center={MapResults()}>
    <Marker position={MapResults()} />
  </GoogleMap>
));

export default Map;

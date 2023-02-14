import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./AutocompleteTextbox.css";
import { addSelection } from "../selectionActions";
import { connect } from "react-redux";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const { Option } = AutoComplete;

const AutoCompleteTextbox = ({ google, addSearch }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${API_KEY}`
      );
      const data = await response.json();
      setPredictions(data.predictions);
    };
    if (search) {
      fetchPredictions();
    }
  }, [search]);

  const onSelect = async (value) => {
    const initResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${API_KEY}`
    );
    const idfetcher = await initResponse.json();
    setSearch(selectedAddress);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${idfetcher.results[0].place_id}&fields=geometry&key=${API_KEY}`
    );
    const secondResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${idfetcher.results[0].place_id}&key=${API_KEY}`
    );
    const data = await response.json();
    const location = await secondResponse.json();
    dispatch(addSelection(location));
    setSelectedPlace(data.result);
    setSelectedAddress(location.result.formatted_address);
  };

  return (
    <div className="component-wrapper">
      <AutoComplete
        style={{ width: 400 }}
        placeholder="Please Input Location"
        onSelect={onSelect}
        showSearch
        onSearch={(value) => setSearch(value)}
      >
        {predictions.map((p) => (
          <Option value={p.description}>{p.description}</Option>
        ))}
      </AutoComplete>
    </div>
  );
};

export default connect(null, { addSelection })(AutoCompleteTextbox);

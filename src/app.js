/* global window */
import React, {useState, useEffect} from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import DeckGL from '@deck.gl/react';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {TripsLayer} from '@deck.gl/geo-layers';
import {interpolateWarm} from 'd3-scale-chromatic';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Source data CSV
const DATA_URL = {
   TRIPS: [
     'https://raw.githubusercontent.com/engelsjk/adsbxutils/main/flightpathdata/deckgl/trace_full_ab1fbb_deckgl.json', // eslint-disable-line
     'https://raw.githubusercontent.com/engelsjk/adsbxutils/main/flightpathdata/deckgl/trace_full_abca00_deckgl.json', // eslint-disable-line
   ]
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  longitude: -91.36156905126727,
  latitude: 29.97256762427715, 
  zoom: 6,
  pitch: 45,
  bearing: 0,
  maxPitch: 60
};

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10"

function norm(val, max, min) { return (val - min) / (max - min); }

function App({
  trips = DATA_URL.TRIPS,
  trailLength = 1000,
  initialViewState = INITIAL_VIEW_STATE,
  mapStyle = MAP_STYLE,
  theme = DEFAULT_THEME,
  loopLength = 100000, // unit corresponds to the timestamp in source data
  animationSpeed = 50
}) {

  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = () => {
    setTime(t => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation]
  );

  const layers = [
    new TripsLayer({
      id: 'trips0',
      data: trips[0],
      getPath: d => d.path,
      getTimestamps: d => d.timestamps,
      // getColor: d => (d.name === "ab1fbb" ? theme.trailColor0 : theme.trailColor1),
      getColor: d => d.path.map(x => interpolateWarm(1-norm(x[2],40000,0)).match(/\d+/g).map(Number)),
      opacity: 0.3,
      widthMinPixels: 5,
      rounded: true,
      trailLength,
      currentTime: time,
      shadowEnabled: false
    }),
    new TripsLayer({
      id: 'trips1',
      data: trips[1],
      getPath: d => d.path,
      getTimestamps: d => d.timestamps.map(function(x) { return x + 4758.87; }), // time delta hack to sync up timestamp arrays
      // getColor: d => (d.name === "abca00" ? theme.trailColor1 : theme.trailColor0),
      getColor: d => d.path.map(x => interpolateWarm(1-norm(x[2],40000,0)).match(/\d+/g).map(Number)),
      opacity: 0.3,
      widthMinPixels: 5,
      rounded: true,
      trailLength,
      currentTime: time,
      shadowEnabled: false
    })
  ];

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <ReactMapGL mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} maxPitch={60} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default App;

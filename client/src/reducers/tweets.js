/* global google */

import * as types from '../constants/actionTypes.js';

const initialState = {
  uuid: undefined,
  isSearching: false,
  tweets: [],
  selectedTweets: [],
  searchString: ''
};

function getTweetsInBounds(state, bounds) {
  let result = [];
  const { tweets = [], searchString } = state;
  const keywords = searchString.split(','); // split searchString

  if (!bounds) {
    return;
  }

  tweets.forEach(tweet => {
    const coords = tweet.geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    if (!bounds.contains(latLng)) {
      return;
    }

    let text = tweet.text;
    // highlighting matched keywords
    for (let i = 0; i < keywords.length; i++) {
      const regex = new RegExp(keywords[i].trim(), 'ig');
      text = text.replace(regex, '<mark>$&</mark>');
    }

    result.push({
      ...tweet,
      text
    });
  });

  return result;
}

function getVectorSource(geoJSON = []) {
  return new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geoJSON, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  });
}

export function getHeatMapLayer(geoJSON = []) {
  return new ol.layer.Heatmap({
    title: 'HeatMap',
    source: getVectorSource(geoJSON),
    blur: 15,
    radius: 8,
    opacity: 0.2,
    weight: () => 1.0
  });
}

export function getClusterLayer(geoJSON = []) {
  const clusterSource = new ol.source.Cluster({
    source: getVectorSource(geoJSON),
    distance: 40
  });

  let styleCache = {};
  return new ol.layer.Vector({
    title: 'Clusters',
    source: clusterSource,
    style: feature => {
      const size = feature.get('features').length;
      let style = styleCache[size];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: '#fff'
            }),
            fill: new ol.style.Fill({
              color: '#3399CC'
            })
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff'
            })
          })
        });
        styleCache[size] = style;
      }
      return style;
    }
  });
}

export default function tweets(state = initialState, action) {
  switch (action.type) {
    case types.TWEETS_SEARCH_FETCHING:
      return {
        ...state,
        isSearching: true
      };
    case types.TWEETS_SEARCH_FINISHED:
      return {
        tweets: action.tweets,
        searchString: action.searchString,
        uuid: action.uuid,
        selectedTweets: [],
        isSearching: false
      };
    case types.MAP_CLICK:
      // if there are no tweets at all, then do not even bother
      if (!state.tweets.length) {
        return state;
      }

      return {
        ...state,
        selectedTweets: getTweetsInBounds(state, action.bounds)
      };
    default:
      // nothing to do
      return state;
  }
}

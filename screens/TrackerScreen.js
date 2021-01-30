import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { get } from 'lodash';

function TrackerScreen() {
  const route = useRoute();
  console.log('route', route);
  const { trackerId } = route.params;
  const trackerMeta = useSelector((state) => get(state, `firebase.data.trackersMeta.examples.${trackerId}`));
  return (
    <Text>{JSON.stringify(trackerMeta)}</Text>
  );
}

export default TrackerScreen;

import React from 'react';
import {
  Pressable,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Typography from './Typography';
import { colors } from '../theme';
import { halfGutter, getGridItemWidth, shadowProps } from '../utils';

function Tracker(props) {
  const {
    name = 'Name',
    trackerId,
    icon,
  } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Tracker', { title: name, trackerId })}>
      <View style={styles.container}>
        {
          icon
            ? <Icon {...icon} size={32} />
            : (
              <Typography style={{
                fontSize: 32, color: 'black',
              }}
              >
                {name.toLowerCase()[0]}
              </Typography>
            )
        }
        <Typography style={styles.text}>{name}</Typography>
      </View>
    </Pressable>
  );
}

const styles = {
  container: {
    width: getGridItemWidth(3),
    height: getGridItemWidth(3),
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    margin: halfGutter,
    paddingTop: halfGutter,
    paddingBottom: halfGutter,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowProps,
  },
  text: {
    position: 'absolute',
    bottom: halfGutter,
    color: colors.text,
  },
};

export default Tracker;

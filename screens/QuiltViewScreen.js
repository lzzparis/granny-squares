import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  get, map, size, values,
} from 'lodash';

import GridItem from '../components/GridItem';
import QuiltSquare from '../components/QuiltSquare';

import { styles as themeStyles } from '../theme';
import { uid } from '../constants';

function QuiltViewScreen() {
  const route = useRoute();
  const { projectId } = route.params;
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { colors: projectColors, saved } = project;
  const [width, setWidth] = useState(6);
  const [length, setLength] = useState(10);

  const getQuiltSquares = () => {
    const savedValues = values(saved);
    const savedLength = size(saved);
    return map(new Array(width * length), (_, index) => savedValues[index % savedLength]);
  };

  const [quiltSquares, setQuiltSquares] = useState(getQuiltSquares());

  useEffect(() => {
    setQuiltSquares(getQuiltSquares());
  }, [width, length]);

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={themeStyles.scrollContainer}
      >
        <View style={themeStyles.card}>
          <Text style={themeStyles.h2}>Width</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setWidth(text)}
            value={width}
          />
          <Text style={themeStyles.h2}>Length</Text>
          <TextInput
            style={themeStyles.textInput}
            onChangeText={(text) => setLength(+text)}
            value={length}
          />
        </View>
        <View style={styles.quiltContainer}>
          {map(quiltSquares, (colorIds, quiltSquareIndex) => (
            <GridItem key={`quilt-square-${quiltSquareIndex}`} columns={width}>
              <QuiltSquare colorIds={colorIds} projectColors={projectColors} />
            </GridItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  quiltContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default QuiltViewScreen;

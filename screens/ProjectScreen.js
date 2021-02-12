// name
// button for edit screen
// button for colors? (new screen?)
//

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  get,
  keys,
  map,
  size,
  sample,
  pull,
} from 'lodash';

import Button from '../components/Button';
import ColorBlob from '../components/ColorBlob';
import ColorSelect from '../components/ColorSelect';
import FeedbackModal from '../components/FeedbackModal';
import GrannySquare from '../components/GrannySquare';
import GridItem from '../components/GridItem';

import { uid } from '../constants';
import {
  styles as themeStyles,
} from '../theme';

const randomizeColors = ({
  tiers, projectColors, workingColorIds, isLocked,
}) => {
  const colorOptions = keys(projectColors);
  const newWorkingColorIds = new Array(tiers);
  for (let i = 0; i < tiers; i++) {
    if (workingColorIds && isLocked[i]) {
      newWorkingColorIds[i] = workingColorIds[i];
    } else {
      newWorkingColorIds[i] = sample(colorOptions);
    }
    pull(colorOptions, newWorkingColorIds[i]);
  }
  return newWorkingColorIds;
};

function ProjectScreen() {
  const route = useRoute();
  const { projectId } = route.params;

  const firebase = useFirebase();
  useFirebaseConnect(`projects/${uid}`);
  const project = useSelector((state) => get(state, `firebase.data.projects.${uid}.${projectId}`, {}));
  const { tiers = 3, colors: projectColors } = project;

  const starterColors = randomizeColors({ projectColors, tiers });
  const [workingColorIds, setWorkingColorIds] = useState(starterColors);
  const [colorToEditId, setColorToEditId] = useState(null);
  const [colorToEditIndex, setColorToEditIndex] = useState(null);
  const [isLocked, setIsLocked] = useState(new Array(tiers));
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({});

  // Database functions
  const saveSquare = async (e) => {
    e.preventDefault();
    //
    const res = await firebase.push(`projects/${uid}/${projectId}/saved`, workingColorIds).then((res) => console.log('lzz res', res));
    if (res === 'error') {
      setFeedback({ type: 'error', message: 'Error saving square' });
      setFeedbackOpen(true);
    } else {
      setFeedback({ type: 'success', message: 'Save successful!' });
      setFeedbackOpen(true);
    }
    setTimeout(() => setFeedbackOpen(false), 2000);
  };

  // Randomizing functions
  const toggleLockColor = (index) => () => {
    const newIsLocked = [...isLocked];
    newIsLocked[index] = !newIsLocked[index];
    setIsLocked(newIsLocked);
  };

  // ColorEditor functions
  const openColorEditor = (colorId, colorIndex) => () => {
    setColorToEditId(colorId);
    setColorToEditIndex(colorIndex);
  };

  const saveColor = (colorToSave, index) => () => {
    const newColors = [...workingColorIds];
    newColors[index] = colorToSave;
    setWorkingColorIds(newColors);
    setColorToEditId(null);
  };

  const cancelColorEdit = () => {
    setColorToEditId(null);
  };

  return (
    <SafeAreaView style={themeStyles.screenContainer}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={themeStyles.scrollContainer}
      >
        <View style={styles.colorBlobs}>
          <Text style={themeStyles.h2}>Colors</Text>
          <View style={styles.blobsGroup}>
            {map(workingColorIds, (colorId, colorBlobIndex) => (
              <GridItem
                key={`color-blob-${colorBlobIndex}`}
                columns={size(workingColorIds)}
                withPadding
              >
                <ColorBlob
                  name={get(projectColors, `${colorId}.name`, '-NAME-')}
                  hex={get(projectColors, `${colorId}.hex`, '#a1beef')}
                  onPress={openColorEditor(colorId, colorBlobIndex)}
                  locked={isLocked[colorBlobIndex]}
                />
              </GridItem>
            ))}
          </View>
        </View>
        <GrannySquare projectColors={projectColors} colorIds={workingColorIds} />
      </ScrollView>
      <View style={styles.buttonsGroup}>
        <Button
          title="Save"
          onPress={saveSquare}
        />
        <Button
          title="Randomize"
          onPress={() => setWorkingColorIds(randomizeColors({
            workingColorIds, isLocked, projectColors, tiers,
          }))}
        />
      </View>
      <ColorSelect
        projectColors={projectColors}
        colorToEditId={colorToEditId}
        onSaveColor={saveColor}
        onCancel={cancelColorEdit}
        colorToEditIndex={colorToEditIndex}
      />
      <FeedbackModal open={feedbackOpen} type={feedback.type} message={feedback.message} />
    </SafeAreaView>
  );
}
const styles = {
  listContainer: {},
  colorBlobs: {
    ...themeStyles.card,
  },
  blobsGroup: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
  buttonsGroup: {
    flexDirection: 'row',
  },
};

export default (ProjectScreen);

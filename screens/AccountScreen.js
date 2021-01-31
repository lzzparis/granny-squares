import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

function AccountScreen({ uid, user }) {
  const { name: savedName } = user;
  const [name, setName] = useState(savedName || '');
  const saveForm = () => {
    window.db.ref(`/users/${uid}`).set({ name });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
      >
        <>
          <Text>You've arrived at the account screen!</Text>
          <View>
            <Text>
              Name:
              {savedName}
            </Text>
            <TextInput onChangeText={(val) => setName(val)}>{name}</TextInput>
          </View>
          <Button onPress={saveForm} title="Save" />
        </>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = {
  container: {},
  listContainer: {},
};

const mapStateToProps = (state) => ({
  uid: state.user.auth.uid,
  user: state.user.data,
});

export default connect(mapStateToProps)(AccountScreen);

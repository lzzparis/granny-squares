import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView, ScrollView, TextInput, View, Button,
} from 'react-native';
import Typography from '../components/Typography';

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
          <Typography>You've arrived at the account screen!</Typography>
          <View>
            <Typography>
              Name:
              {savedName}
            </Typography>
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

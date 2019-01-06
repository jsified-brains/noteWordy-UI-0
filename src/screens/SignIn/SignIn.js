import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RF from "react-native-responsive-fontsize"
import { UserSignIn }  from  '../../components';

export default class SignInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
            <Text  style={styles.titleText}>Sign in to NoteWordy</Text>
        </View>
        <View style={styles.content}>
            <UserSignIn navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2
  },
  titleText: {
    fontSize: RF(3.5)
  }, 
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component<{}> {

  state = { loggedIn: false }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqD5Z5sjsVQXFBIw1V3omXBOezMxzWA1Q',
      authDomain: 'auth-b26c7.firebaseapp.com',
      databaseURL: 'https://auth-b26c7.firebaseio.com',
      projectId: 'auth-b26c7',
      storageBucket: 'auth-b26c7.appspot.com',
      messagingSenderId: '237085927215'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case false:
        return <LoginForm />;
      case true:
        return (
          <Card>
            <CardSection>
              <Button>Log Out</Button>
            </CardSection>
          </Card>
        );
      default:
        return (
          <Card>
            <CardSection>
              <Spinner size="large" />
            </CardSection>
          </Card>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        { this.renderContent() }
      </View>

    );
  }
}

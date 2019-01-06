import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { Container, Content, List, ListItem, Text, Button } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';

export default class HomeScreen extends Component {
    render() {
        return (
        <Container>
            <Content contentContainerStyle={styles.screenContainer}>
                <View style={styles.title}>
                    <Text  style={styles.titleText}>My Vocabulary</Text>
                </View>

                <View style={styles.content}>
                    <List>
                        <ListItem>
                            <Text>go for the jugular</Text>
                        </ListItem>
                        <ListItem>
                            <Text>whole ball of wax</Text>
                        </ListItem>
                        <ListItem>
                            <Text>volcano</Text>
                        </ListItem>
                    </List>
                    <Button transparent dark onPress={() => this.signOut()}>
                        <Text>Log out</Text>
                    </Button>
                </View>
            </Content>
        </Container>
        );
    }

    /**
     * @name signOut
     */
    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.props.navigation.navigate('SignIn');
        } catch (error) {
            console.error(error);
        }
    };
}

const styles = StyleSheet.create({
    screenContainer: {
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
    content: {
      flex: 8,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF'
    }
  });
  

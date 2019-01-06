import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class UserSignIn extends Component  {
    
    state = {
        signIn_inProgress: false,
        isUserSignedIn: false,
        loggedInUser: {},
        checkingSignedInStatus: true
    }

    constructor() {
        super();
        GoogleSignin.configure();
        this.screenFocusSubscription = {};
    }

    componentDidMount() {
        this.subscribeToDidFocus();
    }

    // subscribe to 'didFocus' event of react-navigation
    // if user comes back to this component using back button, call this.isUserSignedIn()
    // When navigating back to a screen, componentDidMount won't be triggered because
    // react-navigation keeps it in stack.
    // (we configured StackNavigation with header: null/headerMode: 'none'.
    // With no header, back button on header is not going to be visible.
    // However, on Android, user can press the hard back button)
    subscribeToDidFocus = () => {
        this.screenFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
              this.isUserSignedIn();
            }
        );
    }
    
    componentWillUnmount() {
        this.screenFocusSubscription.remove();
    }

    render() {
        if (this.state.checkingSignedInStatus) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Sign in with Google</Text>
                    <GoogleSigninButton
                        style={{ width: 200, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.onSignInPress}
                        disabled={this.state.isSigninInProgress} />
                </View>
            );
        }
    }

    
    /**
     * @name onSignInPress
     */
    onSignInPress = async () => {
        try {
            this.setState({isSigninInProgress: true});
            await GoogleSignin.hasPlayServices();
            const loggedInUser = await GoogleSignin.signIn();
            this.setState({ loggedInUser,isUserSignedIn: true,  isSigninInProgress: false });
            this.props.navigation.navigate('Home');
        } catch (error) {
            this.handleSignInError(error);
        }
    };

    /**
     * @name isUserSignedIn
     */
    isUserSignedIn = async () => {
        this.setState ({ isUserSignedIn: false, checkingSignedInStatus: true });
        const isUserSignedIn = await GoogleSignin.isSignedIn();
        if (isUserSignedIn) {
            await this.getCurrentUserInfo();
            this.props.navigation.navigate('Home');
        };
        this.setState({ isUserSignedIn, checkingSignedInStatus: false });
    };
    
    /**
     * @name getCurrentUserInfo
     */
    getCurrentUserInfo = async () => {
        try {
            const loggedInUser = await GoogleSignin.signInSilently();
            this.setState({ loggedInUser });
        } catch (error) {
            this.setState({ loggedInUser: {} });
        }
    };

    /**
     * @name signOut
     */
    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ isUserSignedIn: false, loggedInUser: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
    };

    /**
     * @name handleSignInError
     * @param error the SignIn error object
     */
    handleSignInError = async (error) => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            this.showSignInError('User cancelled the login flow.');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            this.showSignInError('Sign in is in progress.');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            await this.getGooglePlayServices();
        } else {
            this.showSignInError(JSON.stringify(error));
        }
        this.setState({ isSigninInProgress: false });
    }

    /**
     * @name getGooglePlayServices
     */
    getGooglePlayServices = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // google services are available
        } catch (err) {
            this.showSignInError('play services are not available');
        }
    }

    /**
     * @name showSignInError
     * @param alertMessage - message to be shown on alert box
     */
    showSignInError = (alertMessage) => {
        Alert.alert(
            'Google Signin Error',
            alertMessage,
            [    
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }
}

import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import {
	StackNavigator
} from 'react-navigation';
import Tab from './modules/tab/Tab.js';
import Chat from './modules/common/chat/Chat.js';


const Stack = StackNavigator({
	TAB: {
		screen: Tab,
	},
	CHAT: {
		screen: Chat
	}
})

export default Stack;
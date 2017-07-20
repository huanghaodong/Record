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
	TabNavigator
} from 'react-navigation';
import FriendsList from './friendsList/FriendsList.js';
import Zone from './zone/Zone.js';


const Tab = TabNavigator({
	FRIENDSLIST: {
		screen: FriendsList,
	},
	ZONE: {
		screen: Zone
	}
}, {
	tabBarPosition: 'bottom',
	tabBarOptions: {
		showIcon: true,
		activeTintColor: '#6ebf65', // 文字和图片选中颜色
		inactiveTintColor: '#6ebf65', // 文字和图片未选中颜色
		indicatorStyle: {
			height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
		},
		style: {
			backgroundColor: '#eee', // TabBar 背景色
		},
		labelStyle: {
			fontSize: 15, // 文字大小
			paddingTop: 0,
			marginTop: 0,
		},
	}
})

export default Tab;
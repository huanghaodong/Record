import React, {
	Component
} from 'react';
import {
	AppRegistry,
	Text
} from 'react-native';

export default class Zone extends Component {
	static navigationOptions = {
		tabBarLabel: '朋友圈'
	}
	render() {
		return (
			<Text>Zone</Text>
		);
	}
}
import React, {
	Component
} from 'react';
import {
	AppRegistry,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image
} from 'react-native';
import RNFS from 'react-native-fs';

export default class FriendsList extends Component {
	static navigationOptions = {
			tabBarLabel: '好友列表'
		}
		//创建文件夹，存放每录音
	createFile(name) {
		var path = RNFS.DocumentDirectoryPath + '/' + name;
		RNFS.mkdir(path)
			.then((success) => {
				console.log('create new dir success!');
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
	render() {
		return (
			<View>
				<ScrollView>
					<TouchableOpacity style={styles.item} onPress={()=>{this.createFile.bind(this,'laozhang');this.props.navigation.navigate('CHAT',{friendsName:'laozhang'})}}>
						
						<Image source={{uri:'http://i1.muzisoft.com/uploads/hct/20160809/b3kfpk2hdreb3kfpk2hdre.png'}} style={styles.img} />
						<Text>老张</Text>
					</TouchableOpacity>
				</ScrollView>
				<ScrollView>
					<TouchableOpacity style={styles.item} onPress={()=>{this.createFile.bind(this,'laowang');this.props.navigation.navigate('CHAT',{friendsName:'laowang'})}}>
						<Image source={{uri:'http://www.xz7.com/up/2016-4/201647114111.png'}} style={styles.img} />
						<Text>老王</Text>
					</TouchableOpacity>
				</ScrollView>
				<ScrollView>
					<TouchableOpacity style={styles.item} onPress={()=>{this.createFile.bind(this,'laoli');this.props.navigation.navigate('CHAT',{friendsName:'laoli'})}}>
						<Image source={{uri:'http://image.game.uc.cn/2015/2/10/10260730.jpg'}} style={styles.img} />
						<Text>老李</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>


		);
	}
}

const styles = StyleSheet.create({
	item: {
		borderBottomWidth: 1,
		borderColor: '#ccc',
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {
		width: 70,
		height: 70,
		resizeMode: 'stretch',
		marginLeft: 40,
		marginRight: 40
	}
})
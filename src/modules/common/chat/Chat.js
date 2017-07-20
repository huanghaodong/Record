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
	Dimensions
} from 'react-native';
import Audio from '../../../audio/Audio.js';
import uuidv1 from 'uuid/v1';
import RNFS from 'react-native-fs';
import SQLite from '../../../sqlite/Sqlite.js';
import Sound from 'react-native-sound';

var audio;
var fileName;

var sqLite = new SQLite();
var db;
export default class Chat extends Component {
	constructor(props) {
			super(props);
			this.state = {
				list: []
			}
		}
		//进入Chat页时创建对应的文件夹
	componentWillMount() {
			//创建文件夹
			this.path = RNFS.DocumentDirectoryPath + '/' + this.props.navigation.state.params.friendsName;
			RNFS.mkdir(this.path)
				.then((success) => {
					console.log('create new dir success!');
				})
				.catch((err) => {
					console.log(err.message);
				});
			//开启数据库  
			if (!db) {
				db = sqLite.open();
			}
			//建表  
			sqLite.createTable();
			//sqLite.deleteData();//清空数据表中数据
			//读取表内容,加载数据库中的数据，初始化播放按钮
			db.transaction((tx) => {
				tx.executeSql("SELECT * FROM record WHERE name=" + "'" + this.props.navigation.state.params.friendsName + "'", [], (tx, results) => {
					var len = results.rows.length;
					for (let i = 0; i < len; i++) {
						var u = results.rows.item(i);
						console.log("姓名：" + u.name + "路径" + u.path + "时间" + u.time);
						this.addplayNum(u.path, new Date(Number(u.time)).toLocaleTimeString())
					}
				});
			}, (error) => { //打印异常信息  
				console.log(error);
			});
		}
		//创建播放按钮
	createPlay(path, time) {
		return (
			<View style={styles.item} key={Date.now()}>
					<View style={styles.timeBar}>
						<Text style={styles.time}>{time||new Date().toLocaleTimeString()}</Text>
					</View>
					<TouchableOpacity style={styles.play} onPress={this.clickPlay.bind(this,path)}>
						<Text>|||</Text>
					</TouchableOpacity>
			</View>
		)
	}
	addplayNum(path, time) {
			let arr = this.state.list;
			arr.push(this.createPlay(path, time));
			this.setState({
				list: arr,
			});
		}
		//点击播放
	clickPlay(path) {
			if (audio !== undefined) {
				if (audio.state.recording == true) {
					return
				}
			}
			setTimeout(() => {
				var sound = new Sound(path, '', (error) => {
					if (error) {
						console.log('failed to load the sound', error);
					}
				});

				setTimeout(() => {
					sound.play((success) => {
							if (success) {
								console.log('successfully finished playing');
							} else {
								console.log('playback failed due to audio decoding errors');
							}
						}

					);
				}, 100);
			}, 100);
		}
		//点击说话(开始录音)
	clickSpeack() {
			if (audio !== undefined) {
				console.log(audio.state.recording)
				if (audio.state.recording === true) return;
			}
			this.fileName = uuidv1();
			audio = new Audio(this.props.navigation.state.params.friendsName, this.fileName);
			audio._record();
		}
		//点击停止(停止录音)
	clickStop() {
		this.addplayNum(this.path + '/' + this.fileName)
			//插入数据表，这个是成功停止录音的回调函数
		let insertTable = () => {
				var userData = [];
				var user = {};
				user.name = this.props.navigation.state.params.friendsName;
				user.path = this.path + '/' + this.fileName;
				user.time = Date.now();
				userData.push(user);
				//插入数据  
				sqLite.insertUserData(userData);
			}
			//停止录音
		audio._stop(insertTable);
	}
	render() {
		var _scrollView = ScrollView;
		return (
			<View>
				<ScrollView style={styles.topBox}> 
					{this.state.list}
				</ScrollView>
				<View style={styles.bottomBox}>
					<TouchableOpacity style={styles.btn} onPress={this.clickSpeack.bind(this)}>
						<Text>说话</Text>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.btn} onPress={this.clickStop.bind(this)}>
						<Text>停止</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	componentWillUnmount() {
		sqLite.close();
	}
}

const styles = StyleSheet.create({
	topBox: {
		height: 600,

	},
	item: {
		height: 100,

	},
	timeBar: {
		width: 100,
		height: 20,
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		alignSelf: 'center'
	},
	time: {
		fontSize: 12,
		color: '#fff'
	},
	play: {
		height: 40,
		width: 150,
		backgroundColor: '#6ace14',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 100,
		marginTop: 20,
		borderRadius: 8
	},
	bottomBox: {
		height: 100,
		borderTopWidth: 1,
		borderColor: '#ccc',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	btn: {
		width: 150,
		height: 70,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	}
})
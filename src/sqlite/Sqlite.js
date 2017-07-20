import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
var database_name = "weixin.db"; //数据库文件  
var database_version = "1.0"; //版本号  
var database_displayname = "MySQLite";
var database_size = -1; //-1应该是表示无限制  
var db;
export default class SQLite {
  //打开数据开
  open() {
    db = SQLiteStorage.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
      () => {
        this._successCB('open');
      },
      (err) => {
        this._errorCB('open', err);
      });
    return db;
  }
  createTable() {
      if (!db) {
        this.open();
      }
      //创建用户表  
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS RECORD(' +
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
          'name varchar,' +
          'path VARCHAR,' +
          'time VARCHAR)', [], () => {
            this._successCB('executeSql');
          }, (err) => {
            this._errorCB('executeSql', err);
          });
      }, (err) => { //所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
        this._errorCB('createTable', err);
      }, () => {
        this._successCB('createTable');
      })
    }
    //清空数据表中的数据
  deleteData() {
      if (!db) {
        this.open();
      }
      db.transaction((tx) => {
        tx.executeSql('delete from record', [], () => {

        });
      });
    }
    //删除表
  dropTable() {
      db.transaction((tx) => {
        tx.executeSql('drop table record', [], () => {

        });
      }, (err) => {
        this._errorCB('dropTable', err);
      }, () => {
        this._successCB('dropTable');
      });
    }
    //插入数据
  insertUserData(userData) {
      let len = userData.length;
      if (!db) {
        this.open();
      }
      this.createTable();
      db.transaction((tx) => {
        for (let i = 0; i < len; i++) {
          var user = userData[i];
          let name = user.name;
          let path = user.path;
          let time = user.time;
          let sql = "INSERT INTO record(name,path,time)" +
            "values(?,?,?)";
          tx.executeSql(sql, [name, path, time], () => {

          }, (err) => {
            console.log(err);
          });
        }
      }, (error) => {
        this._errorCB('transaction', error);
        ToastAndroid.show("数据插入失败", ToastAndroid.SHORT);
      }, () => {
        this._successCB('transaction insert data');
        ToastAndroid.show("成功插入 " + len + " 条用户数据", ToastAndroid.SHORT);
      });
    }
    //关闭数据库
  close() {
    if (db) {
      this._successCB('close');
      db.close();
    } else {
      console.log("SQLiteStorage not open");
    }
    db = null;
  }
  _successCB(name) {
    console.log("SQLiteStorage " + name + " success");
  }
  _errorCB(name, err) {
    console.log("SQLiteStorage " + name);
    console.log(err);
  }
};
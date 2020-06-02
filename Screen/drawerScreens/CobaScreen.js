import React, {Component} from 'react';
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ScrollView
} from 'react-native';

const BASE_URL="http://192.168.1.2:8080/";
class CobaScreen extends Component {
	constructor(props){
	super(props)
	this.state = {
		apiData: [],
		naData: []
	}
	this.dataId = null;
	this.mhs_nama = null;
	this.mhs_kelas = null;
	this.mhs_email = null;
	this.mhs_no_hp = null;
	}

	getButton = () => {
		fetch(BASE_URL+'/users',{
			method: 'GET'
		}).then((responseData) => {
			return responseData.json;
		}).then((jsonData) => {
			console.log(jsonData);
			this.setState({apiData: jsonData})
			console.log(this.state.apiData)
		}).done();
		this.dataId = null;		
	}

	searchButton = () => {
		fetch(BASE_URL+'/users'+(this.dataId),{
			method: 'GET'
		}).then((responseData) => {
			return responseData.json;
		}).then((jsonData) => {
			console.log(jsonData);
			this.setState({apiData: jsonData})
			//console.log(this.state.apiData)
		}).done();
		this.dataId = null;		
	}

	saveButton = () => {
		fetch(BASE_URL+'/users',{
			method: 'POST',
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ mhs_nama: this.mhs_nama, mhs_kelas: this.mhs_kelas, mhs_email: this.mhs_email, mhs_no_hp: this.mhs_no_hp})
		}).then((responseData) => {
			return responseData.json;
		}).then((jsonData) => {
			//console.log(jsonData);
			this.setState({naData: jsonData})
			console.log(this.state.naData)
		}).done();
		this.dataId = null;
		this.mhs_nama = null;
		this.mhs_kelas = null;
		this.mhs_email = null;
		this.mhs_no_hp = null;
	}

	deleteButton = () => {
		fetch(BASE_URL+'/users'+(this.dataId),{
			method: 'DELETE'
		}).then((responseData) => {
			console.log(responseData.rows)
		}).done();
		this.dataId = null;		
	}

	updateButton = () => {
		fetch(BASE_URL+'/users',{
			method: 'PUT',
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ mhs_nama: this.mhs_nama, mhs_kelas: this.mhs_kelas, mhs_email: this.mhs_email, mhs_no_hp: this.mhs_no_hp,
									id: this.dataId})
		}).then((responseData) => {
			return responseData.json;
		}).done();
		this.dataId = null;
		this.mhs_nama = null;
		this.mhs_kelas = null;
		this.mhs_email = null;
		this.mhs_no_hp = null;
	}

	render(){
		const data = this.state.apiData;
		console.log(data)
		if(data){
		let dataDisplay = data.map(function(jsonData){
			return (
				<View key={jsonData.id}>
					<View style={{flexDirection:'row'}}>
							<Text style={{ color: '#511099'}}>{jsonData.id} | </Text>
							<Text style={{ color: '#FF5722'}}>{jsonData.mhs_nama} | </Text>	
							<Text style={{ color: '#00FFFF'}}>{jsonData.mhs_kelas} | </Text>	
							<Text style={{ color: '#511099'}}>{jsonData.mhs_email} | </Text>
							<Text style={{ color: '#FF5722'}}>{jsonData.mhs_no_hp}</Text>						
					</View>
				</View>
				)
		});
	}
	
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 20, textAlign: 'center',marginTop: 10}}>App Users</Text>
				<View style={{height: 2, backgroundColor: '#CCCCCC',marginBottom: 10, width: '90%'}}></View>

				<TextInput style={styles.input}
					placeholder = 'Id'
					onChangeText = {(text) => {this.dataId = text}}
					value = {this.dataId}
					underlineColorAndroid = 'transparent'
				/>
				<TextInput style={styles.input}
					placeholder = 'Masukkan Nama'
					onChangeText = {(text) => {this.mhs_nama = text}}
					value = {this.mhs_nama}
					underlineColorAndroid = 'transparent'
				/>
				<TextInput style={styles.input}
					placeholder = 'Masukkan Kelas'
					onChangeText = {(text) => {this.mhs_kelas = text}}
					value = {this.mhs_kelas}
					underlineColorAndroid = 'transparent'
				/>
				<TextInput style={styles.input}
					placeholder = 'Masukkan Email'
					onChangeText = {(text) => {this.mhs_email = text}}
					value = {this.mhs_email}
					underlineColorAndroid = 'transparent'
				/>
				<TextInput style={styles.input}
					placeholder = 'Masukkan No HP'
					onChangeText = {(text) => {this.mhs_no_hp = text}}
					value = {this.mhs_no_hp}
					underlineColorAndroid = 'transparent'
				/>
				<TouchableHighlight style ={styles.button} onPress = {this.getButton}>
					<Text style = {styles.textStyle}>View Data</Text>
				</TouchableHighlight>
				<TouchableHighlight style ={styles.button} onPress = {this.searchButton}>
					<Text style = {styles.textStyle}>Search</Text>
				</TouchableHighlight>
				<TouchableHighlight style ={styles.button} onPress = {this.saveButton}>
					<Text style = {styles.textStyle}>Save</Text>
				</TouchableHighlight>
				<TouchableHighlight style ={styles.button} onPress = {this.deleteButton}>
					<Text style = {styles.textStyle}>Delete</Text>
				</TouchableHighlight>
				<TouchableHighlight style ={styles.button} onPress = {this.updateButton}>
					<Text style = {styles.textStyle}>Update</Text>
				</TouchableHighlight>

				<ScrollView contentContainerStyle={styles.container}>
					{dataDisplay}
				</ScrollView>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		marginTop: 5,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	},
	input: {
		textAlign: 'center',
		height: 30,
		width: '90%',
		padding: 4,
		marginBottom: 7,
		fontSize: 14,
		borderWidth: 1,
		borderColor: '#48afdb',
		borderRadius: 5
	},
	button: {
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		marginBottom: 3,
		width: '90%',
		backgroundColor: '#00BCD4'
	},
	textStyle: {
		color: '#FFFFFF',
		fontSize: 14,
		textAlign: 'center'
	}
})

export default CobaScreen;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Router from './src/Router'
import Store from './src/store/index'
import { Provider } from 'mobx-react';
import NavigationService from './src/config/NavigationService';


class App extends React.Component{
  render(){
    return(
      <Provider {...Store}>
      <View style={style.container}>
        <Router ref={navigatorRef =>{
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}/>
        <StatusBar style="dark"/>
      </View>
      </Provider>
    )
  }
}

const style=StyleSheet.create({
  container:{
    flex:1,
    marginTop:Constants.statusBarHeight,
    
  }
})

export default App
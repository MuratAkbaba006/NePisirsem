import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Text,Image,View} from 'react-native'
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import Loading from './Screens/Loading';
import Profile from './Screens/Profile';
import ChangePassword from './Screens/ChangePassword';
import ChangeEmail from './Screens/ChangeEmail';
import FavsMeal from './Screens/FavsMeal';
import PersonelInformation from './Screens/PersonelInformation';
const AuthenticateStack=createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            headerShown:false,
            
        },

    },
    Register:{
        screen:Register,
        navigationOptions:{
            headerShown:false
        }
    }
})

const AppStack=createStackNavigator({
    Home:{
        screen:Home,
     
    },
    Profile:{
        screen:Profile,
        navigationOptions:{
            headerTransparent:true
        }
    },
    ChangePassword:{
        screen:ChangePassword,
        navigationOptions:{
            headerTransparent:true,
            headerTitle:''
        },
        
    },
    ChangeEmail:{
        screen:ChangeEmail,
        navigationOptions:{
            headerTransparent:true,
            headerTitle:''
        }
    },
    FavsMeal:{
        screen:FavsMeal,
        navigationOptions:{
            headerTransparent:true,
            headerTitle:''
        }
    },
    PersonelInformation:{
        screen:PersonelInformation,
        navigationOptions:{
            headerTransparent:true,
            headerTitle:''
        }
    },
    
})


const SwitchNavigator=createSwitchNavigator({
    Loading,
    App:AppStack,
    Auth:AuthenticateStack
},{initialRouteName:'Loading'})


export default createAppContainer(SwitchNavigator);
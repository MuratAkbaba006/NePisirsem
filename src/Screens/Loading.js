import { inject } from 'mobx-react'
import React, { Component } from 'react'
import {View,Text,SafeAreaView} from 'react-native'

@inject('AuthenticateStore')
class Loading extends Component {

    componentDidMount(){
        this.props.AuthenticateStore.getToken()
    }

    render() {
        return (
            <SafeAreaView>
                <Text>kasmklda</Text>
            </SafeAreaView>
        )
    }
}

export default Loading

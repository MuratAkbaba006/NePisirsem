import React from 'react'
import {View,StyleSheet} from 'react-native'
import {BarIndicator} from 'react-native-indicators'


const Loading=()=>(
    <View style={styles.loading_container}>
      <BarIndicator animationDuration={2000} color={'black'}/>
    </View>
  )

const styles=StyleSheet.create({
    loading_container:{
        
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        
      },
})

  
export default Loading  
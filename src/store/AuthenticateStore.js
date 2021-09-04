import AsyncStorage from "@react-native-async-storage/async-storage";
import { observable,action,makeAutoObservable } from "mobx";
import NavigationService from '../config/NavigationService'
class AuthenticateStore{
    token=null;
    constructor(){
        makeAutoObservable(this,{
            token:observable,
            saveToken:action,
            getToken:action,
            removeToken:action
        })
    }

    async saveToken(token){
        try{
            await AsyncStorage.setItem('token',token)
            this.token=token
            this.redirectControl()
        }
        catch(err){
            console.log(err);
        }
    }

    redirectControl=()=>{
        if(!this.token){
            NavigationService.navigate('Auth');
            return false
            //giriş işlemi başarılı değilse
        }

            NavigationService.navigate('App');


    }
    async getToken(){
        try {
            const token=await AsyncStorage.getItem('token');
            this.token=token 
            this.redirectControl();
            
        } catch (error) {
            console.log(error);
        }
    }

    async removeToken(){
        try {
            await AsyncStorage.removeItem('token');
            this.token=null;
            this.redirectControl();
        } catch (error) {
            console.log(e);
        }
    }
}

export default new AuthenticateStore();
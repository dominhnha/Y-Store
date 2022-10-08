import{
    AUTH__LOGIN,
    AUTH__LOGOUT
} from './type'

export const AuthReducer = (state, action) =>{
    const {type,payload} = action;
     
    switch(type){
        case AUTH__LOGIN:{
            console.log("login");
            return state = payload.user;
        }
        case AUTH__LOGOUT:{
            console.log("out");
            return state = "noLogin";
        }
        default:
            return state;
    }
}
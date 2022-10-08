import {
         createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         signOut 
        } from "firebase/auth";
import { 
         set,
         ref, 
         onValue, 
         remove, 
         update, 
         getDatabase,
         child,
         push,
         get
        } from "firebase/database";
import { object } from "yup";


const auth = getAuth();
const database = getDatabase();
//-------------------- Authencation--------------------
export const AppsignInWithEmailAndPasswor = async(email,password)=>{
    console.log('Password',email);
    return new Promise(async(Resolve, Reject)=>{
        await signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            Resolve(userCredential.user)
        })
        .catch((error)=>{
            Reject(error);
        })
    })
}

export const AppcreateUserWithEmailAndPassword =  async(email,password)=>{
    return new Promise(async(Resolve, Reject)=>{
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            Resolve(userCredential.user)
        })
        .catch((error)=>{
            
            Reject(error);
        })
    })
}

export const AppsignOut = async()=>{
    return new Promise(async(Resolve, Reject)=>{
        await signOut(auth)
        .then((userCredential)=>{
            Resolve(true)
        })
        .catch((error)=>{
            
            Reject(undefined);
        })
    })
}
// -----------------RealTimeData----------------------
export const  AppWriteUserToDatabase = (async(uid,email="")=>{
    const initUser = {
        profile:{
            username: "Hi You",
            email: email,
            profile_picture :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg",
            address: "",
            numberPhone: "",
        },
        product:{
            cart:"",
            paid:"",
        },  
    }
    return new Promise(async(Resolve, Reject)=>{
        try{
            set(ref(database, 'users/' + uid),initUser);
            Resolve(initUser)
        }catch(error) {
            Reject(false)
        }
    })
})

export const  AppGetUserToDatabase = (async(uid)=>{
        try{
            const getUser = async(cb) => {
                const starCountRef = ref(await database, 'users/' + uid);
                const dataUser = await onValue(starCountRef, async(snapshot) => {
                    const data = await snapshot.val();  // cái cần return ra 
                    console.log("data",data);
                    cb(data)
                })
            }
            return new Promise((Resolve, Reject)=>{
                getUser( (user) => {
                    Resolve(user)
                })
            }) 
        }catch(error) {
            return error;
        }
    // })
})



export const  AppUpdataUserToDatabase = (async(uid,username, email, address,numberPhone,img)=>{
    const postData = {
        username: username,
        email: email,
        profile_picture : img ? img :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg",
        address: address,
        numberPhone:numberPhone,
    };
     // Get a key for a new Post.
  
    return new Promise(async(Resolve, Reject)=>{
        try{
            //const newPostKey = push(child(ref(database), 'users')).key;
             // Write the new post's data simultaneously in the posts list and the user's post list.
            const updates = {};
            updates['/users/' + uid + '/profile/'] = postData;
            await update(ref(database), updates);
            Resolve(postData);
        }catch(error) {
            Reject(false)
        }
    })
})
// add one Product 
export const AppAddUserProductDatabase = (uid ,product)=>{
    try{
        const addProduct = async(cb) => {
            // Get a key for a new Post.
            const newPostKey = push(child(ref(database), 'cart')).key;
            const updates = {};
            updates['users/' + uid + '/product' + '/cart/' + newPostKey] = product;
            await update(ref(database), updates);
            cb(product);
        }
        return new Promise((Resolve, Reject)=>{
            addProduct( (user) => {
                Resolve(user)
            })
        })
    }catch(error) {
        return error;
    } 
}
// delete one Product 
export const AppDeleteUserProductDatabase = (uid,Pid)=>{
    return new Promise( async(Resolve, Reject)=>{
        try{
            await remove(ref(database,'users/' + uid + '/product' + '/cart/' + Pid))
            Resolve(true)
        }catch(error) {
            Reject(error)
        }
    })
}
//updata cart user
export const AppUpdataUserProductDatabase = (uid ,pid,product)=>{
    try{
        const UpdataProduct = async(cb) => {
            // Get a key for a new Post.
            //const newPostKey = push(child(ref(database), 'cart')).key;
            const updates = {};
            updates['users/' + uid + '/product' + '/cart/' + pid + '/'] = product;
            await update(ref(database), updates);
            cb(product);
        }
        return new Promise((Resolve, Reject)=>{
            UpdataProduct( (user) => {
                Resolve(user)
            })
        })
    }catch(error) {
        return error;
    } 
}






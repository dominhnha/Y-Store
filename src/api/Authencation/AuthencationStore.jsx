import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { v4 } from "uuid";
  import { storage } from "../../Firebase__config";

  export const  AppUploadAvatarToDatabase = (async(Avatar)=>{
    return new Promise(async(Resolve, Reject)=>{
        try{
            if (Avatar == null) Reject(false);
            
            const imageRef = ref(storage, `images/${Avatar.name + v4()}`);
            console.log('Uploading avatar',imageRef)
            uploadBytes(imageRef, Avatar).then((snapshot) => {
                 getDownloadURL(snapshot.ref).then((url) => {
                    Resolve(url);
                });
            });
        }catch(error) {
            console.log("falseUpload");
            console.log(error);
            Reject(false);
        }
    })
})




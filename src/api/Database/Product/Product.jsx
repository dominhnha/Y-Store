import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
   getDoc,getFirestore, query, limit
    
} from "firebase/firestore";
import { ref } from "firebase/storage";
import {storage} from "../../../Firebase__config"
const db =  getFirestore();
  const usersCollectionRef = collection(db, "Products");
export const  AppcreateProduct = (async(title,quantity, price,color,Img1,Img2,desc,Type,size)=>{
    
    return new Promise(async(Resolve, Reject)=>{
        try{
            const initProduct = {
                title:title,
                quantity:quantity,
                price:price,
                color:color,
                Img1:Img1,
                Img2:Img2,
                desc:desc,
                Type:Type,
                size:size,
            }
            await addDoc(usersCollectionRef, initProduct);
            Resolve(initProduct);
            
        }catch(error) {
            Reject(false)
        }
    })
})
// export const AppGetProductAll = async()=>{
    
//     try {
//         const usersCollectionRef =await collection(db, "Products");
//         const doc = await getDoc(usersCollectionRef);
      
//         // Document was found in the cache. If no cached document exists,
//         // an error will be returned to the 'catch' block below.
//         console.log("Cached document data:", doc.data());
//       } catch (e) {
//         console.log("Error getting cached document:", e);
//       }
// }
export const AppGetAllProduct = async()=>{
    return new Promise(async(Resolve, Reject)=>{
        try{
            const querySnapshot = await getDocs(collection(db, "Products"));
            const ProductCand = []
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                ProductCand.push(doc.data());
            });
            Resolve(ProductCand)
            
        }catch(error) {
            Reject(error)
        }
    })
}

export const AppGetLimitProduct = (number)=>{
    const ProductCand = []
    return new Promise(async(Resolve, Reject)=>{
        try{
            
            //const querySnapshot = await getDocs(collection(db, "Products"));
            const q = query(usersCollectionRef,  limit(number));
            const querySnapshot = await getDocs(q);
           
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                let Product = doc.data();
                ProductCand.push({
                    id:doc.id,
                    Product: Product,
                });
            });
            Resolve(ProductCand)
            
        }catch(error) {
            Reject(error)
        }
    })
}


export const AppGetProductById = (uid)=>{
    return new Promise(async(Resolve, Reject)=>{
        try{
             //const querySnapshot = await getDocs(collection(db, "Products"));
             //const querySnapshot = await getDocs(collection(db, "Products"));
             const docRef = doc(db, "Products", `${uid}`);
             const docSnap = await getDoc(docRef);

            Resolve(docSnap.data())
            
        }catch(error) {
            Reject(error)
        }
    })
}
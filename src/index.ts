
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

const app = initializeApp({
    credential: applicationDefault(),
})

export const setApp = (projectId: string) => {
    initializeApp({
        credential: applicationDefault(),
        projectId,
    })
}

/********  Firestore  **********/
let firestore = getFirestore()

export const db = firestore

export const setDb = (firestoreId: string) => {
    firestore = getFirestore(firestoreId)
}
export const setFirestore = setDb


export const getDoc = async (collection: string, doc: string) => {
    const docRef = db.collection(collection).doc(doc)
    const docSnap = await docRef.get()
    return docSnap.data()
}

export const getCollection = async (collection: string) => {
    const collectionRef = db.collection(collection)
    const collectionSnap = await collectionRef.get()
    return collectionSnap.docs.map( doc => doc.data())
}

export const getRef = (collection: string, doc?: string) => {
    return doc ? db.collection(collection).doc(doc) : db.collection(collection)
}

export const getDocRef = (collection: string, doc: string) => {
    return db.collection(collection).doc(doc)
}

export const getCollectionRef = (collection: string) => {
    return db.collection(collection)
}

export const setDoc = async (collection: string, doc: string, data: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.set(data)
}

export const addCollection = async (collection: string, data: any) => {
    const collectionRef = db.collection(collection)
    return await collectionRef.add(data)
}

export const updateDoc = async (collection: string, doc: string, data: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update(data)
}

//!A.I. Generated Code

export const deleteDoc = async (collection: string, doc: string) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.delete()
}

export const deleteField = async (collection: string, doc: string, field: string) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: null })
}

export const deleteCollection = async (collection: string) => {
    const collectionRef = db.collection(collection)
    const collectionSnap = await collectionRef.get()
    collectionSnap.docs.forEach( async doc => await doc.ref.delete())
}

export const deleteFieldCollection = async (collection: string, field: string) => {
    const collectionRef = db.collection(collection)
    const collectionSnap = await collectionRef.get()
    collectionSnap.docs.forEach( async doc => await doc.ref.update({ [field]: null }))
}

export const incrementField = async (collection: string, doc: string, field: string, value: number) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.increment(value) })
}

export const decrementField = async (collection: string, doc: string, field: string, value: number) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.increment(-value) })
}

export const arrayUnionField = async (collection: string, doc: string, field: string, value: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.arrayUnion(value) })
}

export const arrayRemoveField = async (collection: string, doc: string, field: string, value: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.arrayRemove(value) })
}

export const getTimestamp = () => {
    return FieldValue.serverTimestamp()
}

export const setCollectionListener = (collection: string, callback: (data: any) => void) => {
    const collectionRef = db.collection(collection)
    collectionRef.onSnapshot( snapshot => {
        snapshot.docChanges().forEach( change => {
            const data = change.doc.data()
            callback(data)
        })
    })
}

export const setDocListener = (collection: string, doc: string, callback: (data: any) => void) => {
    const docRef = db.collection(collection).doc(doc)
    return docRef.onSnapshot( snapshot => {
        const data = snapshot.data()
        callback(data)
    })
}

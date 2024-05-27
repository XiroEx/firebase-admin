/********  Firestore  **********/

import { apps } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

if (!apps.length) {
    initializeApp()
}

/**
 * The Firestore database instance.
 */
export let db = getFirestore()  

/**
 * Sets the Firestore database instance to the specified Firestore db.
 * @param firestoreId The ID of the Firestore db.
 */
export const setDb = (firestoreId: string) => db = getFirestore(firestoreId)
export const setFirestore = setDb

/**
 * Gets the Firestore database instance for the specified Firestore db.
 * @param firestoreId The ID of the Firestore db.
 * @returns The Firestore database instance.
 */
export const getDb = (firestoreId: string) => getFirestore(firestoreId)

/**Retrieves a document or collection.
 * @param collection The name of the collection or direct document path.
 * @param doc (Optional) The ID of the document.
 * @returns A Promise that resolves to the document data or an array of document data.
 */
export const get = async (collection: string, doc?: string) => {
    if (doc) {
        const docRef = db.collection(collection).doc(doc)
        const docSnap = await docRef.get()
        return docSnap.data()    
    }
    if (docString(collection)) {
        const docRef = db.doc(collection)
        const docSnap = await docRef.get()
        return docSnap.data()
    } else {
        const docRef = db.collection(collection)
        const docSnap = await docRef.get()
        return docSnap.docs.map( doc => doc.data())
    
    }
}

/**
 * Retrieves a document from a collection.
 * @param collection The name of the collection or direct document path.
 * @param doc The ID of the document.
 * @returns A Promise that resolves to the document data.
 */
export const getDoc = async (collection: string, doc?: string) => {
    if (!doc) {
        const docRef = db.doc(collection)
        const docSnap = await docRef.get()
        return docSnap.data()    
    } else {
        if (docString(collection)) {
            const docRef = db.doc(collection)
            const docSnap = await docRef.get()
            return docSnap.data()
        } else {
            throw new Error('Invalid document path')
        }
    }
}

/**
 * Retrieves all documents from a collection.
 * @param collection The name of the collection.
 * @returns A Promise that resolves to an array of document data.
 */
export const getCollection = async (collection: string) => {
    if (!docString(collection)) {
        const collectionRef = db.collection(collection)
        const collectionSnap = await collectionRef.get()
        return collectionSnap.docs.map( doc => doc.data())
    } else {
        throw new Error('Invalid collection path')
    }
}

/**
 * Retrienves all document Ids from a collection.
 * @param collection The name of the collection.
 * @returns A Promise that resolves to an array of document IDs.
 */
export const getCollectionIds = async (collection: string) => {
    if (!docString(collection)) {
        const collectionRef = db.collection(collection)
        const collectionSnap = await collectionRef.get()
        return collectionSnap.docs.map( doc => doc.id)
    } else {
        throw new Error('Invalid collection path')
    }
}

/**
 * Retrieves a reference to a collection or document.
 * @param collection The name of the collection.
 * @param doc (Optional) The ID of the document.
 * @returns A reference to the collection or document.
 */
export const getRef = (collection: string, doc?: string) => {
    if (doc) return db.collection(collection).doc(doc)
    if (docString(collection)) return db.doc(collection)
    else return db.collection(collection)
}

/**
 * Retrieves a reference to a document.
 * @param collection The name of the collection.
 * @param doc {optional} The ID of the document.
 * @returns A reference to the document.
 */
export const getDocRef = (collection: string, doc?: string) => {
    if (doc) return db.collection(collection).doc(doc)
    if (docString(collection)) return db.doc(collection)
    else throw new Error('Invalid document path')
}

/**
 * Retrieves a reference to a collection.
 * @param collection The name of the collection.
 * @returns A reference to the collection.
 */
export const getCollectionRef = (collection: string) => {
    if (!docString(collection)) return db.collection(collection)
    else throw new Error('Invalid collection path')
}

/**
 * Sets the data of a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param data The data to set.
 * @returns A Promise that resolves when the operation is complete.
 */
export const setDoc = async (collection: string, doc: any, data?: any) => {
    if (data) {
        const docRef = db.collection(collection).doc(doc)
        return await docRef.set(data)
    } else {
        if (docString(collection)) {
            const docRef = db.doc(collection)
            return await docRef.set(doc)
        } else {
            throw new Error('Invalid document path')
        }
    }
}

/**
 * Adds a new document to a collection.
 * @param collection The name of the collection.
 * @param data The data to add.
 * @returns A Promise that resolves with the ID of the newly added document.
 */
export const addCollection = async (collection: string, data: any) => {
    if (!docString(collection)) {
        const collectionRef = db.collection(collection)
        const docRef = await collectionRef.add(data)
        return docRef.id
    } else {
        throw new Error('Invalid collection path')
    }
}

/**
 * Updates the data of a document.
 * @param collection The name of the collection.
 * @param doc {optional} The ID of the document.
 * @param data The data to update.
 * @returns A Promise that resolves when the operation is complete.
 */
export const updateDoc = async (collection: string, doc: any, data?: any) => {
    if (data) {
        const docRef = db.collection(collection).doc(doc)
        return await docRef.update(data)
    } else {
        if (docString(collection)) {
            const docRef = db.doc(collection)
            return await docRef.update(doc)
        } else {
            throw new Error('Invalid document path')
        }
    }
}

/**
 * Deletes a doument or collection
 * @param collection The name of the collection or direct document path.
 * @param doc {optional} The ID of the document.
 * @returns A Promise that resolves when the operation is complete.
 */
export const del = async (collection: string, doc?: string) => {
    if (doc) {
        const docRef = db.collection(collection).doc(doc)
        return await docRef.delete()
    }
    const refs = collection.split('/')
    if (docString(collection)) {
        const docRef = db.doc(collection)
        return await docRef.delete()
    } else {
        const collectionRef = db.collection(collection)
        const collectionSnap = await collectionRef.get()
        collectionSnap.docs.forEach( async doc => await doc.ref.delete())
    }
}

/**
 * Deletes a document from a collection.
 * @param collection The name of the collection or direct document path.
 * @param doc {optional} The ID of the document.
 * @returns A Promise that resolves when the operation is complete.
 */
export const deleteDoc = async (collection: string, doc?: string) => {
    if (doc) {
        const docRef = db.collection(collection).doc(doc)
        return await docRef.delete()
    } else { 
        if (docString(collection)) {
            const docRef = db.doc(collection)
            return await docRef.delete()
        } else { 
            throw new Error('Invalid document path')
        }
    }
}
/**
 * Deletes all documents from a collection.
 * @param collection The name of the collection.
 * @returns A Promise that resolves when the operation is complete.
 */
export const deleteCollection = async (collection: string) => {
    if (!docString(collection)) {
        const collectionRef = db.collection(collection)
        const collectionSnap = await collectionRef.get()
        collectionSnap.docs.forEach( async doc => await doc.ref.delete())
    } else {
        throw new Error('Invalid collection path')
    }
}

/**
 * Sets a listener for changes to a collection.
 * @param collection The name of the collection.
 * @param callback The callback function to be called when a change occurs.
 */
export const setCollectionListener = (collection: string, callback: (data: any) => void) => {
    if (!docString(collection)) {
        const collectionRef = db.collection(collection)
        return collectionRef.onSnapshot( snapshot => {
            const data = snapshot.docs.map( doc => doc.data())
            callback(data)
        })
    } else {
        throw new Error('Invalid collection path')
    }
}

/**
 * Sets a listener for changes to a document.
 * @param collection The name of the collection.
 * @param doc {optional} The ID of the document.
 * @param callback The callback function to be called when a change occurs.
 * @returns The unsubscribe function for the listener.
 */
export const setDocListener = (collection: string, doc: any, callback?: any) => {
    if (callback) {
        const docRef = db.collection(collection).doc(doc)
        return docRef.onSnapshot( snapshot => {
            callback(snapshot)
        })
    } else {
        if (docString(collection)) {
            const docRef = db.doc(collection)
            return docRef.onSnapshot( snapshot => {
                doc(snapshot)
            })
        } else {
            throw new Error('Invalid document path')
        }
    }
}


//!A.I. Generated Code

/**
 * Deletes a field from a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param field The name of the field to delete.
 * @returns A Promise that resolves when the operation is complete.
 */
export const deleteField = async (collection: string, doc: string, field: string) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: null })
}


/**
 * Deletes a field from all documents in a collection.
 * @param collection The name of the collection.
 * @param field The name of the field to delete.
 * @returns A Promise that resolves when the operation is complete.
 */
export const deleteFieldCollection = async (collection: string, field: string) => {
    const collectionRef = db.collection(collection)
    const collectionSnap = await collectionRef.get()
    collectionSnap.docs.forEach( async doc => await doc.ref.update({ [field]: null }))
}

/**
 * Increments the value of a numeric field in a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param field The name of the field to increment.
 * @param value The value to increment by.
 * @returns A Promise that resolves when the operation is complete.
 */
export const incrementField = async (collection: string, doc: string, field: string, value: number) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.increment(value) })
}

/**
 * Decrements the value of a numeric field in a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param field The name of the field to decrement.
 * @param value The value to decrement by.
 * @returns A Promise that resolves when the operation is complete.
 */
export const decrementField = async (collection: string, doc: string, field: string, value: number) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.increment(-value) })
}

/**
 * Adds an element to an array field in a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param field The name of the array field.
 * @param value The value to add to the array.
 * @returns A Promise that resolves when the operation is complete.
 */
export const arrayUnionField = async (collection: string, doc: string, field: string, value: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.arrayUnion(value) })
}

/**
 * Removes an element from an array field in a document.
 * @param collection The name of the collection.
 * @param doc The ID of the document.
 * @param field The name of the array field.
 * @param value The value to remove from the array.
 * @returns A Promise that resolves when the operation is complete.
 */
export const arrayRemoveField = async (collection: string, doc: string, field: string, value: any) => {
    const docRef = db.collection(collection).doc(doc)
    return await docRef.update({ [field]: FieldValue.arrayRemove(value) })
}

/**
 * Returns a server timestamp value.
 * @returns A server timestamp value.
 */
export const getTimestamp = () => {
    return FieldValue.serverTimestamp()
}


//! Helpers

function docString(str: string) {
    if (str[0] == '/') str = str.slice(1)
    if (str[str.length - 1] == '/') str = str.slice(0, -1)
    const refs = str.split('/')
    if (refs.length % 2 == 0) return true
    else return false
}


export default {
    db,
    firestore:db,
    setDb,
    setFirestore,
    getDb,
    getDoc,
    getCollection,
    getRef,
    getDocRef,
    getCollectionRef,
    setDoc,
    addCollection,
    updateDoc,
    deleteDoc,
    deleteField,
    deleteCollection,
    deleteFieldCollection,
    incrementField,
    decrementField,
    arrayUnionField,
    arrayRemoveField,
    getTimestamp,
    setCollectionListener,
    setDocListener
}
import { apps } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { CreateRequest, getAuth } from 'firebase-admin/auth'
import * as uuid from 'uuid'
import { deleteDoc, getDoc, setDoc } from './firestore'

if (!apps.length) {
    initializeApp()
}

/**
 * The Firestore authentication instance.
 */
export let auth = getAuth()

/**
 * Find a user by their email address.
 * @param email - The email address of the user.
 * @returns A Promise that resolves to the user object.
 */
export const findUser = async (email: string) => {
    const user = await auth.getUserByEmail(email)
    return user
}

/**
 * Get a user by their UID.
 * @param uid - The UID of the user.
 * @returns A Promise that resolves to the user object.
 */
export const getUser = async (uid: string) => {
    const user = await auth.getUser(uid)
    return user
}

/**
 * Create a new user.
 * @param data - The user data.
 * @returns A Promise that resolves to the created user object.
 */
export const createUser = async (data:CreateRequest) => {
    const user = await auth.createUser(data)
    return user
}

/**
 * Delete a user by their UID.
 * @param uid - The UID of the user to delete.
 */
export const deleteUser = async (uid: string) => {
    await auth.deleteUser(uid)
}

/**
 * Update a user's data.
 * @param uid - The UID of the user to update.
 * @param data - The updated data for the user.
 */
export const updateUser = async (uid: string, data: any) => {
    await auth.updateUser(uid, data)
}

/**
 * Login a user with their email or create a new account if it doesn't exist.
 * @param email - The email address of the user.
 * @param data - Additional data to associate with the session.
 * @returns A Promise that resolves to the user Id and SessionId.
 */
export const initEmailLogin = async (email: string, data?: any) => {
    const token = uuid.v4()
    let user = await findUser(email)
    let created = false
    if (!user) {
        user = await createUser({email})
        created = true
    }
    const session = {
        expires: Date.now() + (60000 * 20),
        uid: user.uid,
    }
    await setDoc(`sessions/${token}`, session)
    return {id: user.uid, token, created}
}

/**
 * Confirm a user's login.
 * @param token - The token to confirm.
 * @param uid - The UID of the user.
 * @param ip - The IP address of the user.
 * @returns A Promise that resolves to the custom auth token.
 */
export const confirmLogin = async (token: string, uid: string, ip?: string) => {
    const session = await getDoc(`sessions/${token}`)
    if (!session) {
        throw new Error('invalid token')
    }
    setDoc(`users/${session.uid}/sessions/${token}`, {
        expires: Date.now() + 60000 * 60 * 24 * 30, 
        ip
    })
    deleteDoc(`sessions/${token}`)
    return auth.createCustomToken(uid)
}

/**
 * Verify a Firebase ID token.
 * @param token - The ID token to verify.
 * @returns A Promise that resolves to the decoded token.
 */
export const verifyToken = async (token: string) => {
    const decodedToken = await auth.verifyIdToken(token)
    return decodedToken
}

//!A.I. Generated Code

/**
 * Set custom claims for a user.
 * @param uid - The UID of the user.
 * @param claims - The custom claims to set for the user.
 */
export const setCustomClaims = async (uid: string, claims: any) => {
    await auth.setCustomUserClaims(uid, claims)
}

/**
 * Create a custom Firebase ID token.
 * @param uid - The UID to associate with the custom token.
 * @param claims - The custom claims to include in the token.
 * @returns A Promise that resolves to the custom token.
 */
export const createCustomToken = async (uid: string, claims: any) => {
    const token = await auth.createCustomToken(uid, claims)
    return token
}

/**
 * Create a session cookie.
 * @param idToken - The Firebase ID token to create the session cookie from.
 * @param expiresIn - The expiration time for the session cookie in seconds.
 * @returns A Promise that resolves to the session cookie.
 */
export const createSessionCookie = async (idToken: string, expiresIn: number) => {
    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn})
    return sessionCookie
}

/**
 * Verify a session cookie.
 * @param sessionCookie - The session cookie to verify.
 * @param checkRevoked - Whether to check if the user's tokens have been revoked.
 * @returns A Promise that resolves to the decoded claims of the session cookie.
 */
export const verifySessionCookie = async (sessionCookie: string, checkRevoked = false) => {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, checkRevoked)
    return decodedClaims
}

/**
 * Revoke all refresh tokens for a user.
 * @param uid - The UID of the user.
 */
export const revokeRefreshTokens = async (uid: string) => {
    await auth.revokeRefreshTokens(uid)
}

/**
 * List users.
 * @param maxResults - The maximum number of users to return.
 * @param pageToken - The page token for pagination.
 * @returns A Promise that resolves to the list of users.
 */
export const listUsers = async (maxResults?: number, pageToken?: string) => {
    const listUsersResult = await auth.listUsers(maxResults, pageToken)
    return listUsersResult
}


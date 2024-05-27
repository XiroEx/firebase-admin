
import { apps } from 'firebase-admin'
import { getApp, initializeApp } from 'firebase-admin/app'
import * as auth from './lib/authentication'
import * as firestore from './lib/firestore'
import * as user from './lib/user'

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set')
}

export const app = apps.length ? getApp() : initializeApp()

export {
    auth, firestore, user
}


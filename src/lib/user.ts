import { apps } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { findUser } from './authentication';
import { getDoc } from './firestore';

/**
 * Initializes the Firebase app if it hasn't been initialized already.
 */
if (!apps.length) {
    initializeApp();
}

/**
 * Retrieves user data based on the provided email or UID.
 * @param emailOrUid - The email or UID of the user.
 * @returns A Promise that resolves to the user data.
 */
export const userData = async (emailOrUid: string) => {
    const type = isEmailorUid(emailOrUid);
    const userId = type === 'email' ? (await findUser(emailOrUid)).uid : emailOrUid;
    return await getDoc('users', userId);
}

/**
 * Determines whether the provided string is an email or UID.
 * @param emailOrUid - The string to check.
 * @returns 'email' if the string is an email, 'uid' if it's a UID.
 */
function isEmailorUid(emailOrUid: string) {
    //validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(emailOrUid);
    
    //validate UID format using regex
    const uidRegex = /^[0-9a-zA-Z]{28}$/;
    const isUid = uidRegex.test(emailOrUid);

    if (isEmail) {
        return 'email';
    } else if (isUid) {
        return 'uid';
    } else {
        throw new Error('Invalid email or UID');
    }
}
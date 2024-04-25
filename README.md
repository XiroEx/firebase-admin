## @xiroex/firebase-admin: A Simplified Firebase Admin SDK Wrapper

This package provides a simplified wrapper for the Firebase Admin SDK, making it easier to interact with your Firebase project's Firestore database.

### Installation

```bash
npm install @xiroex/firebase-admin
```

**Note:** Before using this package, you must:

1. **Download your Firebase service account key file** from the Firebase console and save it locally.

2. **Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable** to point to the path of your downloaded key file. Instructions on how to do this can be found in the Firebase documentation [https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments).

### Usage

**Import the necessary functions:**

```typescript
import { getDoc, getCollection, setDoc, // ... other functions  } from '@xiroex/firebase-admin'
```

**Get a document:**

```typescript
const docData = await getDoc('users', 'user123')
console.log(docData)
```

**Get a collection:**

```typescript
const allUserData = await getCollection('users')
console.log(allUserData)
```

**Set a document:**

```typescript
const newUserData = { name: 'John Doe', age: 30 }
await setDoc('users', 'user123', newUserData)
```

**Additional Functionality:**

This package offers various functions for interacting with your Firestore database, including:

* `getRef`: Get a reference to a collection or document.
* `getDocRef`: Get a reference to a specific document.
* `getCollectionRef`: Get a reference to a collection.
* `addCollection`: Add a new document to a collection.
* `updateDoc`: Update an existing document.
* `deleteDoc`: Delete a document.
* `deleteField`: Delete a specific field from a document.
* `deleteCollection`: Delete an entire collection.
* `deleteFieldCollection`: Delete a specific field from all documents in a collection.
* `incrementField`: Increment the value of a numeric field.
* `decrementField`: Decrement the value of a numeric field.
* `arrayUnionField`: Add an element to an array field.
* `arrayRemoveField`: Remove an element from an array field.
* `getTimestamp`: Get a Firebase server timestamp.
* `setCollectionListener`: Set a listener to monitor changes in a collection.
* `setDocListener`: Set a listener to monitor changes in a specific document.

**Refer to the provided TypeScript interface for a complete list of functions and their parameters.**

### License

This package is licensed under the GPL-3.0-only license. [https://en.wikipedia.org/wiki/GNU_General_Public_License](https://en.wikipedia.org/wiki/GNU_General_Public_License)

### Contributing

We welcome contributions to this project. Please see the contributing guidelines in the CONTRIBUTING.md file for more details.

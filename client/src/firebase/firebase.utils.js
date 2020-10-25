import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCFp-iVXGV7a7fjxt9nh5J25u7RjHocFwU',
	authDomain: 'crwn-clothing-db-1be18.firebaseapp.com',
	databaseURL: 'https://crwn-clothing-db-1be18.firebaseio.com',
	projectId: 'crwn-clothing-db-1be18',
	storageBucket: 'crwn-clothing-db-1be18.appspot.com',
	messagingSenderId: '1089650259093',
	appId: '1:1089650259093:web:92b60512bd84ffa815d79c',
	measurementId: 'G-NMFSN2Q5VP'
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) {
		return;
	}

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('Error creating user', error);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const batch = firestore.batch();
	const collectionsRef = firestore.collection(collectionKey);

	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionsRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			title,
			items,
			id: doc.id,
			routeName: encodeURI(title.toLowerCase())
		};
	});

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const singInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

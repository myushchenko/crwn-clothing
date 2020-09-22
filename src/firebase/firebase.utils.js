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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

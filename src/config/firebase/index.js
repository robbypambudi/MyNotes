// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCPna_L52mNHQzZ6RNqy4oJSj0kUeDKg94",
	authDomain: "mynotes-robbypambudi.firebaseapp.com",
	projectId: "mynotes-robbypambudi",
	storageBucket: "mynotes-robbypambudi.appspot.com",
	messagingSenderId: "745214285065",
	appId: "1:745214285065:web:66dff135f0ac269b60efd8",
	measurementId: "G-8WQW3WLS6C",
	databaseURL:
		"https://mynotes-robbypambudi-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(app);

// export const db = getFirestore(app);

export default app;

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "XXXX"
	authDomain: "XXXX",
	projectId: "XXXX",
	storageBucket: "mynotes-robbypambudi.appspot.com",
	messagingSenderId: "XXXXX",
	appId: "XXXX",
	measurementId: "XXXXX",
	databaseURL:
		"XXXXX",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(app);

// export const db = getFirestore(app);

export default app;

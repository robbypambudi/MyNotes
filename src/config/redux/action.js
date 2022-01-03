import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { push, ref, onValue, set, remove } from "firebase/database";

// import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";

export const registerUserApi = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: "isLoading", value: true });
		const auth = getAuth();
		return createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				// const user = userCredential.user;
				dispatch({ type: "isLoading", value: false });
				// console.log(user);
				resolve(true);
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// console.log(errorCode, errorMessage);
				dispatch({ type: "isLoading", value: false });
				reject(false);
			});
	});
};

export const loginUserApi = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: "isLoading", value: true });
		const auth = getAuth();

		return signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				const dataUser = {
					_Token: user.accessToken,
					_Id: user.reloadUserInfo.localId,
					email: user.email,
					emailVerified: user.emailVerified,
				};
				dispatch({ type: "isLoading", value: false });
				dispatch({ type: "isLogin", value: true });
				dispatch({ type: "C_User", value: dataUser });

				// console.log(user);
				// console.log(dataUser);

				resolve(dataUser);
			})
			.catch((error) => {
				const errorCode = error.code;
				// const errorMessage = error.message;
				// console.log(errorMessage);
				console.log(errorCode);
				dispatch({ type: "isLoading", value: false });
				dispatch({ type: "isLogin", value: false });
				// console.log(errorCode, errorMessage);
				reject(false);
			});
	});
};

export const addDataToFirebase = (data) => (dispatch) => {
	push(ref(database, "notes/" + data.userId), {
		title: data.title,
		content: data.content,
		date: data.date,
	});
};

export const getDataFromFirebase = (userId) => (dispatch) => {
	const myNotes = ref(database, "notes/" + userId);
	return new Promise((resolve, reject) => {
		onValue(myNotes, (snapshot) => {
			const snap = snapshot.val();
			const data = [];
			Object.keys(snap).map((key) => {
				data.push({
					id: key,
					data: snap[key],
				});
			});
			// console.log("Keys : ", Keys);
			dispatch({ type: "_Notes", value: data });
			// console.log(data);
			resolve(snap);
		});
	});
};
export const updateDataFromFirebase = (data) => (dispatch) => {
	const myNotes = ref(database, `notes/${data.userId}/${data.noteId}`);

	// console.log(data);
	// console.log(`notes/${data.userId}/${data.noteId}`);

	return new Promise((resolve, reject) => {
		set(myNotes, {
			title: data.title,
			content: data.content,
			date: data.date,
		})
			.then(() => {
				// Data saved successfully!
				resolve(true);
			})
			.catch((error) => {
				// The write failed...
				reject(false);
			});
	});
};

export const deleteDataFromFirebase = (data) => (dispatch) => {
	const myNotes = ref(database, `notes/${data.userId}/${data.noteId}`);

	return new Promise((resolve, reject) => {
		remove(myNotes)
			.then((res) => {
				console.log("Berhasil");
			})
			.catch((error) => {
				console.log("Gagal");
			});
	});
};

// export const addUserDetailsToFirebase = (data) => (dispatch) => {
// 	try {
// 		const docRef = addDoc(collection(db, "users"), {
// 			first: "Alan",
// 			middle: "Mathison",
// 			last: "Turing",
// 			born: 1912,
// 		});

// 		console.log("Document written with ID: ", docRef.id);
// 	} catch (e) {
// 		console.error("Error adding document: ", e);
// 	}
// };

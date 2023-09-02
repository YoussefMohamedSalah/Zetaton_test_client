import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyCCJq6VYp4V3EC1uBp5eIVXV37xPNKfoCQ",
	authDomain: "fir-test-65bf4.firebaseapp.com",
	databaseURL: "https://fir-test-65bf4-default-rtdb.firebaseio.com",
	projectId: "fir-test-65bf4",
	storageBucket: "fir-test-65bf4.appspot.com",
	messagingSenderId: "763457777664",
	appId: "1:763457777664:web:31ed16bf0f6a30017368e5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInFirebase = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err: any) {
		console.error(err);
		alert(err.message);
	}
}

export const signUpFirebase = async (first_name: string, last_name: string, email: string, password: string) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		addDoc(collection(db, "users"), {
			uid: user.uid,
			first_name,
			last_name,
			email,
			authProvider: "local",
		});
		return user;
	} catch (err: any) {
		console.error(err);
		alert(err.message);
	}
};

export const logoutFireBase = () => {
	signOut(auth);
};
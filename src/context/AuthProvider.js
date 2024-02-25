import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const createUser = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(response.user);
    Alert.alert("Sign up", "please verify your email");
    navigation.navigate("Login");
    return response;
  };
  const signInUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user.emailVerified) {
      Alert.alert("Sign in", "sign in successfully!");
      setIsAuthenticated(true);
      setUser(result?.user);
    } else {
      Alert.alert("Sign in", "please verify your email");
    }
    return result;
  };
  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userCre) => {
      // console.log("observe:", userCre);
      if (userCre?.emailVerified) {
        setIsAuthenticated(true);
        setUser(userCre);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // store fireStore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      // Attach a listener to the user document
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setCurrentUser({ id: doc.id, ...doc.data() });
        } else {
          setCurrentUser(null); // Document doesn't exist, set user state to null
        }
      });

      return () => unsubscribe(); // Cleanup function
    }
  }, [user, isAuthenticated]);

  const authInfo = {
    user,
    createUser,
    signInUser,
    isAuthenticated,
    logOut,
    currentUser,
  };
  //loading, setLoading,
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

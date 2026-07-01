import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, increment, serverTimestamp, arrayUnion } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export async function initVisitor() {
  try {
    console.log("Initializing Firebase...");
    console.log("Signing in anonymously...");
    const userCredential = await signInAnonymously(auth);
    const uid = userCredential.user.uid;
    console.log(`Authenticated as: ${uid}`);
    console.log("Firestore connected.");

    const visitorRef = doc(db, 'visitors', uid);
    
    const snapshot = await getDoc(visitorRef);
    if (!snapshot.exists()) {
      await setDoc(visitorRef, {
        firstVisit: serverTimestamp(),
        lastVisit: serverTimestamp(),
        visitCount: 1,
        projectsViewed: [],
        lastRoomViewed: null,
        suggestedQuestionsClicked: 0
      });
    } else {
      await setDoc(visitorRef, {
        lastVisit: serverTimestamp(),
        visitCount: increment(1)
      }, { merge: true });
    }
    return uid;
  } catch (error: any) {
    if (error?.code === 'auth/admin-restricted-operation') {
      console.warn("Anonymous Authentication is disabled in the Firebase Console. Visitor memory is temporarily offline.");
    } else {
      console.error("Firebase auth/firestore error:", error);
    }
    return null;
  }
}

export async function trackProjectView(projectTitle: string) {
  if (!auth.currentUser) return;
  try {
    const visitorRef = doc(db, 'visitors', auth.currentUser.uid);
    await setDoc(visitorRef, {
      lastRoomViewed: projectTitle,
      projectsViewed: arrayUnion(projectTitle)
    }, { merge: true });
  } catch (error) {
    console.error("Firebase tracking error:", error);
  }
}

export async function trackQuestionClick() {
  if (!auth.currentUser) return;
  try {
    const visitorRef = doc(db, 'visitors', auth.currentUser.uid);
    await setDoc(visitorRef, {
      suggestedQuestionsClicked: increment(1)
    }, { merge: true });
  } catch (error) {
    console.error("Firebase tracking error:", error);
  }
}

export async function getVisitorMemory() {
  if (!auth.currentUser) return null;
  try {
    const visitorRef = doc(db, 'visitors', auth.currentUser.uid);
    const snapshot = await getDoc(visitorRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
  } catch (error) {
    console.error("Firebase memory error:", error);
  }
  return null;
}


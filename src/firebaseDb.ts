import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
  DocumentData,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
export const db = getFirestore(app);

// helpers

// add data
export const firestoreAddData = async (user: User): Promise<void> => {
  const collectionRef = collection(db, "users");
  await setDoc(doc(collectionRef, user.userId), user);
};

// get data
export const firestoreGetData = async (
  id: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, "users", id);
  return getDoc(docRef);
};

// update array
export const firestoreAddFriend = async (id: string, idToAdd: string) => {
  const collectionRef1 = doc(db, "users", id);
  const collectionRef2 = doc(db, "users", idToAdd);
  try {
    await updateDoc(collectionRef1, {
      friends: arrayUnion(idToAdd),
    });

    await updateDoc(collectionRef2, {
      friends: arrayUnion(id),
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

// search and get friend
export const firestoreSearchFriend = async (
  email: string
): Promise<SearchType> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const foundUser: SearchType = {
    userId: "",
    found: false,
  };
  querySnapshot.forEach((doc) => {
    if (email === doc.data().email) {
      foundUser.userId = doc.data().userId;
      foundUser.found = true;
    }
  });
  return foundUser;
};

// check friend
export const firestoreCheckFriend = async (userId: string, idToAdd: string) => {
  const docRef = doc(db, "users", userId);
  const res = await getDoc(docRef);
  let flag = 0;
  if (res.exists()) {
    const friends = res.data().friends;
    friends.forEach((id: string) => {
      if (idToAdd === id) {
        flag = 1;
      }
    });
  }

  if (flag) return true;
  else false;
};

// get all friends
export const firestoreGetAllFriends = async (userId: string) => {
  const response = await getDoc(doc(db, "users", userId));
  let friendIdList: string[] = [];

  if (response.exists()) {
    friendIdList = response.data().friends;
  }

  let friendObjList: FriendType[] = [];

  const promiseList = friendIdList.map(async (friendId) => {
    const friendDoc = await getDoc(doc(db, "users", friendId));
    return friendDoc;
  });

  const friendList = await Promise.all(promiseList);

  friendList.forEach((friend) => {
    if (friend.exists()) {
      friendObjList.push({
        friendName: friend.data().name,
        friendId: friend.id,
      });
    }
  });

  return friendObjList;
};

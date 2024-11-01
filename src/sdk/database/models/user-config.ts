import { firestore } from "@/sdk/firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type FirestoreDataConverter,
} from "@firebase/firestore";

const PATH = "user-config";

export interface UserConfig {
  id?: string;
  userId: string;
  timezone: string;
}

export const userConfigConverter: FirestoreDataConverter<UserConfig> = {
  toFirestore: (userConfig: UserConfig) => {
    return {
      ...userConfig,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      userId: data.userId,
      timezone: data.timezone,
    };
  },
};

const dbUserConfig = (internalFirestore = firestore) => {
  return {
    getDocRef: (id: string) =>
      doc(collection(internalFirestore, PATH), id).withConverter<UserConfig>(
        userConfigConverter
      ),
    getCollectionRef: () =>
      collection(internalFirestore, PATH).withConverter<UserConfig>(
        userConfigConverter
      ),
    searchByUserIdRef: (userId: string) => {
      return query(
        collection(internalFirestore, PATH).withConverter<UserConfig>(
          userConfigConverter
        ),
        where("userId", "==", userId)
      );
    },
    createDefaultIfNeeded: async (userId: string) => {
      const usersConfig = await getDocs(
        dbUserConfig(internalFirestore).searchByUserIdRef(userId)
      );

      if (!usersConfig.empty) {
        return usersConfig.docs[0].data();
      }

      const collectionRef = collection(internalFirestore, PATH);

      const snapshot = await addDoc(collectionRef, {
        userId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      const data = (
        await getDoc(dbUserConfig(internalFirestore).getDocRef(snapshot.id))
      ).data();

      if (!data) {
        throw new Error("Failed to create default user config");
      }

      return data;
    },
  };
};

export { dbUserConfig };

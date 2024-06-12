import { query } from "firebase/database";
import { collection, onSnapshot, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

function useCollection(currentCollection, userParams) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let q;

    if (userParams && userParams.length > 2) { // Check if userParams is valid
      q = query(collection(db, currentCollection), where(...userParams));
    } else {
      q = query(collection(db, currentCollection));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      setData(tasks);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentCollection, userParams]);

  return { data };
}


export { useCollection };

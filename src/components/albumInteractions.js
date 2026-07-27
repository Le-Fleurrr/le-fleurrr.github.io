// Firestore persistence for album reviews and questions.
// Documents live at albums/{albumId}/interactions/{autoId}.
// Callers fall back to session-local state when Firestore is unreachable
// (e.g. offline or restrictive security rules).

import {
  collection, addDoc, getDocs, doc, updateDoc, arrayUnion, query, orderBy
} from 'firebase/firestore';
import { db } from '../Firebase/Firebase.js';

export async function loadInteractions(albumId) {
  const q = query(
    collection(db, 'albums', String(albumId), 'interactions'),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...d.data(), id: d.id }));
}

export async function addInteraction(albumId, data) {
  const ref = await addDoc(
    collection(db, 'albums', String(albumId), 'interactions'),
    data
  );
  return ref.id;
}

export async function addReplyToInteraction(albumId, interactionId, reply) {
  await updateDoc(
    doc(db, 'albums', String(albumId), 'interactions', String(interactionId)),
    { replies: arrayUnion(reply) }
  );
}

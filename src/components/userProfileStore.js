// Per-user profile persistence: username, name, addresses, saved cards, orders.
// localStorage is the always-available source; Firestore (users/{uid}.profile)
// syncs in the background when reachable — same resilience pattern as
// favorites and reviews. Full card numbers and CVVs are deliberately never
// part of the schema.

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase.js';

const localKey = (uid) => `user_profile_${uid}`;

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('firestore-timeout')), ms)),
  ]);

export function defaultProfile(user) {
  return {
    username: '',
    name: user?.displayName || '',
    email: user?.email || '',
    addresses: [],
    cards: [],
    orders: [],
  };
}

export function loadLocalProfile(uid) {
  try {
    const raw = localStorage.getItem(localKey(uid));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Best-effort remote read; resolves null when Firestore is unreachable.
export async function fetchRemoteProfile(uid) {
  try {
    const snap = await withTimeout(getDoc(doc(db, 'users', uid)), 4000);
    return snap.exists() ? snap.data().profile || null : null;
  } catch {
    return null;
  }
}

// Records a "checkout started" order snapshot into the user's order history.
export function recordCheckoutOrder(user, cart, cartTotal) {
  if (!user || !cart?.lines?.edges?.length) return;
  const profile = loadLocalProfile(user.uid) || defaultProfile(user);
  const order = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    summary: cart.lines.edges
      .map(({ node }) => `${node.merchandise.product.title} ×${node.quantity}`)
      .join(', '),
    total: parseFloat(cartTotal).toFixed(2),
  };
  saveProfile(user.uid, { ...profile, orders: [order, ...(profile.orders || [])] });
}

// Local write is synchronous and authoritative; remote sync is fire-and-forget.
export function saveProfile(uid, profile) {
  try {
    localStorage.setItem(localKey(uid), JSON.stringify(profile));
  } catch { /* storage full — remote sync may still succeed */ }
  setDoc(doc(db, 'users', uid), { profile }, { merge: true })
    .catch((err) => console.warn('Profile kept locally only (Firestore unavailable):', err));
}

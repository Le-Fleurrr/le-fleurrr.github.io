import { httpsCallable } from 'firebase/functions';
import { functions } from '../Firebase/Firebase.js';

const RECAPTCHA_SITE_KEY = '6LdE1q4tAAAAALRzmPA25Hi1IYHaVGrQG8ffe3Qv';

export function getRecaptchaToken(action) {
  return new Promise((resolve, reject) => {
    const grecaptcha = window.grecaptcha?.enterprise;
    if (!grecaptcha) {
      reject(new Error('reCAPTCHA has not loaded yet'));
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}

const verifyRecaptchaCallable = httpsCallable(functions, 'verifyRecaptcha');

export async function verifyRecaptcha(action) {
  const token = await getRecaptchaToken(action);
  const { data } = await verifyRecaptchaCallable({ token, action });
  return data;
}

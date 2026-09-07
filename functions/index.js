const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const PROJECT_ID = 'backrooms-az';
const SITE_KEY = '6LdE1q4tAAAAALRzmPA25Hi1IYHaVGrQG8ffe3Qv';
const SCORE_THRESHOLD = 0.5;

const client = new RecaptchaEnterpriseServiceClient();

exports.verifyRecaptcha = onCall(async (request) => {
  const { token, action } = request.data || {};

  if (!token || !action) {
    throw new HttpsError('invalid-argument', 'Missing reCAPTCHA token or action.');
  }

  const [assessment] = await client.createAssessment({
    parent: client.projectPath(PROJECT_ID),
    assessment: {
      event: {
        token,
        siteKey: SITE_KEY,
      },
    },
  });

  if (!assessment.tokenProperties.valid) {
    throw new HttpsError(
      'permission-denied',
      `Invalid reCAPTCHA token: ${assessment.tokenProperties.invalidReason}`
    );
  }

  if (assessment.tokenProperties.action !== action) {
    throw new HttpsError('permission-denied', 'reCAPTCHA action mismatch.');
  }

  const score = assessment.riskAnalysis.score;

  return { success: score >= SCORE_THRESHOLD, score };
});

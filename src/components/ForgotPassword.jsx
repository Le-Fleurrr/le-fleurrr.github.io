import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useLanguage } from './LanguageContext.jsx';

export function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError(t.invalidEmail);
      } else if (error.code === 'auth/user-not-found') {
        setError(t.userNotFound);
      } else {
        setError(t.resetPasswordFailed + error.message);
      }
    }

    setLoading(false);
  }

  function handleClose() {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
      <button
        type="button"
        onClick={handleClose}
        aria-label={t.closeWindow}
        className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">{t.forgotPasswordTitle}</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t.forgotPasswordSubtitle}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {sent ? (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-center">
            {t.resetEmailSent}
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? t.pleaseWait : t.sendResetLink}
            </Button>
          </form>
        )}

        <p className="text-center text-sm">
          <Link to="/login" className="text-primary hover:underline font-medium">
            {t.backToLogin}
          </Link>
        </p>
      </div>
    </div>
  );
}

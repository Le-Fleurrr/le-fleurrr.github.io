import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Package, Heart, Plus, Trash2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/authContext';
import { useLanguage } from './LanguageContext.jsx';
import { usePageTitle } from './usePageTitle.js';
import { Button } from './ui/Button.tsx';
import { defaultProfile, loadLocalProfile, fetchRemoteProfile, saveProfile } from './userProfileStore.js';

const inputCls = "w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none";

const Section = ({ icon: Icon, title, children }) => (
  <section className="bg-card border border-border rounded-xl p-6">
    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" /> {title}
    </h2>
    {children}
  </section>
);

export const AccountPage = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  usePageTitle(t.account);

  const [profile, setProfile] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState({ label: '', text: '' });
  const [cardDraft, setCardDraft] = useState({ holder: '', last4: '', expiry: '', brand: 'Visa' });

  useEffect(() => {
    if (!currentUser) return;
    const local = loadLocalProfile(currentUser.uid) || defaultProfile(currentUser);
    setProfile(local);
    // Merge in the remote copy when Firestore is reachable (remote wins for
    // fields the local copy doesn't have yet).
    fetchRemoteProfile(currentUser.uid).then(remote => {
      if (remote) setProfile(prev => ({ ...defaultProfile(currentUser), ...remote, ...prev }));
    });
  }, [currentUser?.uid]);

  if (!profile) return null;

  const persist = (next) => {
    setProfile(next);
    saveProfile(currentUser.uid, next);
  };

  const saveIdentity = () => {
    persist(profile);
    toast.success(t.savedToast);
  };

  const addAddress = () => {
    if (!addressDraft.text.trim()) return;
    persist({
      ...profile,
      addresses: [...profile.addresses, { id: Date.now(), label: addressDraft.label.trim(), text: addressDraft.text.trim() }],
    });
    setAddressDraft({ label: '', text: '' });
    setShowAddressForm(false);
    toast.success(t.savedToast);
  };

  const removeAddress = (id) => {
    persist({ ...profile, addresses: profile.addresses.filter(a => a.id !== id) });
  };

  const addCard = () => {
    const last4 = cardDraft.last4.trim();
    const expiry = cardDraft.expiry.trim();
    if (!cardDraft.holder.trim() || !/^\d{4}$/.test(last4) || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      toast.error(t.errorTryAgain);
      return;
    }
    persist({
      ...profile,
      cards: [...profile.cards, { id: Date.now(), holder: cardDraft.holder.trim(), last4, expiry, brand: cardDraft.brand }],
    });
    setCardDraft({ holder: '', last4: '', expiry: '', brand: 'Visa' });
    setShowCardForm(false);
    toast.success(t.savedToast);
  };

  const removeCard = (id) => {
    persist({ ...profile, cards: profile.cards.filter(c => c.id !== id) });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">
          ← {t.backHome}
        </Link>

        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-3">{t.account}</h1>
            <p className="text-muted-foreground">{t.accountSubtitle}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t.signedInAs} <span className="font-semibold text-foreground">{currentUser.email}</span>
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 self-start sm:self-auto">
            <LogOut className="w-4 h-4" /> {t.logout}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Section icon={User} title={t.profile}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.username}</label>
                <input
                  className={inputCls}
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.nameLabel}</label>
                <input
                  className={inputCls}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={saveIdentity} className="mt-4">{t.save}</Button>
          </Section>

          {/* Addresses */}
          <Section icon={MapPin} title={t.addresses}>
            {profile.addresses.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">{t.noAddresses}</p>
            ) : (
              <ul className="space-y-3 mb-4">
                {profile.addresses.map((addr) => (
                  <li key={addr.id} className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg bg-background">
                    <div>
                      {addr.label && <p className="font-semibold text-sm mb-1">{addr.label}</p>}
                      <p className="text-sm text-muted-foreground">{addr.text}</p>
                    </div>
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                      aria-label={t.removeItem}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {showAddressForm ? (
              <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
                <input
                  className={inputCls}
                  placeholder={t.addressLabel}
                  value={addressDraft.label}
                  onChange={(e) => setAddressDraft({ ...addressDraft, label: e.target.value })}
                />
                <textarea
                  className={`${inputCls} h-20 resize-none`}
                  placeholder={t.addressText}
                  value={addressDraft.text}
                  onChange={(e) => setAddressDraft({ ...addressDraft, text: e.target.value })}
                />
                <div className="flex gap-3">
                  <Button size="sm" onClick={addAddress}>{t.save}</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowAddressForm(false)}>{t.cancel}</Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowAddressForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> {t.addAddress}
              </Button>
            )}
          </Section>

          {/* Payment cards — display data only, never full numbers or CVV */}
          <Section icon={CreditCard} title={t.paymentMethods}>
            <p className="text-xs text-muted-foreground mb-4">{t.cardSecurityNote}</p>
            {profile.cards.length === 0 ? (
              <p className="text-muted-foreground text-sm mb-4">{t.noCards}</p>
            ) : (
              <ul className="space-y-3 mb-4">
                {profile.cards.map((card) => (
                  <li key={card.id} className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">{card.brand} •••• {card.last4}</p>
                        <p className="text-xs text-muted-foreground">{card.holder} — {card.expiry}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                      aria-label={t.removeItem}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {showCardForm ? (
              <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
                <input
                  className={inputCls}
                  placeholder={t.cardHolder}
                  value={cardDraft.holder}
                  onChange={(e) => setCardDraft({ ...cardDraft, holder: e.target.value })}
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    className={inputCls}
                    placeholder={t.cardLast4}
                    maxLength={4}
                    inputMode="numeric"
                    value={cardDraft.last4}
                    onChange={(e) => setCardDraft({ ...cardDraft, last4: e.target.value.replace(/\D/g, '') })}
                  />
                  <input
                    className={inputCls}
                    placeholder={t.cardExpiry}
                    maxLength={5}
                    value={cardDraft.expiry}
                    onChange={(e) => setCardDraft({ ...cardDraft, expiry: e.target.value })}
                  />
                  <select
                    className={inputCls}
                    value={cardDraft.brand}
                    onChange={(e) => setCardDraft({ ...cardDraft, brand: e.target.value })}
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>American Express</option>
                    <option>Mir</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" onClick={addCard}>{t.save}</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowCardForm(false)}>{t.cancel}</Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowCardForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> {t.addCard}
              </Button>
            )}
          </Section>

          {/* Orders */}
          <Section icon={Package} title={t.myOrders}>
            {(profile.orders || []).length === 0 ? (
              <p className="text-muted-foreground text-sm">{t.noOrders}</p>
            ) : (
              <ul className="space-y-3">
                {profile.orders.map((order) => (
                  <li key={order.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">#{order.id}</span>
                      <span className="text-muted-foreground">{order.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{order.summary}</p>
                    {order.total && <p className="font-bold mt-1">{order.total} ₼</p>}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {/* Wishlist shortcut — favorites are already synced per account */}
          <Section icon={Heart} title={t.favoritesTitle}>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/favorites"><Heart className="w-4 h-4" /> {t.viewAll}</Link>
            </Button>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

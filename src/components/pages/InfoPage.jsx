import { Link, useParams, Navigate } from 'react-router-dom';
import { Mail, Truck, RotateCcw, HelpCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';
import { usePageTitle } from '../usePageTitle.js';

// Support pages behind the footer links: /info/contact, /info/shipping,
// /info/returns, /info/faq. Content lives in the translation dictionary,
// so edit the *Body keys in LanguageContext.jsx to change the text.
const TOPICS = {
  contact: { titleKey: 'footerContact', bodyKey: 'contactBody', icon: Mail },
  shipping: { titleKey: 'footerShipping', bodyKey: 'shippingBody', icon: Truck },
  returns: { titleKey: 'footerReturns', bodyKey: 'returnsBody', icon: RotateCcw },
  faq: { titleKey: 'footerFaq', bodyKey: 'faqBody', icon: HelpCircle },
};

const InfoPage = () => {
  const { topic } = useParams();
  const { t } = useLanguage();
  const config = TOPICS[topic];
  usePageTitle(config ? t[config.titleKey] : null);

  if (!config) return <Navigate to="/" replace />;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          ← {t.backHome}
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-6">{t[config.titleKey]}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t[config.bodyKey]}</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {Object.keys(TOPICS).filter(k => k !== topic).map(k => (
            <Link
              key={k}
              to={`/info/${k}`}
              className="px-5 py-2.5 rounded-full bg-card border border-border hover:border-primary text-sm transition-colors"
            >
              {t[TOPICS[k].titleKey]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    [t.footerShop]: [
      { label: t.footerNewArrivals, to: "/collections" },
      { label: t.footerBestSellers, to: "/collections" },
      { label: t.footerPreOrders, to: "/collections" },
      { label: t.footerSale, to: "/collections" },
    ],
    [t.footerGenres]: [
      { label: "Hip-Hop/Rap", to: "/search?genre=Hip-Hop%2FRap" },
      { label: "R&B/Soul", to: "/search?genre=R%26B%2FSoul" },
      { label: "Pop", to: "/search?genre=Pop" },
      { label: "Alternative", to: "/search?genre=Alternative" },
    ],
    [t.footerSupport]: [
      { label: t.footerContact, to: "/info/contact" },
      { label: t.footerShipping, to: "/info/shipping" },
      { label: t.footerReturns, to: "/info/returns" },
      { label: t.footerFaq, to: "/info/faq" },
    ],
    [t.footerCompany]: [
      { label: t.footerAbout },
      { label: t.footerCareers },
      { label: t.footerBlog },
    ],
  };

  return (
    <footer id="about" className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background" />
              </div>
              <span className="font-serif text-2xl font-bold">Backrooms</span>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              {t.footerTagline}
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-bold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground/60 text-sm cursor-default select-none">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footerRights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.termsOfService}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
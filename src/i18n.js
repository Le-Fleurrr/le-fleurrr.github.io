// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        navbar: { home: "Home", about: "About", contact: "Contact" },
        hero: {
          title: "Welcome to Our Website",
          subtitle: "We bring your ideas to life with modern design."
        }
      },
    }, 
    ar: {
      translation: {
        navbar: { home: "الرئيسية", about: "حول", contact: "اتصل بنا" },
        hero: {
          title: "مرحباً بكم في موقعنا",
          subtitle: "نحول أفكارك إلى واقع بتصاميم عصرية."
        }
      },
    },
    es: {
      translation: {
        navbar: { home: "Inicio", about: "Acerca de", contact: "Contacto" },
        hero: {
          title: "Bienvenido a Nuestro Sitio Web",
          subtitle: "Damos vida a tus ideas con un diseño moderno."
        }
      },
    },
    de: {
      translation: {
        navbar: { home: "Startseite", about: "Über uns", contact: "Kontakt" },
        hero: {
          title: "Willkommen auf unserer Webseite",
          subtitle: "Wir bringen Ihre Ideen mit modernem Design zum Leben."
        }
      },
    },
    fr: {
      translation: {
        navbar: { home: "Accueil", about: "À propos", contact: "Contact" },
        hero: {
          title: "Bienvenue sur Notre Site Web",
          subtitle: "Nous donnons vie à vos idées avec un design moderne."
        }
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
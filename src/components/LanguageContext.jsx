import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  az: {
    settings: "Parametrlər",
    customize: "Görünüşü və interfeysi fərdiləşdirin",
    vinylSettings: "Vinyl Tənzimləmələri",
    hideVinylAll: "Vinyl-ı tamamilə gizlə",
    hideVinylArtist: "Yalnız Artist səhifəsində gizlə",
    contentView: "Məzmun Görünüşü",
    biggerText: "Böyük Mətn",
    biggerCursor: "Böyük Kursor",
    lineHeight: "Sətir Hündürlüyü",
    lineNormal: "Normal",
    lineRelaxed: "Rahat",
    lineLoose: "Geniş",
    effectsColors: "Effektlər və Rənglər",
    stopAnimations: "Animasiyaları Dayandır",
    invertColors: "Rəngləri Çevir",
    brightness: "Parlaqlıq",
    contrast: "Kontrast",
    language: "Dil",
    theme: "Görünüş Rejimi",
    dark: "Qaranlıq",
    light: "İşıqlı",
    reset: "Parametrləri Sıfırla",
    addToCart: "Səbətə əlavə et",
    back: "Geri",
    description: "Təsvir",
    tracklist: "Mahnı Siyahısı",
    reviews: "Rəylər və Suallar",
    genre: "Janr",
    selectDesign: "Dizayn Seçin",
    selected: "Seçilmiş",
    quantity: "Miqdar",
    notFound: "Albom Tapılmadı",
    backHome: "Ana səhifəyə qayıt",
    images: "Şəkillər",
    imageNotLoaded: "Şəkil yüklənmədi",
    animated: "Animasiya",
    static: "Statik",
    submitReview: "Paylaş",
    submitQuestion: "Sualı Göndər",
    writeReview: "Rəyinizi yazın...",
    writeQuestion: "Sualınızı yazın...",
    leaveReview: "Rəy Bildir",
    askQuestion: "Sual Ver",
    reply: "Cavabla",
    replyPlaceholder: "Cavabınız...",
    send: "Göndər",
  },
  en: {
    settings: "Settings",
    customize: "Customize appearance and interface",
    vinylSettings: "Vinyl Settings",
    hideVinylAll: "Hide vinyl entirely",
    hideVinylArtist: "Hide only on Artist page",
    contentView: "Content View",
    biggerText: "Bigger Text",
    biggerCursor: "Bigger Cursor",
    lineHeight: "Line Height",
    lineNormal: "Normal",
    lineRelaxed: "Relaxed",
    lineLoose: "Loose",
    effectsColors: "Effects & Colors",
    stopAnimations: "Stop Animations",
    invertColors: "Invert Colors",
    brightness: "Brightness",
    contrast: "Contrast",
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    reset: "Reset Settings",
    addToCart: "Add to Cart",
    back: "Back",
    description: "Description",
    tracklist: "Tracklist",
    reviews: "Reviews & Questions",
    genre: "Genre",
    selectDesign: "Select Design",
    selected: "Selected",
    quantity: "Quantity",
    notFound: "Album Not Found",
    backHome: "Back to Home",
    images: "Images",
    imageNotLoaded: "Image failed to load",
    animated: "Animated",
    static: "Static",
    submitReview: "Submit",
    submitQuestion: "Send Question",
    writeReview: "Write your review...",
    writeQuestion: "Write your question...",
    leaveReview: "Leave a Review",
    askQuestion: "Ask a Question",
    reply: "Reply",
    replyPlaceholder: "Your reply...",
    send: "Send",
  },
  ru: {
    settings: "Настройки",
    customize: "Настройте внешний вид и интерфейс",
    vinylSettings: "Настройки виниловой пластинки",
    hideVinylAll: "Скрыть полностью",
    hideVinylArtist: "Скрыть только на странице исполнителя",
    contentView: "Внешний вид контента",
    biggerText: "Крупный текст",
    biggerCursor: "Крупный курсор",
    lineHeight: "Межстрочный интервал",
    lineNormal: "Нормальный",
    lineRelaxed: "Удобный",
    lineLoose: "Широкий",
    effectsColors: "Эффекты и цвета",
    stopAnimations: "Остановить анимации",
    invertColors: "Инвертировать цвета",
    brightness: "Яркость",
    contrast: "Контрастность",
    language: "Язык",
    theme: "Тема",
    dark: "Тёмная",
    light: "Светлая",
    reset: "Сбросить настройки",
    addToCart: "Добавить в корзину",
    back: "Назад",
    description: "Описание",
    tracklist: "Список треков",
    reviews: "Отзывы и вопросы",
    genre: "Жанр",
    selectDesign: "Выбрать дизайн",
    selected: "Выбрано",
    quantity: "Количество",
    notFound: "Альбом не найден",
    backHome: "На главную",
    images: "Фотографии",
    imageNotLoaded: "Не удалось загрузить фото",
    animated: "Анимация",
    static: "Статичный",
    submitReview: "Отправить",
    submitQuestion: "Отправить вопрос",
    writeReview: "Напишите отзыв...",
    writeQuestion: "Напишите вопрос...",
    leaveReview: "Оставить отзыв",
    askQuestion: "Задать вопрос",
    reply: "Ответить",
    replyPlaceholder: "Ваш ответ...",
    send: "Отправить",
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      try {
        return JSON.parse(saved).language || "az";
      } catch { return "az"; }
    }
    return "az";
  });

  const t = translations[language] || translations.az;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
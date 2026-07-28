// Diacritic-insensitive normalization so searches match regardless of
// keyboard: "seher" finds "Səhər", "carti" finds "Çartı", etc.
// ə and ı don't decompose in Unicode, so they're mapped manually; the rest
// (ş, ç, ğ, ö, ü and İ's combining dot) are stripped via NFD.
export const normalizeForSearch = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

import { describe, it, expect } from 'vitest';
import { normalizeForSearch } from './searchUtils.js';
import { localizeText, localizeReleaseDate, localizeDuration } from './LanguageContext.jsx';

describe('normalizeForSearch', () => {
  it('strips Azerbaijani diacritics', () => {
    expect(normalizeForSearch('Səhər Çiçəyi ILĞIM üzü')).toBe('seher ciceyi ilgim uzu');
  });
  it('handles dotted İ and plain ASCII', () => {
    expect(normalizeForSearch('İyun')).toBe('iyun');
    expect(normalizeForSearch('DAMN.')).toBe('damn.');
  });
  it('tolerates null/undefined', () => {
    expect(normalizeForSearch(null)).toBe('');
    expect(normalizeForSearch(undefined)).toBe('');
  });
});

describe('localizeReleaseDate', () => {
  it('translates to English month-first format', () => {
    expect(localizeReleaseDate('24 Noyabr 2008', 'en')).toBe('November 24, 2008');
  });
  it('translates to Russian genitive months', () => {
    expect(localizeReleaseDate('24 Noyabr 2008', 'ru')).toBe('24 ноября 2008');
  });
  it('returns az unchanged', () => {
    expect(localizeReleaseDate('24 Noyabr 2008', 'az')).toBe('24 Noyabr 2008');
  });
  it('passes unknown formats through untouched', () => {
    expect(localizeReleaseDate('TBA', 'en')).toBe('TBA');
  });
  it('prefers hand-written objects', () => {
    expect(localizeReleaseDate({ az: 'a', en: 'b', ru: 'c' }, 'ru')).toBe('c');
  });
});

describe('localizeDuration', () => {
  it('translates songs + minutes', () => {
    expect(localizeDuration('12 mahnı, 52 dəqiqə', 'en')).toBe('12 songs, 52 minutes');
    expect(localizeDuration('12 mahnı, 52 dəqiqə', 'ru')).toBe('12 песен, 52 минуты');
  });
  it('translates songs + hours + minutes', () => {
    expect(localizeDuration('26 mahnı, 1 saat 17 dəqiqə', 'en')).toBe('26 songs, 1 hour 17 minutes');
    expect(localizeDuration('26 mahnı, 1 saat 17 dəqiqə', 'ru')).toBe('26 песен, 1 час 17 минут');
  });
  it('applies Russian plural rules', () => {
    expect(localizeDuration('21 mahnı, 41 dəqiqə', 'ru')).toBe('21 песня, 41 минута');
    expect(localizeDuration('3 mahnı, 2 dəqiqə', 'ru')).toBe('3 песни, 2 минуты');
  });
  it('handles bare minutes', () => {
    expect(localizeDuration('54 Dəqiqə', 'en')).toBe('54 minutes');
  });
  it('passes unknown formats through untouched', () => {
    expect(localizeDuration('about an hour', 'en')).toBe('about an hour');
  });
});

describe('localizeText', () => {
  it('picks the requested language from objects', () => {
    expect(localizeText({ az: 'x', en: 'y', ru: 'z' }, 'en')).toBe('y');
  });
  it('falls back to az when a language is missing', () => {
    expect(localizeText({ az: 'x' }, 'ru')).toBe('x');
  });
  it('returns plain strings unchanged', () => {
    expect(localizeText('plain', 'ru')).toBe('plain');
  });
});

export const BASE_URL = 'https://api.scripture.api.bible/v1/bibles/55212e3cf5d04d49-01';

export const BOOKS_URL = `${BASE_URL}/books?include-chapters=true&include-chapters-and-sections=true`;

export const RAPID_API_BASE = 'https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter';

const PARAMS = {
  notes: 'include-notes=false',
  titles: 'include-titles=false',
  chapterNum: 'include-chapter-numbers=true',
  verseNum: 'include-verse-numbers=true',
  verseSpan: 'include-verse-spans=false',
};

const CPARAMS = `?content-type=json&${PARAMS.notes}&${PARAMS.titles}&${PARAMS.chapterNum}&${PARAMS.verseNum}&${PARAMS.verseSpan}`;

const chaptersURL = id => `${BASE_URL}/chapters/${id}${CPARAMS}`;

export const dateOptions = {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
};

export const VERSES_ARRAY = [
  { bookName: 'Jeremiah', chapterNum: '29', verseNum: '11' },
  { bookName: 'Psalms', chapterNum: '23', verseNum: '6' },
  { bookName: '1 Corinthians', chapterNum: '4', verseNum: '4' },
  { bookName: 'Phillipians', chapterNum: '4', verseNum: '13' },
  { bookName: 'John', chapterNum: '3', verseNum: '16' },
  { bookName: 'Romans', chapterNum: '8', verseNum: '28' },
  { bookName: 'Isaiah', chapterNum: '41', verseNum: '10' },
  { bookName: 'Psalms', chapterNum: '46', verseNum: '1' },
  { bookName: 'Galatians', chapterNum: '5', verseNum: '22' },
  { bookName: 'Hebrews', chapterNum: '11', verseNum: '1' },
  { bookName: '2 Timothy', chapterNum: '1', verseNum: '7' },
  { bookName: '1 Corinthians', chapterNum: '10', verseNum: '13' },
  { bookName: 'Proverbs', chapterNum: '22', verseNum: '6' },
  { bookName: 'Isaiah', chapterNum: '40', verseNum: '31' },
  { bookName: 'Joshua', chapterNum: '1', verseNum: '9' },
  { bookName: 'Hebrews', chapterNum: '12', verseNum: '2' },
  { bookName: 'Mathew', chapterNum: '11', verseNum: '28' },
  { bookName: 'Romans', chapterNum: '10', verseNum: '9' },
  { bookName: 'Phillipians', chapterNum: '2', verseNum: '3' },
  { bookName: 'Mathew', chapterNum: '5', verseNum: '45' },
  { bookName: 'Colossians', chapterNum: '3', verseNum: '1' },
  { bookName: 'John', chapterNum: '14', verseNum: '1' },
  { bookName: 'John', chapterNum: '14', verseNum: '14' },
  { bookName: 'Psalms', chapterNum: '91', verseNum: '2' },
  { bookName: 'Colossians', chapterNum: '3', verseNum: '23' },
  { bookName: 'James', chapterNum: '1', verseNum: '19' },
  { bookName: 'Psalms', chapterNum: '37', verseNum: '4' },
  { bookName: 'Psalms', chapterNum: '73', verseNum: '26' },
  { bookName: '1 Corinthians', chapterNum: '13', verseNum: '13' },
  { bookName: 'Psalms', chapterNum: '22', verseNum: '24' },
  { bookName: 'Isaiah', chapterNum: '41', verseNum: '13' },
  { bookName: 'Ecclesiastes', chapterNum: '7', verseNum: '9' },
];

export default chaptersURL;

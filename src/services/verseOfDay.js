import { RAPID_API_BASE, VERSES_ARRAY } from '../constants';

const verseOfDay = () => {
  const dayIndex = new Date().getDate();
  const { verseNum, chapterNum, bookName } = VERSES_ARRAY[dayIndex];
  const requestURL = `${RAPID_API_BASE}?Verse=${verseNum}&chapter=${chapterNum}&Book=${bookName}`;
  const VoDPromise = fetch(requestURL, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
      'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
    },
  })
    .then(res => res.json());
  return VoDPromise;
};

export default verseOfDay;

import { RAPID_API_BASE } from '../constants';

const fetchScripture = (params, setText, setScripture, setIsLoading) => {
  fetch(`${RAPID_API_BASE}?Verse=${params.verseID}&chapter=${params.chapterNum}&Book=${params.bookName}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
      'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
    },
  })
    .then(response => response.json())
    .then(data => {
      setText(data.Output);
      setScripture(data);
      setIsLoading(false);
    })
    .catch(err => console.error(err));
};

export default fetchScripture;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VerseLayout from '../components/VerseLayout';
import { RAPID_API_BASE } from '../constants';
import { getFavorite } from '../redux/actions';
import '../styles/verse.css';

const Verse = () => {
  // Get route parameters using useParams hook
  const { verse } = useParams();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [verseID, setVerseID] = useState(verse);
  console.log(verseID);

  // state variables for favorites management
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  // stte variables to manange verse
  const [scripture, setScripture] = useState({});
  const favorite = {
    book_name: scripture.Book,
    chapter_num: scripture.Chapter,
    verse_num: scripture.Verse,
    verse: scripture.Output,
  };

  // Grab the chapterId and the data from Redux store
  const { chapterNum } = useSelector(state => state.chapterId);
  const bookName = useSelector(state => state.name);
  const { jwt: token, user, favorites } = useSelector(state => state.user);
  let userId;
  user ? userId = user.id : userId = ''; // eslint-disable-line
  console.log(userId);

  const [isLoading, setIsLoading] = useState(false);

  // Get verse chosen from external api
  useEffect(() => {
    setIsLoading(true);
    if (favorites) {
      favorites.forEach(obj => {
        if (obj.book_name === favorite.book_name
            && favorite.chapter_num === obj.chapter_num
            && favorite.verse_num === obj.verse_num
            && favorite.verse === obj.verse) {
          setFavoriteStatus(true);
          console.log('Forcing a false');
          console.log('Hmm1');
          console.log('Rerendering');
        }
      });
    }

    fetch(`${RAPID_API_BASE}?Verse=${verseID}&chapter=${chapterNum}&Book=${bookName}`, {
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
  }, []);

  const handleNext = () => {
    setVerseID((parseInt(verse, 10) + 1).toString());
    fetch(
      `${RAPID_API_BASE}?Verse=${verseID}&chapter=${chapterNum}&Book=${bookName}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
          'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setText(data.Output);
        setScripture(data);
      })
      .catch(err => console.error(err));
  };

  // Add to favorites on click
  const addFavorite = () => {
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        credentials: 'include',
      },
      body: JSON.stringify(favorite),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFavoriteStatus(!favoriteStatus);
        dispatch(getFavorite(data.favorite));
      })
      .catch(err => console.log(err.message));
  };

  return (
    <section className="verse">
      <VerseLayout
        params={{
          bookName, chapterNum, text, verse, verseID,
        }}
        handleNext={handleNext}
        addFavorite={addFavorite}
        favoriteStatus={favoriteStatus}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Verse;

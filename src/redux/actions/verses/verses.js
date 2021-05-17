import chaptersURL from '../../../constants';
import fetchData from '../../../services/fetchData';
import { GET_VERSES } from '../../actionTypes';
import { getVerseNumbers } from '../../selectors';

const getVerses = verses => ({
  type: GET_VERSES,
  payload: verses,
});

const retrieveVerses = (dispatch, id, setVerses) => {
  fetchData(chaptersURL(id))
    .then(data => {
      setVerses(getVerseNumbers(data.data.content));
      dispatch(getVerses(data.data.content));
    });
};

export default retrieveVerses;

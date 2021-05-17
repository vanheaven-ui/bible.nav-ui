import { BASE_URL } from '../../../constants';
import fetchData from '../../../services/fetchData';
import { GET_CHAPTERS } from '../../actionTypes';

const getChapters = chapters => ({
  type: GET_CHAPTERS,
  payload: chapters,
});

const retrieveChapters = (dispatch, setShowChapters, hist, target) => {
  fetchData(`${BASE_URL}/books/${target}/chapters`)
    .then(chapters => {
      dispatch(getChapters(chapters.data));
      setShowChapters(true);
      hist.push(`/books/${target}`);
    })
    .catch(err => console.log(err.message));
};

export default retrieveChapters;

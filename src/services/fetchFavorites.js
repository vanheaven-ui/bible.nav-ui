const fetchFavorites = (userID, token) => {
  const responsePromise = fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${userID}/favorites`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      credentials: 'include',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw Error('Not successful');
      }
      console.log('Successful');
      return res.json();
    });
  return responsePromise;
};

export default fetchFavorites;

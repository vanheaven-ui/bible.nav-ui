const fetchData = url => {
  const res = fetch(url, {
    headers: {
      'api-key': '33ca2a8f23fb5001c5a9c8ace6e0e4b7',
    },
  }).then(res => res.json());
  return res;
};

export default fetchData;

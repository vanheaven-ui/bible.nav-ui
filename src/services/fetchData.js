const fetchData = url => {
  const res = fetch(url, {
    headers: {
      'api-key': '9914cf5e73852dc9b24942666ef8d6bd',
    },
  }).then(res => res.json());
  return res;
};

export default fetchData;

const registerService = (hist, setError, setClick, setRegistering, signupParams) => {
  fetch('https://biblenav-api.herokuapp.com/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupParams),
  })
    .then(res => {
      setRegistering(false);
      if (res.ok) {
        hist.push('/login');
      } else if (res.status === 406) {
        return res.json();
      }
      throw Error('Check your entry and try again');
    })
    .then(data => {
      throw Error(data.error);
    })
    .catch(err => {
      setError(err.message);
      setClick(true);
    });
};

export default registerService;

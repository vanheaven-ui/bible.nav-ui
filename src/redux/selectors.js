const getVerseNumbers = response => {
  const verseNums = [];
  const filteredByVerse = response.map(v => v.items).map(d => d.filter(val => val.name === 'verse'));
  const filteredByNums = filteredByVerse.map(d => d.filter(i => i.attrs.number));
  for (let i = 0; i < filteredByNums.length; i += 1) {
    for (let j = 0; j < filteredByNums[i].length; j += 1) {
      verseNums.push(filteredByNums[i][j].attrs.number);
    }
  }
  return verseNums;
};

const getVerse = (data, id) => {
  const myArr = data[1].items.filter(d => d.text);
  let returnVerse = '';
  for (let i = 0; i < myArr.length; i += 1) {
    if (myArr[i].attrs.verseId === id) {
      returnVerse += myArr[i].text;
    }
  }
  return returnVerse;
};

export { getVerseNumbers, getVerse };

import { getVerseNumbers } from '../selectors';

describe('getVerseNumbers', () => {
  const received = [
    {
      attrs: { number: '15', style: 'c', sid: 'ACT 15' },
      items: [{ name: 'chapter', type: 'tag' }],
    },
    {
      attrs: { number: '1', style: 'v', sid: 'ACT 15:1' },
      items: [
        {
          name: 'verse', type: 'tag', attrs: { number: '1', style: 'v', sid: 'ACT 15:1' }, items: [{ text: '1', type: 'text' }],
        },
        { text: 'And certain ', type: 'text', attrs: { verseId: 'ACT.15.1', verseOrgIds: [] } },
        {
          name: 'char', type: 'tag', attrs: { style: 'add' }, items: [],
        },
      ],
    },
    {
      attrs: { number: '6', style: 'v', sid: 'ACT 15:6' },
      items: [{ text: '6', type: 'text' }],
    },
    {
      attrs: { number: '6', style: 'v', sid: 'ACT 15:6' },
      items: [
        {
          name: 'verse', type: 'tag', attrs: { number: '6', style: 'v', sid: 'ACT 15:6' }, items: [{ text: '6', type: 'text' }],
        },
        { text: 'And certain ', type: 'text', attrs: { verseId: 'ACT.15.1', verseOrgIds: [] } },
        {
          name: 'char', type: 'tag', attrs: { style: 'add' }, items: [],
        },
      ],
    },
  ];

  it('returns an array of verse numbers', () => {
    expect(getVerseNumbers(received)).toEqual(['1', '6']);
  });
});

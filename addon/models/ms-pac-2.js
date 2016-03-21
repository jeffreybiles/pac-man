import Level from './level';

export default Level.extend({
  squareSize: 25,
  teleport: true,
  wallColor: '#77D9D9',
  pelletColor: '#D9D9D9',
  powerPelletColor: '#D8D800',
  layout: [
    'wwwwwwwwwwwwwwwwwwwww',
    '      w.......w      ',
    'wwwww w.wwwww.w wwwww',
    'w-........w........-w',
    'w.wwwww.w.w.w.wwwww.w',
    'w.w.....w.w.w.....w.w',
    'w.w.www w...w www.w.w',
    'w.....w wwwww w.....w',
    'wwwww.w       w.wwwww',
    'w.....w ww ww w.....w',
    'w.www.w wwwww w.www.w',
    'w...w.  wwwww  .w...w',
    'www.w.w       w.w.www',
    '  w.w.ww www ww.w.w  ',
    '  w......www......w  ',
    'www.wwww.www.wwww.www',
    '   ...w.......w...   ',
    'www.w.w.wwwww.w.w.www',
    'w-..w.....w.....w..-w',
    'w.www.www.w.www.www.w',
    'w...................w',
    'wwwwwwwwwwwwwwwwwwwww'
  ],
  startingPac: {
    x: 10,
    y: 16
  },
  startingGhosts: [{
    x: 10,
    y: 9
  }, {
    x: 11,
    y: 8
  }, {
    x: 9,
    y: 8
  }, {
    x: 10,
    y: 8
  }],
  ghostRetreat: {
    x: 10,
    y: 9
  }
})

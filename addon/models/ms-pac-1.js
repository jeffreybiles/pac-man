import Level from './level';

export default Level.extend({
  squareSize: 25,
  teleport: true,
  layout: [
    'wwwwwwwwwwwwwwwwwwwww',
    'w.....w.......w.....w',
    'w-www.w.wwwww.w.www-w',
    'w...................w',
    'www.w.www.w.www.w.www',
    '  w.w.www.w.www.w.w  ',
    'www.w.....w.....w.www',
    '   .www wwwww www.   ',
    'www.             .www',
    '  w.www ww ww www.w  ',
    'www.w   wwwww   w.www',
    '   .  w       w  .   ',
    'www.wwwww w wwwww.www',
    '  w.....  w  .....w  ',
    'www.www.wwwww.www.www',
    'w...................w',
    'w.ww.wwww.w.wwww.ww.w',
    'w.ww.w....w....w.ww.w',
    'w-ww.w.wwwwwww.w.ww-w',
    'w...................w',
    'wwwwwwwwwwwwwwwwwwwww'
  ],
  startingPac: {
    x: 10,
    y: 15
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

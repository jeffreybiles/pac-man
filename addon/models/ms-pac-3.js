import Level from './level';

export default Level.extend({
  squareSize: 25,
  teleport: true,
  wallColor: '#D8D877',
  pelletColor: '#D90000',
  powerPelletColor: '#D800D8',
  layout: [
    'wwwwwwwwwwwwwwwwwwwww',
    'w.......w...w.......w',
    'w-wwwww.w.w.w.wwwww-w',
    'w.w.......w.......w.w',
    'w...w.www.w.www.w...w',
    'www.w.www.w.www.w.www',
    ' ...w...........w... ',
    'w.w www wwwww www w.w',
    'w.w               w.w',
    'w.www w ww ww w www.w',
    'w.    w wwwww w    .w',
    'w.w www wwwww www w.w',
    'w.w               w.w',
    'w.www www w www www.w',
    'w.....w...w...w.....w',
    'www.w.w.wwwww.w.w.www',
    'w-..w...........w..-w',
    'w.www.www.w.www.www.w',
    'w.....w...w...w.....w',
    'w.www.w.wwwww.w.www.w',
    'w.....w.......w.....w',
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

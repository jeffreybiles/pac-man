import Level from './level';

export default Level.extend({
  squareSize: 60,
  layout: [
    [www.wwwww],
    [w......ww],
    [w.......w],
    [w..www..w],
    [w.......w],
    [w.w.w.w.w],
    [w-......w],
    [www.wwwww],
  ],
  startingPac: {
    x: 1,
    y: 1
  },
  startingGhosts: [{
    x: 6,
    y: 6
  }, {
    x: 5,
    y: 1
  }],
  teleport: true,
  ghostRetreat: {
    x: 4,
    y: 3
  }
})

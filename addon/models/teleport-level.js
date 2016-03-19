import Level from './level';

export default Level.extend({
  squareSize: 60,
  layout: [
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 1, 1, 1, 2, 2, 1],
    [1, 2, 2, 2 ,2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1],
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

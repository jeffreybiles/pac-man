import Level from './level';

export default Level.extend({
  squareSize: 60,
  layout: [
    [.........],
    [.-w.w.ww.],
    [.w.....w.],
    [...www...],
    [.w.....w.],
    [.-w.w.ww.],
    [.........],
  ],
  startingPac: {
    x: 0,
    y: 3
  },
  startingGhosts: [{
    x: 0,
    y: 0
  }, {
    x: 5,
    y: 0
  }],
  teleport: false,
  ghostRetreat: {
    x: 4,
    y: 3
  }
})

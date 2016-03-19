import Ember from 'ember';

export default Ember.Object.extend({
  squareSize: 40,
  teleport: true,
  width: Ember.computed(function(){
    return this.get('grid.firstObject.length')
  }),
  height: Ember.computed(function(){
    return this.get('grid.length');
  }),
  pixelWidth: Ember.computed(function(){
    return this.get('width') * this.get('squareSize');
  }),
  pixelHeight: Ember.computed(function() {
    return this.get('height') * this.get('squareSize');
  }),

  // 0 is a blank space
  // 1 is a wall
  // 2 is a pellet
  layout: [
    [2, 2, 2, 1, 1, 1, 1, 1],
    [2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 1, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 1, 1, 1, 1],
  ],
  startingPac: {
    x: 2,
    y: 1
  },
  startingGhosts: [{
  //   x: 3,
  //   y: 2,
  // }, {
  //   x: 6,
  //   y: 0
  }],

  isComplete(){
    let hasPelletsLeft = false;
    let grid = this.get('grid');

    grid.forEach((row)=>{
      row.forEach((cell)=>{
        if(cell == 2){
          hasPelletsLeft = true
        }
      })
    })
    return !hasPelletsLeft;
  },

  restart(){
    var newLayout = jQuery.extend(true, [], this.get('layout'));
    this.set('grid', newLayout);
  }
})

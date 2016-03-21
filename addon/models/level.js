import Ember from 'ember';

export default Ember.Object.extend({
  squareSize: 40,
  teleport: true,
  wallColor: '#CCC',
  pelletColor: '#CCC',
  powerPelletColor: '#0E0',
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

  //   is a blank space
  // w is a wall
  // . is a pellet
  layout: [
    '...wwwww',
    '.w.wwwww',
    '..w.wwww',
    '....wwww',
    '....wwww',
    'w...wwww',
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
        if(cell == '.'){
          hasPelletsLeft = true
        }
      })
    })
    return !hasPelletsLeft;
  },

  restart(){
    var newLayout = this.get('layout').map((row)=>{
      return row.split('');
    })
    this.set('grid', newLayout);
  }
})

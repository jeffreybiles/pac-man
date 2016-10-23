import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Ghost from '../models/ghost';
import Level from '../models/level';
import Level2 from '../models/level2';
import TeleportLevel from '../models/teleport-level';
import MsPac1 from '../models/ms-pac-1';
import MsPac2 from '../models/ms-pac-2';
import MsPac3 from '../models/ms-pac-3';
import MsPac4 from '../models/ms-pac-4';

export default Ember.Component.extend(KeyboardShortcuts, SharedStuff, {
  levels: [MsPac1, MsPac2, MsPac3, MsPac4],

  didInsertElement() {
    this.startNewLevel();
    this.loop();
  },

  loadNewLevel(){
    let levelIndex = (this.get('levelNumber') - 1) % this.get('levels.length')
    let levelClass = this.get('levels')[levelIndex]
    return levelClass.create()
  },

  startNewLevel(){
    let level = this.loadNewLevel();
    level.restart()
    this.set('level', level)

    let pac = Pac.create({
      level: level,
      x: level.get('startingPac.x'),
      y: level.get('startingPac.y')
    });
    this.set('pac', pac);

    let ghosts = level.get('startingGhosts').map((startingPosition)=>{
      return Ghost.create({
        level: level,
        x: startingPosition.x,
        y: startingPosition.y,
        pac: pac
      })
    })
    this.set('ghosts', ghosts)
  },

  score: 0,
  levelNumber: 1,
  lives: 3,

  drawWall(x, y){
    let ctx = this.get('ctx');
    let squareSize = this.get('level.squareSize');

    ctx.fillStyle = this.get('level.wallColor');
    ctx.fillRect(x * squareSize,
                 y * squareSize,
                 squareSize,
                 squareSize)
  },

  drawGrid(){
    let grid = this.get('level.grid');
    grid.forEach((row, rowIndex)=>{
      row.forEach((cell, columnIndex)=>{
        if(cell == 'w'){
          this.drawWall(columnIndex, rowIndex);
        }
        if(cell == '.'){
          this.drawPellet(columnIndex, rowIndex);
        }
        if(cell == '-'){
          this.drawPowerPellet(columnIndex, rowIndex)
        }
      })
    })
  },

  drawPellet(x, y){
    let radiusDivisor = 8;
    this.drawCircle(x, y, radiusDivisor, 'stopped', this.get('level.pelletColor'));
  },

  drawPowerPellet(x, y){
    let radiusDivisor = 3;
    this.drawCircle(x, y, radiusDivisor, 'stopped', this.get('level.powerPelletColor'));
  },

  clearScreen(){
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('level.pixelWidth'), this.get('level.pixelHeight'))
  },

  loop(){
    this.get('ghosts').forEach( ghost => ghost.move() );
    this.get('pac').move();

    this.processAnyPellets();

    this.clearScreen();
    this.drawGrid();
    this.get('pac').draw();
    this.get('ghosts').forEach( ghost => ghost.draw() );

    let ghostCollisions = this.detectGhostCollisions();
    if(ghostCollisions.length > 0){
      if(this.get('pac.powerMode')){
        ghostCollisions.forEach( ghost => ghost.retreat() )
      } else {
        this.decrementProperty('lives');
        this.restart();
      }
    }

    Ember.run.later(this, this.loop, 1000/60);
  },

  processAnyPellets(){
    let x = this.get('pac.x');
    let y = this.get('pac.y');
    let grid = this.get('level.grid');

    if(grid[y][x] == '.'){
      grid[y][x] = ' ';
      this.incrementProperty('score')

      if(this.get('level').isComplete()){
        this.incrementProperty('levelNumber')
        this.startNewLevel()
      }
    } else if(grid[y][x] == '-'){
      grid[y][x] = ' ';
      this.set('pac.powerModeTime', this.get('pac.maxPowerModeTime'));
    }
  },

  detectGhostCollisions(){
    return this.get('ghosts').filter((ghost)=>{
      return (this.get('pac.x') == ghost.get('x') &&
              this.get('pac.y') == ghost.get('y'))
    })
  },

  restart(){
    if(this.get('lives') <= 0) {
      this.set('score', 0)
      this.set('lives', 3)
      this.set('levelNumber', 1)
      this.startNewLevel()
    }
    this.get('pac').restart();
    this.get('ghosts').forEach( ghost => ghost.restart() );
  },

  keyboardShortcuts: {
    up() { this.set('pac.intent', 'up'); return false;},
    down()  { this.set('pac.intent', 'down'); return false;},
    left() { this.set('pac.intent', 'left'); return false;},
    right() { this.set('pac.intent', 'right'); return false;},
  },
});

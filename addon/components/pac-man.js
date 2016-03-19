import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Ghost from '../models/ghost';
import Level from '../models/level';
import Level2 from '../models/level2';
import TeleportLevel from '../models/teleport-level';

export default Ember.Component.extend(KeyboardShortcuts, SharedStuff, {
  levels: [TeleportLevel, Level, Level2],

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

    ctx.fillStyle = '#000';
    ctx.fillRect(x * squareSize,
                 y * squareSize,
                 squareSize,
                 squareSize)
  },

  drawGrid(){
    let grid = this.get('level.grid');
    grid.forEach((row, rowIndex)=>{
      row.forEach((cell, columnIndex)=>{
        if(cell == 1){
          this.drawWall(columnIndex, rowIndex);
        }
        if(cell == 2){
          this.drawPellet(columnIndex, rowIndex);
        }
        if(cell == 3){
          this.drawPowerPellet(columnIndex, rowIndex)
        }
      })
    })
  },

  drawPellet(x, y){
    let radiusDivisor = 6;
    this.drawCircle(x, y, radiusDivisor, 'stopped');
  },

  drawPowerPellet(x, y){
    let radiusDivisor = 4;
    this.drawCircle(x, y, radiusDivisor, 'stopped', 'green')
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

    if(grid[y][x] == 2){
      grid[y][x] = 0;
      this.incrementProperty('score')

      if(this.get('level').isComplete()){
        this.incrementProperty('levelNumber')
        this.startNewLevel()
      }
    } else if(grid[y][x] == 3){
      grid[y][x] = 0;
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
    up() { this.set('pac.intent', 'up');},
    down()  { this.set('pac.intent', 'down');},
    left() { this.set('pac.intent', 'left');},
    right() { this.set('pac.intent', 'right');},
  },
});
